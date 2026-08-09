import type { Diagnostic } from './schemas'
import { COBOL_SPECS } from './constants'

export function lintCOBOL(sourceCode: string): Diagnostic[] {
  const diagnostics: Diagnostic[] = []
  const lines = sourceCode.split('\n')
  
  let hasIdentificationDivision = false
  let hasProgramId = false

  lines.forEach((line, index) => {
    const lineNum = index + 1
    
    // Ignore completely empty lines
    if (line.trim().length === 0) return

    // COBOL Fixed Format Rules
    
    // 1. Column 7: Indicator Area
    if (line.length > COBOL_SPECS.COLUMNS.INDICATOR) {
      const indicator = line[COBOL_SPECS.COLUMNS.INDICATOR]
      if (!COBOL_SPECS.INDICATORS.includes(indicator)) {
        diagnostics.push({
          line: lineNum,
          message: `Invalid character '${indicator}' in indicator area (column 7). Expected space, *, /, or -.`,
          severity: 'error'
        })
      }
      
      // If it's a comment, we can skip further checks for this line
      if (indicator === '*' || indicator === '/') {
        return
      }
    }

    // 2. Area A (Columns 8-11)
    const areaA = line.substring(COBOL_SPECS.COLUMNS.AREA_A_START, COBOL_SPECS.COLUMNS.AREA_A_END)
    const fullText = line.substring(COBOL_SPECS.COLUMNS.AREA_A_START, COBOL_SPECS.COLUMNS.AREA_B_END).trim()

    if (fullText.length > 0) {
      // Check for mandatory divisions
      if (COBOL_SPECS.MANDATORY_DIVISIONS.some(div => fullText.toUpperCase().includes(div))) {
        hasIdentificationDivision = true
        if (!areaA.toUpperCase().includes('IDEN')) {
           diagnostics.push({
             line: lineNum,
             message: 'Division headers must start in Area A (Columns 8-11).',
             severity: 'error'
           })
        }
      }
      
      if (COBOL_SPECS.MANDATORY_PARAGRAPHS.some(para => fullText.toUpperCase().includes(para))) {
        hasProgramId = true
        if (!areaA.toUpperCase().includes('PROG')) {
           diagnostics.push({
             line: lineNum,
             message: 'Paragraph headers like PROGRAM-ID must start in Area A (Columns 8-11).',
             severity: 'error'
           })
        }
      }

      // Check Area B restrictions (statements cannot start in Area A)
      for (const stmt of COBOL_SPECS.AREA_B_STATEMENTS) {
        if (areaA.toUpperCase().includes(stmt.substring(0, Math.min(4, stmt.length)))) {
          // If the statement is actually starting in Area A
          if (line.substring(COBOL_SPECS.COLUMNS.AREA_A_START).trimStart().toUpperCase().startsWith(stmt)) {
            diagnostics.push({
              line: lineNum,
              message: `Statement '${stmt}' must begin in Area B (Column 12 or later).`,
              severity: 'error'
            })
          }
        }
      }
      
      // Check Level Numbers (01, 77 in Area A; others in Area B)
      const firstWord = fullText.split(' ')[0]
      if (COBOL_SPECS.AREA_A_LEVELS.includes(firstWord)) {
         if (areaA.trim() === '') {
            diagnostics.push({
              line: lineNum,
              message: `Level number '${firstWord}' should start in Area A (Columns 8-11).`,
              severity: 'warning'
            })
         }
      } else if (firstWord.match(/^[0-4][0-9]$/) && !COBOL_SPECS.AREA_A_LEVELS.includes(firstWord)) {
         if (areaA.trim() !== '') {
            diagnostics.push({
              line: lineNum,
              message: `Level number '${firstWord}' should start in Area B (Column 12 or later).`,
              severity: 'warning'
            })
         }
      }
    }

    // 3. Line length limits
    if (line.length > COBOL_SPECS.COLUMNS.MAX_LINE_LENGTH && line.substring(COBOL_SPECS.COLUMNS.MAX_LINE_LENGTH).trim().length > 0) {
      if (lineNum === index + 1) { 
         diagnostics.push({
           line: lineNum,
           message: `Code beyond column ${COBOL_SPECS.COLUMNS.MAX_LINE_LENGTH} is ignored by standard COBOL compilers.`,
           severity: 'warning'
         })
      }
    }
  })

  // Global Structure Checks
  if (!hasIdentificationDivision) {
    diagnostics.push({
      line: 1,
      message: 'Missing required IDENTIFICATION DIVISION.',
      severity: 'error'
    })
  } else if (!hasProgramId) {
    diagnostics.push({
      line: 1,
      message: 'Missing required PROGRAM-ID paragraph in IDENTIFICATION DIVISION.',
      severity: 'error'
    })
  }

  return diagnostics
}
