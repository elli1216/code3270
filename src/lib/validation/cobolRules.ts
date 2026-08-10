import type { Diagnostic } from './schemas.ts'
import { COBOL_SPECS } from './constants.ts'

export interface CobolContext {
  hasIdentificationDivision: boolean;
  hasProgramId: boolean;
  declaredVariables: Set<string>;
}

export interface CobolRule {
  evaluateLine?: (line: string, lineNum: number, context: CobolContext) => Diagnostic[];
  evaluateGlobal?: (context: CobolContext) => Diagnostic[];
}

export const SequenceAreaRule: CobolRule = {
  evaluateLine(line, lineNum) {
    const diags: Diagnostic[] = []
    if (line.length >= 6) {
      const seqArea = line.substring(0, 6)
      if (seqArea.trim().length > 0 && !/^\d+$/.test(seqArea) && !seqArea.includes(' ')) {
        diags.push({
          line: lineNum,
          column: 1,
          message: `RC 04 (W) - Sequence area (Columns 1-6) should contain numeric digits or spaces. Found '${seqArea}'.`,
          severity: 'warning',
        })
      }
    }
    return diags
  }
}

export const IndicatorAreaRule: CobolRule = {
  evaluateLine(line, lineNum) {
    const diags: Diagnostic[] = []
    if (line.length >= 7) {
      const indicator = line[COBOL_SPECS.COLUMNS.INDICATOR]
      if (!COBOL_SPECS.INDICATORS.includes(indicator)) {
        diags.push({
          line: lineNum,
          column: 7,
          message: `RC 12 (S) - Invalid character '${indicator}' in indicator area (Column 7). Expected space, '*', '/', '-', or 'D'.`,
          severity: 'error',
        })
      }
    }
    return diags
  }
}

export const DivisionAndSectionRule: CobolRule = {
  evaluateLine(line, lineNum, context) {
    const diags: Diagnostic[] = []
    // Skip comments
    if (line.length >= 7 && (line[6] === '*' || line[6] === '/')) return diags

    const areaA = line.length >= 8 ? line.substring(7, Math.min(line.length, 11)) : ''
    const codeArea = line.length >= 8 ? line.substring(7, Math.min(line.length, 72)) : ''
    const trimmedCode = codeArea.trim()
    if (trimmedCode.length === 0) return diags
    const uppercaseCode = trimmedCode.toUpperCase()

    for (const div of COBOL_SPECS.ALL_DIVISIONS) {
      if (uppercaseCode.includes(div)) {
        if (div === 'IDENTIFICATION DIVISION') context.hasIdentificationDivision = true
        if (areaA.trim().length === 0) {
          diags.push({ line: lineNum, column: 8, message: `RC 08 (E) - Division header '${div}' must start in Area A (Columns 8-11).`, severity: 'error' })
        }
        if (!trimmedCode.endsWith('.')) {
          diags.push({ line: lineNum, column: line.indexOf(div) + div.length + 1, message: `RC 08 (E) - Division header '${div}' must end with a period '.'.`, severity: 'error' })
        }
      }
    }

    for (const sec of COBOL_SPECS.ALL_SECTIONS) {
      if (uppercaseCode.includes(sec)) {
        if (areaA.trim().length === 0) {
          diags.push({ line: lineNum, column: 8, message: `RC 08 (E) - Section header '${sec}' must start in Area A (Columns 8-11).`, severity: 'error' })
        }
        if (!trimmedCode.endsWith('.')) {
          diags.push({ line: lineNum, column: line.indexOf(sec) + sec.length + 1, message: `RC 08 (E) - Section header '${sec}' must end with a period '.'.`, severity: 'error' })
        }
      }
    }

    if (uppercaseCode.includes('PROGRAM-ID')) {
      context.hasProgramId = true
      if (areaA.trim().length === 0) {
        diags.push({ line: lineNum, column: 8, message: `RC 08 (E) - PROGRAM-ID paragraph header must start in Area A (Columns 8-11).`, severity: 'error' })
      }
      if (!trimmedCode.endsWith('.')) {
        diags.push({ line: lineNum, column: line.indexOf('PROGRAM-ID') + 11, message: `RC 08 (E) - PROGRAM-ID paragraph header must end with a period '.'.`, severity: 'error' })
      }
    }

    return diags
  }
}

