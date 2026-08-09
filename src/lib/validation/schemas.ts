import { z } from 'zod'

// Shared schemas for both languages
export const DiagnosticSchema = z.object({
  line: z.number(),
  column: z.number().optional(),
  message: z.string(),
  severity: z.enum(['error', 'warning', 'info']),
})

export type Diagnostic = z.infer<typeof DiagnosticSchema>

export const ValidationResultSchema = z.object({
  success: z.boolean(),
  diagnostics: z.array(DiagnosticSchema),
  output: z.string().optional(),
})

export type ValidationResult = z.infer<typeof ValidationResultSchema>

// Payload for COBOL API validation
export const CobolValidationPayloadSchema = z.object({
  sourceCode: z.string().min(1, 'Source code cannot be empty'),
  compilerOptions: z.array(z.string()).optional()
})

export type CobolValidationPayload = z.infer<typeof CobolValidationPayloadSchema>
