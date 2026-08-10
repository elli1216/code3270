import type { Diagnostic } from './schemas.ts'
import { ALL_JCL_RULES } from './jclRules.ts'
import type { JclContext } from './jclRules'

/**
 * Enforces JCL Strict Syntax & Punctuation Rules using a modular Rule-based engine.
 * To add new rules, implement the JclRule interface and add it to ALL_JCL_RULES.
 */
export function lintJCL(source: string): Diagnostic[] {
  const diagnostics: Diagnostic[] = []
  const lines = source.split('\n')

  const context: JclContext = {
    inContinuation: false,
    activeParamContext: '',
  }

  lines.forEach((line, index) => {
    const lineNum = index + 1

    if (!context.inContinuation) {
      context.activeParamContext = ''
    }

    // Ignore completely empty lines
    if (line.trim().length === 0) {
      context.inContinuation = false
      return
    }

    // Run modular rules
    for (const rule of ALL_JCL_RULES) {
      diagnostics.push(...rule.evaluateLine(line, lineNum, context))
    }

    // Determine continuation state for the NEXT line
    const effectiveLine = line.length > 71 ? line.substring(0, 71) : line
    const trimmedCol71 = effectiveLine.trimEnd()
    if (trimmedCol71.endsWith(',')) {
      let inQuote = false
      for (let i = 0; i < trimmedCol71.length; i++) {
        if (trimmedCol71[i] === "'") inQuote = !inQuote
      }
      context.inContinuation = !inQuote
    } else {
      context.inContinuation = false
    }
  })

  return diagnostics
}
