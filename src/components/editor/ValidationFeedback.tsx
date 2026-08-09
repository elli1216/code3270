import { AlertCircle, CheckCircle2, Info, AlertTriangle, Terminal } from 'lucide-react'
import type { Diagnostic } from '../../lib/validation/schemas'
import { motion, AnimatePresence } from 'framer-motion'

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
    <div className="mt-6 flex flex-col gap-3 font-mono text-sm max-w-full">
      <AnimatePresence mode="popLayout">
        {success && diagnostics.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.1)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
            <CheckCircle2 size={18} className="shrink-0" />
            <span className="font-medium tracking-wide">Validation Successful. Output generated correctly.</span>
          </motion.div>
        )}

        {diagnostics.map((diag, index) => {
          let Icon = Info
          let colorClass = 'text-blue-400 bg-blue-500/10 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
          let indicatorColor = 'bg-blue-500'

          if (diag.severity === 'error') {
            Icon = AlertCircle
            colorClass = 'text-red-400 bg-red-500/10 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
            indicatorColor = 'bg-red-500'
          } else if (diag.severity === 'warning') {
            Icon = AlertTriangle
            colorClass = 'text-amber-400 bg-amber-500/10 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
            indicatorColor = 'bg-amber-500'
          }

          return (
            <motion.div 
              key={`diag-${index}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 border rounded-xl flex items-start gap-3 relative overflow-hidden ${colorClass}`}
            >
              <div className={`absolute top-0 left-0 w-1 h-full ${indicatorColor}`} />
              <Icon size={18} className="shrink-0 mt-0.5" />
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <span className="font-bold opacity-80 whitespace-nowrap">Line {diag.line}{diag.column ? `:${diag.column}` : ''}:</span>
                <span className="leading-relaxed">{diag.message}</span>
              </div>
            </motion.div>
          )
        })}

        {output && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl overflow-hidden mt-2 border border-slate-800 shadow-xl bg-[#080c0f]"
          >
            <div className="h-9 px-4 bg-slate-900/80 border-b border-slate-800 flex items-center gap-2">
              <Terminal size={14} className="text-slate-400" />
              <span className="text-[11px] text-slate-400 font-bold tracking-widest uppercase">System Output</span>
            </div>
            <div className="p-5 text-slate-300 font-mono text-[13px] leading-relaxed overflow-x-auto">
              <pre className="whitespace-pre-wrap">{output}</pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
