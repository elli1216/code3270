import { Link, useRouter } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {
  Terminal,
  Home,
  BookOpen,
  Code2,
  ArrowLeft,
  SearchX,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from 'lucide-react'

export function NotFound() {
  const router = useRouter()

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.history.back()
    } else {
      router.navigate({ to: '/' })
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0f12] text-slate-200 selection:bg-emerald-500/30 overflow-hidden relative flex flex-col font-sans">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[160px] mix-blend-screen" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-teal-600/10 rounded-full blur-[140px] mix-blend-screen" />
        <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-emerald-900/15 rounded-full blur-[120px] mix-blend-screen" />

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      </div>

      {/* Header Bar */}
      <header className="relative z-20 border-b border-white/5 bg-[#0a0f12]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-emerald-400 font-mono font-bold text-xl tracking-tight group"
          >
            <div className="bg-emerald-500/10 p-1.5 rounded-md border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
              <Terminal size={20} className="text-emerald-400" />
            </div>
            <span className="text-slate-100 group-hover:text-white transition-colors">
              Code3270
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white bg-slate-800/40 hover:bg-slate-800/80 rounded-lg border border-slate-700/60 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 rounded-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
            >
              <Home size={16} />
              <span>Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-16 lg:py-24 flex flex-col items-center justify-center flex-1 w-full text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-mono tracking-wide mb-8 shadow-[0_0_20px_rgba(245,158,11,0.1)]"
        >
          <AlertTriangle size={15} className="animate-pulse text-amber-400 shrink-0" />
          <span>SYSTEM ABEND S0C4 • DATASET_NOT_FOUND</span>
        </motion.div>

        {/* Large Visual 404 Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6 select-none"
        >
          {/* Glowing 404 Text */}
          <h1 className="text-8xl sm:text-9xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-100 via-slate-300 to-slate-600 drop-shadow-[0_0_35px_rgba(16,185,129,0.25)]">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <SearchX size={120} className="text-emerald-500/10 blur-[1px] transform translate-y-2 stroke-[1.5]" />
          </div>
        </motion.div>

        {/* Heading & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl mx-auto mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
            Address Boundary Exceeded
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-light">
            The requested dataset or memory segment could not be located in{' '}
            <code className="text-emerald-400 bg-emerald-950/40 border-emerald-800/50 font-mono text-sm px-2 py-0.5 rounded">
              SYS1.PROCLIB
            </code>
            . It may have been cataloged under a new address or moved.
          </p>
        </motion.div>

        {/* Mainframe 3270 Mock Terminal Error Log */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-2xl bg-[#060a0c] border border-slate-800/90 rounded-2xl p-5 mb-12 text-left font-mono text-xs sm:text-sm shadow-2xl shadow-emerald-950/20 relative overflow-hidden group"
        >
          {/* Terminal Window Control Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3 text-slate-500 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-medium text-slate-400">IBM-3270 MODEL 2 • SYSLOG TERMINAL</span>
            </div>
            <span className="text-emerald-500/70 text-[11px] hidden sm:inline-block">STATUS: READY</span>
          </div>

          {/* Simulated Error Output */}
          <div className="space-y-1.5 text-slate-300">
            <p className="text-slate-500">
              <span className="text-emerald-400">JOB04041</span> 00000090 //EXEC PGM=CODE3270,REGION=4M
            </p>
            <p className="text-slate-500">
              <span className="text-emerald-400">JOB04041</span> 00000100 //STEPLIB DD DSN=SYS1.LINKLIB,DISP=SHR
            </p>
            <p className="text-amber-400/90">
              IEC130I ROUTE DD STATEMENT MISSING FOR URL_DISPATCHER
            </p>
            <p className="text-rose-400 font-semibold flex items-center gap-1.5">
              <span>SYSTEM COMPLETION CODE 0C4 REASON CODE 00000011</span>
            </p>
            <p className="text-slate-400 pt-1 border-t border-slate-800/60 text-xs flex items-center justify-between">
              <span>SUGGESTED RECOVERY ACTION: RETURN TO CATALOG DIRECTORY</span>
              <span className="text-emerald-400 animate-pulse">_</span>
            </p>
          </div>
        </motion.div>

        {/* Action Buttons & Quick Nav */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-2xl"
        >
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <Link
              to="/"
              className="group p-4 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col items-center text-center gap-2.5 text-slate-200 hover:text-white"
            >
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                <Home size={20} />
              </div>
              <div>
                <div className="font-semibold text-sm">Return Home</div>
                <div className="text-xs text-slate-400 mt-0.5">Main dashboard</div>
              </div>
            </Link>

            <Link
              to="/learn"
              className="group p-4 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col items-center text-center gap-2.5 text-slate-200 hover:text-white"
            >
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                <BookOpen size={20} />
              </div>
              <div>
                <div className="font-semibold text-sm">Interactive Learn</div>
                <div className="text-xs text-slate-400 mt-0.5">COBOL & JCL modules</div>
              </div>
            </Link>

            <Link
              to="/syntax"
              className="group p-4 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col items-center text-center gap-2.5 text-slate-200 hover:text-white"
            >
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                <Code2 size={20} />
              </div>
              <div>
                <div className="font-semibold text-sm">Syntax Sandbox</div>
                <div className="text-xs text-slate-400 mt-0.5">Code validator</div>
              </div>
            </Link>
          </div>

          {/* Go Back Link */}
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors group cursor-pointer"
          >
            <RotateCcw size={15} className="group-hover:-rotate-45 transition-transform" />
            <span>Go back to previous page</span>
          </button>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 w-full border-t border-slate-800/60 bg-[#0a0f12]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-xs sm:text-sm">
          <p>© 2026 Code3270 • IBM 3270 Mainframe Code Studio</p>
          <div className="flex items-center gap-4 mt-3 sm:mt-0">
            <span className="inline-flex items-center gap-1.5 text-emerald-500/80 font-mono text-xs">
              <Sparkles size={13} />
              SYSTEM_ONLINE
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
