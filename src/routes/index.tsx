import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Terminal, Server, Code, ChevronRight, CheckCircle2, MonitorPlay } from 'lucide-react'
import { useThemeStore } from '../store/themeStore'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  const { isRetroMode, toggleRetroMode } = useThemeStore()

  return (
    <div className="min-h-screen bg-[#0a0f12] text-slate-200 selection:bg-emerald-500/30 overflow-hidden relative flex flex-col font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/10 rounded-full blur-[140px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/10 rounded-full blur-[140px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      </div>

      {/* Modern Glassmorphic Header */}
      <header className="fixed top-0 inset-x-0 z-50 w-full border-b border-white/5 bg-[#0a0f12]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-emerald-400 font-mono font-bold text-xl tracking-tight group cursor-pointer">
            <div className="bg-emerald-500/10 p-1.5 rounded-md border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
              <Terminal size={20} className="text-emerald-400" />
            </div>
            <span className="text-slate-100 group-hover:text-white transition-colors">Code3270</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleRetroMode}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors border ${isRetroMode
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                : 'bg-slate-800/50 text-slate-400 border-slate-700/50 hover:bg-slate-800 hover:text-slate-300'
                }`}
            >
              <MonitorPlay size={14} />
              TN3270 Mode
            </button>
            <div className="h-5 w-px bg-slate-800 hidden md:block" />
            <Link
              to="/syntax"
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors hidden md:block"
            >
              Sandbox
            </Link>
            <Link
              to="/learn"
              className="px-5 py-2 text-sm font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 rounded-md transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col items-center flex-1 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 mb-8 font-mono text-[13px] shadow-[0_0_20px_rgba(16,185,129,0.05)]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            INITIALIZING SYS1.PROCLIB...
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 text-white">
            Master the Engines of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              Global Commerce
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto font-light">
            A frictionless, interactive web platform to learn, write, and validate
            <strong className="text-emerald-300 font-medium mx-1.5">COBOL</strong> and
            <strong className="text-emerald-300 font-medium mx-1.5">JCL</strong>.
            No mainframes to configure. Just pure code.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/learn"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold text-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] overflow-hidden w-full sm:w-auto justify-center"
            >
              Launch Workspace
              <ChevronRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/syntax"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-slate-200 rounded-xl font-semibold text-lg transition-all border border-slate-700 hover:border-slate-600 w-full sm:w-auto justify-center"
            >
              Try Sandbox
            </Link>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-8 w-full">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="p-10 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden group hover:bg-slate-900/60 transition-all hover:border-emerald-500/30"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-slate-800/80 flex items-center justify-center border border-slate-700/50 mb-8 text-emerald-400 shadow-lg shadow-emerald-900/20">
                <Code size={28} />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-slate-100">The Legacy of COBOL</h2>
              <p className="text-slate-400 leading-relaxed mb-8 font-light text-lg">
                Created in 1959, COBOL remains the backbone of the global financial system, processing trillions of dollars daily in absolute stability.
              </p>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                  <span>Processes 85% of global business transactions</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                  <span>Powers 95% of ATM swipes worldwide</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                  <span>Over 220 billion lines of active code in production</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-10 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden group hover:bg-slate-900/60 transition-all hover:border-emerald-500/30"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-slate-800/80 flex items-center justify-center border border-slate-700/50 mb-8 text-emerald-400 shadow-lg shadow-emerald-900/20">
                <Server size={28} />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-slate-100">Modern Architecture</h2>
              <p className="text-slate-400 leading-relaxed mb-8 font-light text-lg">
                Learn legacy technologies using a state-of-the-art interactive workspace. No emulators, no downloads, just instant feedback.
              </p>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                  <span>In-browser local syntax validation engine</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                  <span>Intelligent Activity Constraints Engine (ACE)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                  <span>Monaco Editor with strict column rendering</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/60 bg-[#0a0f12]/80 backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
          <p>© 2026 Code3270. Built for the next generation of mainframe engineers.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/learn" className="hover:text-emerald-400 transition-colors">Curriculum</Link>
            <Link to="/syntax" className="hover:text-emerald-400 transition-colors">Playground</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
