import type { Diagnostic } from './schemas.ts'
import type { CobolContext } from './cobolRules.ts'
import { ALL_COBOL_RULES } from './cobolRules.ts'

/**
 * Enforces COBOL Strict Syntax & Punctuation Rules using a modular Rule-based engine.
 * To add new rules, implement the CobolRule interface and add it to ALL_COBOL_RULES.
 */
export function lintCOBOL(sourceCode: string): Diagnostic[] {
  const diagnostics: Diagnostic[] = []
  const lines = sourceCode.split('\n')

  const context: CobolContext = {
    hasIdentificationDivision: false,
    hasProgramId: false,
    declaredVariables: new Set<string>(),
  }

  lines.forEach((line, index) => {
    const lineNum = index + 1

    // Ignore completely empty lines
    if (line.trim().length === 0) return

    for (const rule of ALL_COBOL_RULES) {
      if (rule.evaluateLine) {
        diagnostics.push(...rule.evaluateLine(line, lineNum, context))
      }
    }
  })

  // Global Structure Validation
  for (const rule of ALL_COBOL_RULES) {
    if (rule.evaluateGlobal) {
      diagnostics.push(...rule.evaluateGlobal(context))
    }
  }

  return diagnostics
}