export const AreaBStatementRule: CobolRule = {
  evaluateLine(line, lineNum) {
    const diags: Diagnostic[] = []
    if (line.length >= 7 && (line[6] === '*' || line[6] === '/')) return diags

    const wordsInLineMatch = Array.from(line.matchAll(/[A-Za-z0-9-]+/g))
    let firstCodeWord: string | null = null
    let firstCodeWordCol = 0
    
    for (const match of wordsInLineMatch) {
      const word = match[0].toUpperCase()
      const wordCol = match.index! + 1
      if (wordCol <= 6 && /^\d+$/.test(word)) continue
      if (wordCol === 7) continue
      firstCodeWord = word
      firstCodeWordCol = wordCol
      break
    }

    if (firstCodeWord) {
      for (const stmt of COBOL_SPECS.AREA_B_STATEMENTS) {
        if (firstCodeWord === stmt || firstCodeWord.startsWith(stmt + '-')) {
          if (firstCodeWordCol < 12) {
            diags.push({
              line: lineNum,
              column: firstCodeWordCol,
              message: `RC 08 (E) - Statement '${stmt}' must begin in Area B (Column 12 or later). Currently starts in Column ${firstCodeWordCol}.`,
              severity: 'error',
            })
          }
          break
        }
      }
    }
    return diags
  }
}

export const DataLevelRule: CobolRule = {
  evaluateLine(line, lineNum, context) {
    const diags: Diagnostic[] = []
    if (line.length >= 7 && (line[6] === '*' || line[6] === '/')) return diags
    const codeArea = line.length >= 8 ? line.substring(7, Math.min(line.length, 72)) : ''
    const trimmedCode = codeArea.trim()
    const uppercaseCode = trimmedCode.toUpperCase()

    const levelMatch = trimmedCode.match(/^(\d{2})\s+([A-Za-z0-9-]+)/)
    if (levelMatch) {
      const levelNum = levelMatch[1]
      const varName = levelMatch[2]
      context.declaredVariables.add(varName.toUpperCase())
      const isAreaALevel = COBOL_SPECS.AREA_A_LEVELS.includes(levelNum)
      const firstWordCol = line.indexOf(levelNum) + 1

      if (isAreaALevel) {
        if (firstWordCol >= 12) {
          diags.push({ line: lineNum, column: firstWordCol, message: `RC 04 (W) - Top-level data indicator '${levelNum}' should start in Area A (Columns 8-11).`, severity: 'warning' })
        }
      } else {
        if (firstWordCol < 12) {
          diags.push({ line: lineNum, column: firstWordCol, message: `RC 08 (E) - Sub-level data item '${levelNum}' must start in Area B (Column 12 or later).`, severity: 'error' })
        }
      }

      const hasClauses = COBOL_SPECS.DATA_CLAUSES.some(c => uppercaseCode.includes(c))
      if (hasClauses) {
        const namePart = trimmedCode.substring(0, trimmedCode.search(new RegExp(`\\b(${COBOL_SPECS.DATA_CLAUSES.join('|')})\\b`, 'i')))
        if (namePart.includes('.')) {
          diags.push({ line: lineNum, column: line.indexOf('.'), message: `RC 08 (E) - Premature period inside data item definition before clauses. The entire variable definition must end with a single period at the end.`, severity: 'error' })
        }
        if (!trimmedCode.endsWith('.')) {
          diags.push({ line: lineNum, column: line.length, message: `RC 08 (E) - Data item definition '${varName}' must end with a period '.'.`, severity: 'error' })
        }
      }
    }
    return diags
  }
}

export const UndefinedVariableRule: CobolRule = {
  evaluateLine(line, lineNum, context) {
    const diags: Diagnostic[] = []
    if (line.length >= 7 && (line[6] === '*' || line[6] === '/')) return diags
    const codeArea = line.length >= 8 ? line.substring(7, Math.min(line.length, 72)) : ''
    const trimmedCode = codeArea.trim()

    const wordsInLineMatch = Array.from(line.matchAll(/[A-Za-z0-9-]+/g))
    let firstCodeWord: string | null = null
    
    for (const match of wordsInLineMatch) {
      const word = match[0].toUpperCase()
      const wordCol = match.index! + 1
      if (wordCol <= 6 && /^\d+$/.test(word)) continue
      if (wordCol === 7) continue
      firstCodeWord = word
      break
    }

    if (firstCodeWord && COBOL_SPECS.ARITHMETIC_STATEMENTS.includes(firstCodeWord)) {
      const cleanedCode = trimmedCode.replace(/['"][^'"]*['"]/g, '')
      const words = Array.from(cleanedCode.matchAll(/[A-Za-z0-9-]+/g)).map(m => m[0])
      
      for (const word of words) {
        const uWord = word.toUpperCase()
        if (uWord && !/^\d+$/.test(uWord) && !COBOL_SPECS.RESERVED_WORDS.has(uWord)) {
          if (!context.declaredVariables.has(uWord)) {
            diags.push({ line: lineNum, column: line.indexOf(word) + 1, message: `RC 12 (S) - Undefined identifier '${word}'. Variable used without being declared in WORKING-STORAGE.`, severity: 'error' })
          }
        }
      }
    }
    return diags
  }
}

