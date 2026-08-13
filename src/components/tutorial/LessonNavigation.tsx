import { useState } from 'react'
import { ChevronLeft, ChevronRight, Play, Loader2, Lightbulb, Check, Copy, ArrowDownToLine, Eye, EyeOff } from 'lucide-react'

interface LessonNavigationProps {
  onNext?: () => void
  onPrev?: () => void
  onRun?: () => void
  isRunning?: boolean
  hasNext?: boolean
  hasPrev?: boolean
  solutionCode?: string
  onApplySolution?: (code: string) => void
}

export function LessonNavigation({ 
  onNext, 
  onPrev, 
  onRun, 
  isRunning, 
  hasNext, 
  hasPrev,
  solutionCode,
  onApplySolution
}: LessonNavigationProps) {
  const [showAnswer, setShowAnswer] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!solutionCode) return
    await navigator.clipboard.writeText(solutionCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleApply = () => {
    if (!solutionCode || !onApplySolution) return
    onApplySolution(solutionCode)
  }

  return (
    <div className="mt-10 p-4 sm:p-5 md:p-6 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col gap-4 sm:gap-5 backdrop-blur-sm shadow-xl max-w-full overflow-hidden">
      {/* Top action row with full wrap and fluid responsiveness */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full">
        {/* Navigation & Run Controls */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3 flex-1 min-w-0">
          {onPrev && hasPrev && (
            <button
              onClick={onPrev}
              className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-750 text-slate-300 font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm whitespace-nowrap border border-slate-700/50"
            >
              <ChevronLeft size={15} />
              <span>Prev</span>
            </button>
          )}

          {onRun && (
            <button
              onClick={onRun}
              disabled={isRunning}
              className="flex-1 sm:flex-initial px-4 sm:px-6 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800/60 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm whitespace-nowrap"
            >
              {isRunning ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Play size={15} fill="currentColor" />
              )}
              <span>{isRunning ? 'Validating...' : 'Run Code'}</span>
            </button>
          )}

          {onNext && hasNext && (
            <button
              onClick={onNext}
              className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-750 text-slate-300 font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm whitespace-nowrap border border-slate-700/50"
            >
              <span>Next</span>
              <ChevronRight size={15} />
            </button>
          )}
        </div>

        {/* Show / Hide Answer Button */}
        {solutionCode && (
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className={`w-full sm:w-auto px-3.5 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 border whitespace-nowrap shrink-0 ${
              showAnswer 
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.15)]' 
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border-slate-700'
            }`}
          >
            <Lightbulb size={15} className={showAnswer ? 'text-amber-400' : 'text-slate-400'} />
            <span>{showAnswer ? 'Hide Answer' : 'Show Answer'}</span>
            {showAnswer ? <EyeOff size={14} className="opacity-80" /> : <Eye size={14} className="opacity-80" />}
          </button>
        )}
      </div>

      {/* Answer Drawer / Dropdown */}
      {showAnswer && solutionCode && (
        <div className="bg-slate-950 rounded-lg border border-amber-500/20 p-3 sm:p-4 animate-in fade-in slide-in-from-top-2 duration-200 w-full overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-800/80">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
              <Lightbulb size={13} />
              <span>Verified Solution</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded flex items-center gap-1.5 transition-colors border border-slate-700/50"
                title="Copy Solution"
              >
                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              {onApplySolution && (
                <button
                  onClick={handleApply}
                  className="px-2.5 py-1 text-xs bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded flex items-center gap-1.5 transition-colors font-medium"
                  title="Insert into editor"
                >
                  <ArrowDownToLine size={12} />
                  <span>Apply to Editor</span>
                </button>
              )}
            </div>
          </div>
          <pre className="font-mono text-[11px] sm:text-xs text-emerald-400/90 overflow-x-auto p-2.5 sm:p-3 bg-slate-900/70 rounded border border-slate-800/60 leading-relaxed selection:bg-emerald-500/20 w-full max-w-full">
            <code>{solutionCode}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
