import type { Diagnostic } from './schemas'
import { JCL_SPECS } from './constants'

/**
 * A basic JCL linter that checks for common positional and syntax rules.
 * JCL rules:
 * - Must start with '//' or '/*'
 * - Name field starts in column 3, max 8 chars
 * - Operation field separated by at least one space
 * - Operands separated by at least one space
 */
export function lintJCL(source: string): Diagnostic[] {
  const diagnostics: Diagnostic[] = []
  const lines = source.split('\n')

  lines.forEach((line, index) => {
    const lineNumber = index + 1
    
    // Ignore empty lines
    if (line.trim().length === 0) return

    // All JCL statements (except data) must start with a valid prefix
    if (!JCL_SPECS.PREFIXES.some(prefix => line.startsWith(prefix))) {
      diagnostics.push({
        line: lineNumber,
        column: 1,
        message: `JCL statement must begin with one of: ${JCL_SPECS.PREFIXES.join(', ')}.`,
        severity: 'error'
      })
      return
    }

    if (line.startsWith('//') && line.length > 2 && line.charAt(2) !== ' ') {
      // Check Name field
      const spaceIndex = line.indexOf(' ', 2)
      if (spaceIndex !== -1) {
        const name = line.substring(2, spaceIndex)
        if (name.length > JCL_SPECS.MAX_NAME_LENGTH) {
          diagnostics.push({
            line: lineNumber,
            column: 3,
            message: `Job/Step name '${name}' exceeds ${JCL_SPECS.MAX_NAME_LENGTH} characters.`,
            severity: 'error'
          })
        }
        if (!JCL_SPECS.NAME_PATTERN.test(name)) {
           diagnostics.push({
            line: lineNumber,
            column: 3,
            message: `Name '${name}' contains invalid characters.`,
            severity: 'error'
          })
        }
      }
    }
  })

  return diagnostics
}
