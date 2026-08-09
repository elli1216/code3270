import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Terminal, Server, Database, Code, ShieldCheck, Github, ChevronRight } from 'lucide-react'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30 overflow-hidden relative flex flex-col">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[100px] mix-blend-screen" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      </div>

      {/* Header */}
      <header className="relative z-20 w-full border-b border-white/5 bg-slate-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xl tracking-tight">
            <Terminal size={24} />
            <span>Code3270</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/learn"
              className="px-4 py-2 text-sm font-semibold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 border border-emerald-500/50 hover:border-emerald-500 rounded-md transition-all"
            >
              Start Coding
            </Link>
            <Link
              to="/syntax"
              className="px-4 py-2 text-sm font-semibold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 border border-emerald-500/50 hover:border-emerald-500 rounded-md transition-all"
            >
              Syntax Checker
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-20 lg:py-28 flex flex-col items-center flex-1">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-8 font-mono text-sm shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <Terminal size={16} />
            <span>INITIALIZING SYS1.PROCLIB...</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white to-emerald-200">
            Master the Engines of <br /> Global Commerce
          </h1>

          <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            Code3270 is a frictionless, web-based platform to learn, write, and validate
            <span className="text-emerald-300 font-semibold mx-1">COBOL</span> and
            <span className="text-emerald-300 font-semibold mx-1">JCL</span>.
            No mainframes to configure. Just code.
          </p>

          <Link
            to="/learn"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-lg font-bold text-lg transition-all shadow-[0_0_30px_rgba(52,211,153,0.2)] hover:shadow-[0_0_40px_rgba(52,211,153,0.4)] overflow-hidden"
          >
            <span className="relative z-10">Start Learning Now</span>
            <ChevronRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </Link>
        </motion.div>

        {/* The History & Relevance Section */}
        <div id="features" className="grid md:grid-cols-2 gap-12 w-full mt-4">

          {/* COBOL History Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/30 transition-colors"
          >
            <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 mb-6 text-emerald-400">
                <Code size={24} />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-slate-100">The Legacy of COBOL</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Created in 1959 by the CODASYL committee (heavily influenced by Grace Hopper),
                <strong> COBOL (Common Business-Oriented Language)</strong> was designed to be readable like English.
              </p>
              <ul className="space-y-3 text-slate-400 mt-6">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Powers <strong>80%</strong> of in-person financial transactions globally.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Processes over <strong>$3 trillion</strong> in commerce every single day.</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* JCL History Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/30 transition-colors"
          >
            <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 mb-6 text-emerald-400">
                <Server size={24} />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-slate-100">The Power of JCL</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Introduced in 1964 for IBM's OS/360, <strong>JCL (Job Control Language)</strong> is the scripting language that tells the mainframe OS exactly how to run programs and manage resources.
              </p>
              <ul className="space-y-3 text-slate-400 mt-6">
                <li className="flex items-start gap-3">
                  <Database className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>The backbone of enterprise batch processing and jobs.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Database className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Strict positional syntax requiring logic and precision.</span>
                </li>
              </ul>
            </div>
          </motion.div>

        </div>

        {/* Detailed History Timeline */}
        <div className="mt-24 w-full max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">A Legacy of Computing</h2>
            <p className="text-slate-400">The evolution of the systems that built the modern world.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* COBOL Timeline */}
            <div className="relative border-l border-slate-800 ml-3 lg:ml-0 pl-8 lg:pl-10">
              <div className="absolute top-0 left-[-16px] bg-slate-900 border border-slate-700 p-2 rounded-lg text-emerald-400">
                <Code size={16} />
              </div>
              <h3 className="text-2xl font-bold text-emerald-400 mb-8 pt-1">COBOL History</h3>

              <div className="space-y-8">
                <div className="relative">
                  <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-slate-800 border-2 border-emerald-500 rounded-full" />
                  <h4 className="text-slate-200 font-bold mb-1">Origins & Inception (1950s)</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">The US Department of Defense convened a conference in May 1958 to discuss creating a common business language.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-slate-800 border-2 border-emerald-500 rounded-full" />
                  <h4 className="text-slate-200 font-bold mb-1">Creation & Specs (1959)</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Developed by CODASYL, partly derived from FLOW-MATIC by Dr. Grace Hopper. First specifications released in December 1959.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-slate-800 border-2 border-emerald-500 rounded-full" />
                  <h4 className="text-slate-200 font-bold mb-1">First Release (1960–1965)</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">COBOL-60 was published. The first compiler arrived for mainframes in 1962, and COBOL-65 introduced mass storage and table handling.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-slate-800 border-2 border-emerald-500 rounded-full" />
                  <h4 className="text-slate-200 font-bold mb-1">Standardization (1968–1985)</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Standardized as ANSI-68. Revisions followed with COBOL-74 and COBOL-85.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-slate-800 border-2 border-emerald-500 rounded-full" />
                  <h4 className="text-slate-200 font-bold mb-1">Modernization (1990s–Present)</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">COBOL 2002 added object-orientation. Recent updates (2014-2023) introduced IEEE 754 data types, async messaging, and transaction processing features.</p>
                </div>
              </div>
            </div>

            {/* JCL Timeline */}
            <div className="relative border-l border-slate-800 ml-3 lg:ml-0 pl-8 lg:pl-10 mt-12 lg:mt-0">
              <div className="absolute top-0 left-[-16px] bg-slate-900 border border-slate-700 p-2 rounded-lg text-emerald-400">
                <Server size={16} />
              </div>
              <h3 className="text-2xl font-bold text-emerald-400 mb-8 pt-1">JCL & OS/360 Timeline</h3>

              <div className="space-y-8">
                <div className="relative">
                  <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-slate-800 border-2 border-emerald-500 rounded-full" />
                  <h4 className="text-slate-200 font-bold mb-1">OS/360 Announcement (1964)</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Announced by IBM as a batch processing operating system to operate its 360 family of mainframe computer systems.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-slate-800 border-2 border-emerald-500 rounded-full" />
                  <h4 className="text-slate-200 font-bold mb-1">Initial Release (1966)</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Released with ~1 million lines of code. It was one of the earliest operating systems to require a direct access storage device.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-slate-800 border-2 border-emerald-500 rounded-full" />
                  <h4 className="text-slate-200 font-bold mb-1">OS Variants</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Evolved through PCP (single job), MFT (fixed memory tasks for mid-range), and MVT (variable tasks for top-end mainframes).</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-slate-800 border-2 border-emerald-500 rounded-full" />
                  <h4 className="text-slate-200 font-bold mb-1">Virtual Memory Evolution (1970s)</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">OS/MFT became OS/VS1 (integrating JES1). OS/MVT became OS/VS2, bringing virtual memory capabilities to the mainframe.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-slate-800 border-2 border-emerald-500 rounded-full" />
                  <h4 className="text-slate-200 font-bold mb-1">Modern Successors (1990s–2000s)</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">OS/VS2 evolved into OS/MVS. Succeeded by System/390 in 1990 and z/OS in 2000, maintaining application-level compatibility with original OS/360 code.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 w-full border-t border-white/5 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500 font-mono text-sm">
            <Terminal size={16} />
            <span>Code3270 © {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms</a>
            <a href="https://github.com/yourusername/Code3270" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
              Contribute on GitHub
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
