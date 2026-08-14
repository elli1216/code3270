import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Terminal, Server, Code, ChevronRight, CheckCircle2, MonitorPlay } from 'lucide-react'
import { useThemeStore } from '../store/themeStore'
import { HistorySection } from '../components/home/HistorySection'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  const isRetroMode = useThemeStore((s) => s.isRetroMode)
  const toggleRetroMode = useThemeStore((s) => s.toggleRetroMode)

  return (
    <div className="min-h-screen bg-[#0a0f12] text-slate-200 selection:bg-emerald-500/30 relative flex flex-col font-sans">
      {/* Background Elements - constrained to prevent scroll overflow */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/10 rounded-full blur-[140px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/10 rounded-full blur-[140px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      </div>

      {/* Modern Glassmorphic Header */}
      <header className="fixed top-0 inset-x-0 z-50 w-full border-b border-white/5 bg-[#0a0f12]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-lg sm:text-xl tracking-tight group shrink-0">
            <div className="bg-emerald-500/10 p-1.5 rounded-md border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
              <Terminal size={18} className="text-emerald-400 sm:w-5 sm:h-5" />
            </div>
            <span className="text-slate-100 group-hover:text-white transition-colors">Code3270</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleRetroMode}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-md text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors border ${isRetroMode
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                : 'bg-slate-800/50 text-slate-400 border-slate-700/50 hover:bg-slate-800 hover:text-slate-300'
                }`}
            >
              <MonitorPlay size={13} className="sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">TN3270 Mode</span>
              <span className="sm:hidden">TN3270</span>
            </button>

            <Link
              to="/syntax"
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors hidden md:block"
            >
              Sandbox
            </Link>

            <Link
              to="/learn"
              className="px-3.5 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 rounded-md transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] whitespace-nowrap"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-8 sm:pt-32 sm:pb-12 flex flex-col items-center flex-1 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 mb-6 sm:mb-8 font-mono text-xs sm:text-[13px] shadow-[0_0_20px_rgba(16,185,129,0.05)]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate">INITIALIZING SYS1.PROCLIB...</span>
          </motion.div>

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8 text-white leading-tight">
            Master the Engines of <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              Global Commerce
            </span>
          </h1>

          <p className="text-sm sm:text-lg lg:text-xl text-slate-400 leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto font-light px-2">
            A frictionless, interactive web platform to learn, write, and validate
            <strong className="text-emerald-300 font-medium mx-1">COBOL</strong> and
            <strong className="text-emerald-300 font-medium mx-1">JCL</strong>.
            No mainframes to configure. Just pure code.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
            <Link
              to="/learn"
              className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold text-base sm:text-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] overflow-hidden w-full sm:w-auto justify-center"
            >
              Launch Workspace
              <ChevronRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/syntax"
              className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-slate-800/50 hover:bg-slate-800 text-slate-200 rounded-xl font-semibold text-base sm:text-lg transition-all border border-slate-700 hover:border-slate-600 w-full sm:w-auto justify-center"
            >
              Try Sandbox
            </Link>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden group hover:bg-slate-900/60 transition-all hover:border-emerald-500/30"
          >
            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-800/80 flex items-center justify-center border border-slate-700/50 mb-6 sm:mb-8 text-emerald-400 shadow-lg shadow-emerald-900/20">
                <Code size={24} className="sm:w-7 sm:h-7" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-slate-100">The Legacy of COBOL</h2>
              <p className="text-slate-400 leading-relaxed mb-6 sm:mb-8 font-light text-sm sm:text-lg">
                Created in 1959, COBOL remains the backbone of the global financial system, processing trillions of dollars daily in absolute stability.
              </p>
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-base text-slate-300">
                <li className="flex items-center gap-2.5 sm:gap-3">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  <span>Processes 85% of global business transactions</span>
                </li>
                <li className="flex items-center gap-2.5 sm:gap-3">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  <span>Powers 95% of ATM swipes worldwide</span>
                </li>
                <li className="flex items-center gap-2.5 sm:gap-3">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  <span>Over 220 billion lines of active code in production</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden group hover:bg-slate-900/60 transition-all hover:border-emerald-500/30"
          >
            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-800/80 flex items-center justify-center border border-slate-700/50 mb-6 sm:mb-8 text-emerald-400 shadow-lg shadow-emerald-900/20">
                <Server size={24} className="sm:w-7 sm:h-7" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-slate-100">Modern Architecture</h2>
              <p className="text-slate-400 leading-relaxed mb-6 sm:mb-8 font-light text-sm sm:text-lg">
                Learn legacy technologies using a state-of-the-art interactive workspace. No emulators, no downloads, just instant feedback.
              </p>
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-base text-slate-300">
                <li className="flex items-center gap-2.5 sm:gap-3">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  <span>In-browser local syntax validation engine</span>
                </li>
                <li className="flex items-center gap-2.5 sm:gap-3">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  <span>Intelligent Activity Constraints Engine (ACE)</span>
                </li>
                <li className="flex items-center gap-2.5 sm:gap-3">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  <span>Monaco Editor with strict column rendering</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Setup Guide Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full mt-6 sm:mt-8 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-emerald-500/5 border border-emerald-500/20 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 hover:bg-emerald-500/10 transition-all"
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-emerald-300">GnuCOBOL Setup Guide</h2>
            <p className="text-slate-400 font-light text-sm sm:text-base max-w-2xl">
              Want to compile and run COBOL locally on your own Windows machine? Follow our step-by-step guide to install the compiler and configure VSCode.
            </p>
          </div>
          <Link
            to="/setup"
            className="group shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-slate-800/80 hover:bg-slate-700 text-emerald-400 rounded-xl font-semibold text-sm sm:text-base transition-all border border-slate-700 hover:border-emerald-500/30"
          >
            View Setup Guide
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Dynamic History Section */}
        <HistorySection />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/50 bg-[#0a0f12]/90 backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6 flex flex-col md:flex-row items-center justify-between text-slate-500 text-xs sm:text-sm gap-3 md:gap-0 text-center md:text-left">
          <p>© 2026 Code3270. Built for the next generation of mainframe engineers.</p>
          <div className="flex gap-6">
            <Link to="/learn" className="hover:text-emerald-400 transition-colors">Curriculum</Link>
            <Link to="/syntax" className="hover:text-emerald-400 transition-colors">Playground</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
