import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react'
import type { Diagnostic } from '../../lib/validation/schemas'

interface ValidationFeedbackProps {
  diagnostics: Diagnostic[]
  output?: string
  success?: boolean
}

export function ValidationFeedback({ diagnostics, output, success }: ValidationFeedbackProps) {
  if (diagnostics.length === 0 && !output && success === undefined) {
    return null
  }

  return (
    <div className="mt-4 flex flex-col gap-3 font-mono text-sm">
      {success && diagnostics.length === 0 && (
        <div className="p-3 bg-emerald-950/50 border border-emerald-900 text-emerald-400 rounded-md flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>Validation Successful. No syntax errors detected.</span>
        </div>
      )}

      {diagnostics.map((diag, index) => {
        let Icon = Info
        let colorClass = 'text-blue-400 bg-blue-950/50 border-blue-900'

        if (diag.severity === 'error') {
          Icon = AlertCircle
          colorClass = 'text-red-400 bg-red-950/50 border-red-900'
        } else if (diag.severity === 'warning') {
          Icon = AlertTriangle
          colorClass = 'text-yellow-400 bg-yellow-950/50 border-yellow-900'
        }

        return (
          <div key={index} className={`p-3 border rounded-md flex items-start gap-3 ${colorClass}`}>
            <Icon size={16} className="shrink-0 mt-0.5" />
            <div>
              <span className="font-bold mr-2">Line {diag.line}{diag.column ? `:${diag.column}` : ''}:</span>
              <span>{diag.message}</span>
            </div>
          </div>
        )
      })}

      {
        output && (
          <div className="p-4 bg-[#0a0a0a] border border-slate-800 text-slate-300 rounded-md mt-2">
            <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-bold">Compiler Output</div>
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        )
      }
    </div >
  )
}
