import { ChevronLeft, ChevronRight, Play, Loader2 } from 'lucide-react'

interface LessonNavigationProps {
  onNext?: () => void
  onPrev?: () => void
  onRun?: () => void
  isRunning?: boolean
  hasNext?: boolean
  hasPrev?: boolean
}

export function LessonNavigation({ onNext, onPrev, onRun, isRunning, hasNext, hasPrev }: LessonNavigationProps) {
  return (
    <div className="mt-12 p-6 bg-slate-900 border border-slate-800 rounded-xl flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2">
            Interactive Workspace
          </h3>
          <p className="text-slate-400 text-sm">
            Ready to test your code? Click run to execute it in the mainframe emulator.
          </p>
        </div>
        
        <div className="flex items-center gap-4 shrink-0">
          {onPrev && hasPrev && (
            <button 
              onClick={onPrev}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              Prev
            </button>
          )}

          {onRun && (
            <button 
              onClick={onRun}
              disabled={isRunning}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white font-medium rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all flex items-center gap-2"
            >
              {isRunning ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Play size={16} fill="currentColor" />
              )}
              {isRunning ? 'Validating...' : 'Run Code'}
            </button>
          )}

          {onNext && hasNext && (
            <button 
              onClick={onNext}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              Next
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
