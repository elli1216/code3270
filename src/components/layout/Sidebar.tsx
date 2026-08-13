import { Link, useSearch, useRouter } from '@tanstack/react-router'
import { Terminal, CheckCircle2, AlertTriangle, Code2, ChevronRight, RotateCcw, X } from 'lucide-react'
import { useProgressStore } from '../../store/progressStore'
import { TUTORIAL_CURRICULUM } from '../../lib/tutorialCurriculum'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SidebarProps {
  onCloseMobile?: () => void
  isMobile?: boolean
}

export function Sidebar({ onCloseMobile, isMobile = false }: SidebarProps) {
  const isLessonCompleted = useProgressStore((state) => state.isLessonCompleted)
  const resetProgress = useProgressStore((state) => state.resetProgress)
  const search = useSearch({ strict: false })
  const router = useRouter()
  const [showResetModal, setShowResetModal] = useState(false)

  const handleReset = () => {
    resetProgress()
    setShowResetModal(false)
    if (onCloseMobile) onCloseMobile()
    router.navigate({ to: '/learn', search: { track: 'cobol', module: 'anatomy' } })
  }

  const handleLessonClick = () => {
    if (onCloseMobile) {
      onCloseMobile()
    }
  }

  return (
    <>
      <aside className={`w-[280px] sm:w-[300px] border-r border-slate-800/60 bg-[#0a0f12] flex flex-col h-full overflow-y-auto font-sans ${isMobile ? 'w-full' : 'hidden md:flex'}`}>
        <div className="p-4 sm:p-5 border-b border-slate-800/60 sticky top-0 bg-[#0a0f12]/95 backdrop-blur z-10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group w-max" onClick={handleLessonClick}>
            <div className="bg-emerald-500/10 p-1.5 rounded-md border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
              <Terminal size={18} className="text-emerald-400" />
            </div>
            <span className="text-slate-100 group-hover:text-white transition-colors font-mono font-bold text-lg tracking-tight">Code3270</span>
          </Link>

          {isMobile && onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div className="flex-1 py-4 sm:py-6 px-3 space-y-6 sm:space-y-8">
          {TUTORIAL_CURRICULUM.map((trackConfig) => {
            const completedCount = trackConfig.modules.filter(m => isLessonCompleted(`${trackConfig.track}-${m.id}`)).length
            const totalCount = trackConfig.modules.length

            return (
              <div key={trackConfig.id} className="relative">
                <div className="px-3 mb-2.5 flex items-center justify-between">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <span className="text-emerald-500/80">{trackConfig.icon}</span>
                    <span className="truncate">{trackConfig.title}</span>
                  </h3>
                  <span className="text-[10px] font-mono font-semibold text-slate-500 bg-slate-800/60 px-1.5 py-0.5 rounded shrink-0">
                    {completedCount}/{totalCount}
                  </span>
                </div>

                <ul className="space-y-1 relative">
                  <div className="absolute left-[21px] top-4 bottom-4 w-px bg-slate-800/50 z-0" />

                  {trackConfig.modules.map((mod) => {
                    const isActive = search.track === trackConfig.track && search.module === mod.id
                    const isDefaultActive = !search.track && trackConfig.track === 'cobol' && mod.id === 'anatomy'
                    const currentlyActive = isActive || isDefaultActive
                    const isCompleted = isLessonCompleted(`${trackConfig.track}-${mod.id}`)

                    return (
                      <li key={mod.id} className="relative z-10">
                        <Link
                          to="/learn"
                          search={{ track: trackConfig.track, module: mod.id }}
                          onClick={handleLessonClick}
                          className={`group flex items-center gap-3 px-3 py-2 text-xs sm:text-sm rounded-lg transition-all ${currentlyActive
                            ? 'bg-emerald-500/15 text-emerald-300 font-medium border border-emerald-500/30'
                            : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                            }`}
                        >
                          <div className={`shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center transition-colors border ${isCompleted
                            ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                            : currentlyActive
                              ? 'bg-slate-800 border-emerald-500/50 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                              : 'bg-slate-900 border-slate-700 text-transparent group-hover:border-slate-500'
                            }`}>
                            {isCompleted && <CheckCircle2 size={12} className="stroke-[3]" />}
                            {!isCompleted && currentlyActive && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                          </div>
                          <span className="truncate flex-1">{mod.title}</span>
                          {currentlyActive && (
                            <ChevronRight size={14} className="text-emerald-500/50 shrink-0" />
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="p-3 sm:p-4 border-t border-slate-800/60 bg-[#0a0f12] flex flex-col gap-2.5">
          <Link
            to="/syntax"
            onClick={handleLessonClick}
            className="group flex items-center justify-center gap-2 w-full py-2.5 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 text-slate-300 text-xs sm:text-sm font-semibold rounded-lg transition-all"
          >
            <Code2 size={16} className="text-slate-400 group-hover:text-emerald-400 transition-colors" />
            Syntax Sandbox
          </Link>
          <button
            onClick={() => setShowResetModal(true)}
            className="flex items-center justify-center gap-2 w-full py-2 hover:bg-red-500/10 text-slate-500 hover:text-red-400 text-xs font-semibold rounded-lg transition-all border border-transparent hover:border-red-500/20"
          >
            <RotateCcw size={13} /> Reset Progress
          </button>

          <div className="flex items-center justify-between px-1 mt-1">
            <span className="flex items-center gap-1.5 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-slate-500">
              <AlertTriangle size={11} className="text-amber-500/70" /> DB2/CICS Soon
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-slate-600">v0.1.0-alpha</span>
          </div>
        </div>
      </aside>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setShowResetModal(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#0d1317] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden font-sans z-10"
            >
              <div className="p-5 sm:p-6">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 border border-red-500/20">
                  <AlertTriangle size={24} className="text-red-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Reset All Progress?</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
                  This will completely clear your completed lessons and all saved code from the workspace. This action cannot be undone. Are you sure you want to proceed?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowResetModal(false)}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold text-xs sm:text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-400 text-white font-bold text-xs sm:text-sm transition-colors shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                  >
                    Yes, Reset Progress
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
