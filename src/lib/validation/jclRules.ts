import type { Diagnostic } from './schemas.ts'
import { JCL_SPECS } from './constants.ts'

export interface JclContext {
  inContinuation: boolean
  activeParamContext: string
}

export interface JclRule {
  evaluateLine: (
    line: string,
    lineNum: number,
    context: JclContext,
  ) => Diagnostic[]
}

export const PrefixRule: JclRule = {
  evaluateLine(line, lineNum) {
    const diags: Diagnostic[] = []
    if (line.startsWith('//')) {
      // Valid JCL statement
    } else if (line.startsWith('/*')) {
      // In-stream delimiter - valid
    } else if (
      line.trimStart().startsWith('//') ||
      line.trimStart().startsWith('/*')
    ) {
      diags.push({
        line: lineNum,
        column: 1,
        message:
          'JCL statements must begin strictly in Column 1 with "//" or "/*". Leading spaces are invalid.',
        severity: 'error',
      })
    } else {
      diags.push({
        line: lineNum,
        column: 1,
        message: `Invalid JCL line start. Standard JCL statements must begin with '//', comments with '//*', or delimiter with '/*'.`,
        severity: 'error',
      })
    }
    return diags
  },
}

export const ContinuationRule: JclRule = {
  evaluateLine(line, lineNum, context) {
    const diags: Diagnostic[] = []
    if (
      line.startsWith('/*') ||
      line.startsWith('//*') ||
      !line.trimStart().startsWith('//')
    )
      return diags

    if (context.inContinuation) {
      const afterPrefix = line.substring(2)
      const firstCharPos = afterPrefix.search(/\S/) // 0-indexed relative to col 3

      if (firstCharPos === -1) {
        diags.push({
          line: lineNum,
          column: 3,
          message:
            'Empty continuation line. Expected parameter continuation between columns 4 and 16.',
          severity: 'error',
        })
      } else {
        const actualCol = 3 + firstCharPos // 1-indexed column number
        if (actualCol < 4 || actualCol > 16) {
          diags.push({
            line: lineNum,
            column: actualCol,
            message: `JCL continuation parameters must begin between Column 4 and Column 16 (found in Column ${actualCol}).`,
            severity: 'warning',
          })
        }
      }
    }
    return diags
  },
}

export const NameAndOperationRule: JclRule = {
  evaluateLine(line, lineNum, context) {
    const diags: Diagnostic[] = []
    if (
      line.startsWith('/*') ||
      line.startsWith('//*') ||
      !line.trimStart().startsWith('//')
    )
      return diags

    const effectiveLine = line.length > 71 ? line.substring(0, 71) : line
    const restOfLine = effectiveLine.substring(2)

    if (!context.inContinuation) {
      if (restOfLine.length > 0 && restOfLine[0] !== ' ') {
        const nameMatch = restOfLine.match(/^([^\s]+)/)
        if (nameMatch) {
          const name = nameMatch[1]
          if (name.length > JCL_SPECS.MAX_NAME_LENGTH) {
            diags.push({
              line: lineNum,
              column: 3,
              message: `JCL Name '${name}' exceeds maximum allowed length of ${JCL_SPECS.MAX_NAME_LENGTH} characters.`,
              severity: 'error',
            })
          }
          if (!JCL_SPECS.NAME_PATTERN.test(name)) {
            diags.push({
              line: lineNum,
              column: 3,
              message: `JCL Name '${name}' is invalid. Must start with A-Z, $, #, or @, followed by alphanumeric or national characters.`,
              severity: 'error',
            })
          }

          const afterNameIndex = restOfLine.indexOf(' ', name.length)
          if (afterNameIndex !== -1) {
            const afterName = restOfLine.substring(afterNameIndex)
            const opMatch = afterName.match(/^\s+([^\s]+)/)
            if (opMatch) {
              const operation = opMatch[1].toUpperCase()
              if (!JCL_SPECS.VALID_OPERATIONS.includes(operation)) {
                diags.push({
                  line: lineNum,
                  column: 3 + afterNameIndex + opMatch[0].indexOf(opMatch[1]),
                  message: `Invalid JCL Operation '${operation}'. Expected one of: ${JCL_SPECS.VALID_OPERATIONS.join(', ')}.`,
                  severity: 'error',
                })
              }
            }
          }
        }
      }
    }
    return diags
  },
}

