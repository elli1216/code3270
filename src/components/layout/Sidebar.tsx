import { Link, useSearch } from '@tanstack/react-router'
import { Terminal, CheckCircle2, AlertTriangle, PlayCircle, Code2 } from 'lucide-react'
import { useProgressStore } from '../../store/progressStore'
import { TUTORIAL_CURRICULUM } from '../../lib/tutorialCurriculum'

export function Sidebar() {
  const { isLessonCompleted } = useProgressStore()
  const search = useSearch({ strict: false })

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900 flex flex-col h-full overflow-y-auto hidden md:flex">
      <div className="p-4 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
        <Link to="/" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-mono font-bold text-lg tracking-tight">
          <Terminal size={20} />
          <span>Code3270</span>
        </Link>
      </div>

      <div className="flex-1 py-4">
        {TUTORIAL_CURRICULUM.map((trackConfig) => (
          <div key={trackConfig.id} className="mb-6">
            <h3 className="px-4 mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              {trackConfig.icon}
              {trackConfig.title}
            </h3>
            <ul className="space-y-1">
              {trackConfig.modules.map((mod) => {
                const isActive = search.track === trackConfig.track && search.module === mod.id
                // Fallback for default landing
                const isDefaultActive = !search.track && trackConfig.track === 'cobol' && mod.id === 'anatomy'
                const isCompleted = isLessonCompleted(`${trackConfig.track}-${mod.id}`)

                return (
                  <li key={mod.id}>
                    <Link
                      to="/learn"
                      search={{ track: trackConfig.track, module: mod.id }}
                      className={`flex items-center justify-between px-4 py-2 text-sm transition-colors ${isActive || isDefaultActive
                          ? 'bg-emerald-900/20 text-emerald-300 border-r-2 border-emerald-500 font-medium'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
                        }`}
                    >
                      <span className="truncate pr-2">{mod.title}</span>
                      {isCompleted ? (
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      ) : (
                        (isActive || isDefaultActive) && <PlayCircle size={14} className="text-emerald-400 shrink-0 opacity-50" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800 flex flex-col gap-3">
        <Link
          to="/syntax"
          className="flex items-center justify-center gap-2 w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-colors"
        >
          <Code2 size={16} /> Syntax Checker
        </Link>
        <div className="text-xs text-slate-500 text-center flex flex-col gap-2">
          <span className="flex items-center justify-center gap-1"><AlertTriangle size={12} /> DB2/CICS coming soon</span>
          <span>v0.1.0-alpha</span>
        </div>
      </div>
    </aside>
  )
}