export const StopRunRule: CobolRule = {
  evaluateLine(line, lineNum) {
    const diags: Diagnostic[] = []
    if (line.length >= 7 && (line[6] === '*' || line[6] === '/')) return diags
    const codeArea = line.length >= 8 ? line.substring(7, Math.min(line.length, 72)) : ''
    const trimmedCode = codeArea.trim()
    const uppercaseCode = trimmedCode.toUpperCase()
    
    if (uppercaseCode.includes('STOP RUN') && !trimmedCode.endsWith('.')) {
      diags.push({ line: lineNum, column: line.toUpperCase().indexOf('STOP RUN') + 9, message: `RC 08 (E) - STOP RUN statement must end with a period '.'.`, severity: 'error' })
    }
    return diags
  }
}

export const HyphenRule: CobolRule = {
  evaluateLine(line, lineNum) {
    const diags: Diagnostic[] = []
    if (line.length >= 7 && (line[6] === '*' || line[6] === '/')) return diags
    const codeArea = line.length >= 8 ? line.substring(7, Math.min(line.length, 72)) : ''
    const trimmedCode = codeArea.trim()

    const words = trimmedCode.replace(/['"][^'"]*['"]/g, '').split(/[\s(),.]+/)
    for (const word of words) {
      if (word.length > 1 && (word.startsWith('-') || word.endsWith('-'))) {
        diags.push({ line: lineNum, column: line.indexOf(word) + 1, message: `RC 08 (E) - User-defined word '${word}' cannot begin or end with a hyphen.`, severity: 'error' })
      }
    }
    return diags
  }
}

export const StringLiteralRule: CobolRule = {
  evaluateLine(line, lineNum) {
    const diags: Diagnostic[] = []
    if (line.length >= 7 && (line[6] === '*' || line[6] === '/')) return diags
    const codeArea = line.length >= 8 ? line.substring(7, Math.min(line.length, 72)) : ''

    let inSingleQuote = false
    let inDoubleQuote = false
    for (let i = 0; i < codeArea.length; i++) {
      const char = codeArea[i]
      if (char === "'" && !inDoubleQuote) inSingleQuote = !inSingleQuote
      if (char === '"' && !inSingleQuote) inDoubleQuote = !inDoubleQuote
    }

    const indicatorChar = line.length >= 7 ? line[COBOL_SPECS.COLUMNS.INDICATOR] : ' '
    if ((inSingleQuote || inDoubleQuote) && indicatorChar !== '-') {
      diags.push({ line: lineNum, column: 8, message: `RC 12 (S) - Unclosed string quote in COBOL literal. Continuation lines require '-' in Column 7.`, severity: 'error' })
    }
    return diags
  }
}

export const LineLengthRule: CobolRule = {
  evaluateLine(line, lineNum) {
    const diags: Diagnostic[] = []
    if (line.length > COBOL_SPECS.COLUMNS.MAX_LINE_LENGTH && line.substring(COBOL_SPECS.COLUMNS.MAX_LINE_LENGTH).trim().length > 0) {
      diags.push({ line: lineNum, column: 73, message: `RC 04 (W) - Code beyond Column 72 (Identification Area) is ignored by standard COBOL compilers.`, severity: 'warning' })
    }
    return diags
  }
}

export const GlobalStructureRule: CobolRule = {
  evaluateGlobal(context) {
    const diags: Diagnostic[] = []
    if (!context.hasIdentificationDivision) {
      diags.push({ line: 1, column: 1, message: `RC 12 (S) - Missing required IDENTIFICATION DIVISION header.`, severity: 'error' })
    } else if (!context.hasProgramId) {
      diags.push({ line: 1, column: 1, message: `RC 12 (S) - Missing required PROGRAM-ID paragraph in IDENTIFICATION DIVISION.`, severity: 'error' })
    }
    return diags
  }
}

export const ALL_COBOL_RULES: CobolRule[] = [
  SequenceAreaRule,
  IndicatorAreaRule,
  DivisionAndSectionRule,
  AreaBStatementRule,
  DataLevelRule,
  UndefinedVariableRule,
  StopRunRule,
  HyphenRule,
  StringLiteralRule,
  LineLengthRule,
  GlobalStructureRule
]