export const OperandAndSpaceRule: JclRule = {
  evaluateLine(line, lineNum, context) {
    const diags: Diagnostic[] = []
    if (
      line.startsWith('/*') ||
      line.startsWith('//*') ||
      !line.trimStart().startsWith('//')
    )
      return diags

    const effectiveLine = line.length > 71 ? line.substring(0, 71) : line
    const restOfLine = effectiveLine.substring(2)
    let operandString = ''

    if (context.inContinuation) {
      const match = restOfLine.match(/^\s*(.*)/)
      operandString = match ? match[1] : ''
    } else {
      if (restOfLine.length > 0 && restOfLine[0] !== ' ') {
        const nameMatch = restOfLine.match(/^([^\s]+)/)
        if (nameMatch) {
          const afterNameIndex = restOfLine.indexOf(' ', nameMatch[1].length)
          if (afterNameIndex !== -1) {
            const afterName = restOfLine.substring(afterNameIndex)
            const opMatch = afterName.match(/^\s+([^\s]+)/)
            if (opMatch) {
              const opPos = afterName.indexOf(opMatch[1]) + opMatch[1].length
              operandString = afterName.substring(opPos).trimStart()
            }
          }
        }
      }
    }

    if (operandString.length > 0) {
      let inSingleQuote = false
      let inDoubleQuote = false
      let parenCount = 0
      let operandEndIndex = -1
      let currentToken = ''

      for (let i = 0; i < operandString.length; i++) {
        const char = operandString[i]
        if (char === "'" && !inDoubleQuote) {
          inSingleQuote = !inSingleQuote
          currentToken += char
        } else if (char === '"' && !inSingleQuote) {
          inDoubleQuote = !inDoubleQuote
          currentToken += char
        } else if (!inSingleQuote && !inDoubleQuote) {
          if (char === '(') {
            parenCount++
            currentToken = ''
          } else if (char === ')') {
            parenCount--
            if (
              context.activeParamContext === 'DISP' &&
              currentToken.length > 0
            ) {
              if (
                !JCL_SPECS.DISP_SUBPARAMETERS.includes(
                  currentToken.toUpperCase(),
                )
              ) {
                diags.push({
                  line: lineNum,
                  column:
                    line.indexOf(operandString) + i - currentToken.length + 1,
                  message: `Invalid DISP subparameter '${currentToken}'. Valid values are: ${JCL_SPECS.DISP_SUBPARAMETERS.join(', ')}.`,
                  severity: 'error',
                })
              }
            }
            currentToken = ''
          } else if (char === '=') {
            context.activeParamContext = currentToken.toUpperCase()
            currentToken = ''
          } else if (char === ',') {
            if (
              context.activeParamContext === 'DISP' &&
              currentToken.length > 0
            ) {
              if (
                !JCL_SPECS.DISP_SUBPARAMETERS.includes(
                  currentToken.toUpperCase(),
                )
              ) {
                diags.push({
                  line: lineNum,
                  column:
                    line.indexOf(operandString) + i - currentToken.length + 1,
                  message: `Invalid DISP subparameter '${currentToken}'. Valid values are: ${JCL_SPECS.DISP_SUBPARAMETERS.join(', ')}.`,
                  severity: 'error',
                })
              }
            }
            currentToken = ''
          } else if (char === ' ') {
            operandEndIndex = i
            break
          } else {
            currentToken += char
          }
        }
      }

      if (operandEndIndex !== -1 || currentToken.length > 0) {
        if (
          context.activeParamContext === 'DISP' &&
          currentToken.length > 0 &&
          !inSingleQuote &&
          !inDoubleQuote
        ) {
          if (
            !JCL_SPECS.DISP_SUBPARAMETERS.includes(currentToken.toUpperCase())
          ) {
            diags.push({
              line: lineNum,
              column:
                line.indexOf(operandString) +
                (operandEndIndex !== -1
                  ? operandEndIndex
                  : operandString.length) -
                currentToken.length +
                1,
              message: `Invalid DISP subparameter '${currentToken}'. Valid values are: ${JCL_SPECS.DISP_SUBPARAMETERS.join(', ')}.`,
              severity: 'error',
            })
          }
        }
      }

      if (inSingleQuote || inDoubleQuote) {
        diags.push({
          line: lineNum,
          column: 3,
          message: 'Unclosed string quote in JCL operand field.',
          severity: 'error',
        })
      }

      if (parenCount !== 0) {
        diags.push({
          line: lineNum,
          column: 3,
          message: `Unbalanced parentheses in JCL operand field (${Math.abs(parenCount)} ${parenCount > 0 ? 'unclosed' : 'extra'} parenthesis).`,
          severity: 'error',
        })
      }

      if (operandEndIndex !== -1) {
        const actualOperands = operandString.substring(0, operandEndIndex)
        const commentSection = operandString
          .substring(operandEndIndex + 1)
          .trim()

        if (actualOperands.endsWith(',') || actualOperands.endsWith('=')) {
          diags.push({
            line: lineNum,
            column: 3 + operandEndIndex,
            message: `Unquoted space after '${actualOperands.slice(-1)}' in operand field. In JCL, spaces terminate parameters and begin comments.`,
            severity: 'error',
          })
        } else if (
          commentSection.includes('=') ||
          commentSection.startsWith('(')
        ) {
          diags.push({
            line: lineNum,
            column: 3 + operandEndIndex,
            message: `Unquoted space inside operand field before '${commentSection.split(' ')[0]}'. Spaces terminate operands and start comments.`,
            severity: 'error',
          })
        }
      }
    }

    return diags
  },
}

export const LineLengthRule: JclRule = {
  evaluateLine(line, lineNum) {
    const diags: Diagnostic[] = []
    if (line.length > 80) {
      diags.push({
        line: lineNum,
        column: 73,
        message: 'JCL statement exceeds standard 80-column punch card format.',
        severity: 'warning',
      })
    }
    return diags
  },
}

export const ALL_JCL_RULES: JclRule[] = [
  PrefixRule,
  ContinuationRule,
  NameAndOperationRule,
  OperandAndSpaceRule,
  LineLengthRule,
]
