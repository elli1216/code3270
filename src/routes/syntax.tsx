import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { MonacoEditor } from '../components/editor/MonacoEditor'
import { ValidationFeedback } from '../components/editor/ValidationFeedback'
import { Play, Loader2, Code2, Server, Terminal, ChevronLeft } from 'lucide-react'
import { lintCOBOL } from '../lib/validation/cobolLinter'
import { lintJCL } from '../lib/validation/jclLinter'
import type { ValidationResult } from '../lib/validation/schemas'
import { SAMPLE_PROGRAMS } from '../lib/constants'

export const Route = createFileRoute('/syntax')({
  component: SyntaxChecker,
})

function SyntaxChecker() {
  const [activeLang, setActiveLang] = useState<'cobol' | 'jcl'>('cobol')
  const [code, setCode] = useState<string>(SAMPLE_PROGRAMS['cobol-hello'].code)

  const [isPending, setIsPending] = useState(false)
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)

  const handleSampleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    if (val === 'custom') return
    const sample = SAMPLE_PROGRAMS[val as keyof typeof SAMPLE_PROGRAMS]
    setActiveLang(sample.lang as 'cobol' | 'jcl')
    setCode(sample.code)
    setValidationResult(null)
  }

  const handleRunCode = async () => {
    setIsPending(true)
    setValidationResult(null)

    // Simulate slight network delay for effect
    await new Promise(r => setTimeout(r, 600))

    try {
      if (activeLang === 'jcl') {
        const diags = lintJCL(code)
        setValidationResult({
          success: diags.length === 0,
          diagnostics: diags,
          output: diags.length === 0 ? "JOB SUBMITTED SUCCESSFULLY.nRC = 0000nIEF404I IEBGENER - ENDED - TIME=14.22.34" : undefined
        })
      } else {
        const diags = lintCOBOL(code)
        setValidationResult({
          success: diags.length === 0,
          diagnostics: diags,
          output: diags.length === 0 ? "COMPILATION SUCCESSFUL.n0 WARNINGS, 0 ERRORS." : undefined
        })
      }
    } catch (err) {
      setValidationResult({
        success: false,
        diagnostics: [{ line: 1, message: "Execution engine error.", severity: "error" }],
        output: ""
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col h-screen bg-[#0a0f12] overflow-hidden font-sans">
      {/* Premium Header Toolbar */}
      <div className="h-[60px] border-b border-slate-800/60 bg-[#0a0f12]/95 backdrop-blur-xl flex items-center justify-between px-6 shrink-0 relative z-20">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors border border-slate-700/50 hover:border-slate-600">
            <ChevronLeft size={18} />
          </Link>
          
          <div className="flex bg-[#0d1317] rounded-lg p-1 border border-slate-800/60 shadow-inner">
            <button
              onClick={() => { setActiveLang('cobol'); setValidationResult(null) }}
              className={`px-5 py-1.5 text-sm font-medium rounded-md flex items-center gap-2 transition-all ${activeLang === 'cobol' ? 'bg-slate-800 shadow text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Code2 size={16} /> COBOL
            </button>
            <button
              onClick={() => { setActiveLang('jcl'); setValidationResult(null) }}
              className={`px-5 py-1.5 text-sm font-medium rounded-md flex items-center gap-2 transition-all ${activeLang === 'jcl' ? 'bg-slate-800 shadow text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Server size={16} /> JCL
            </button>
          </div>

          <div className="h-6 w-px bg-slate-800 hidden md:block" />

          <select
            onChange={handleSampleChange}
            className="bg-[#0d1317] border border-slate-800 text-slate-300 text-sm rounded-lg px-4 py-2 outline-none focus:border-emerald-500/50 hover:border-slate-700 transition-colors hidden md:block appearance-none cursor-pointer pr-10 relative"
            defaultValue="cobol-hello"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center' }}
          >
            <option value="custom">-- Custom Sandbox --</option>
            <option value="cobol-hello">Sample: COBOL Hello World</option>
            <option value="cobol-math">Sample: COBOL Basic Math</option>
            <option value="jcl-basic">Sample: JCL Basic Job</option>
          </select>
        </div>

        <button
          onClick={handleRunCode}
          disabled={isPending}
          className="group px-6 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 disabled:border-slate-700 disabled:cursor-not-allowed text-slate-950 font-bold rounded-lg transition-all flex items-center gap-2 border border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
        >
          {isPending ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} fill="currentColor" className="group-hover:scale-110 transition-transform" />}
          LINT SYNTAX
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative z-10">
        {/* Editor */}
        <div className="flex-[1.5] border-r border-slate-800/60 relative bg-[#0d1317]">
          <MonacoEditor
            language={activeLang}
            value={code}
            onChange={(val) => setCode(val || '')}
          />
        </div>

        {/* Output Panel */}
        <div className="w-full md:flex-1 min-w-[400px] bg-[#080c0f] overflow-y-auto flex flex-col relative shadow-[-10px_0_30px_rgba(0,0,0,0.3)]">
          <div className="h-10 border-b border-slate-800/60 bg-[#0a0f12]/90 sticky top-0 flex items-center px-5 gap-2 shrink-0 z-10">
             <Terminal size={14} className="text-emerald-500/70" />
             <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Compiler Diagnostics</div>
          </div>
          
          <div className="flex-1 p-6 relative">
            {!validationResult && !isPending && (
              <div className="absolute inset-4 flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-800/50 rounded-2xl p-6 bg-slate-900/20">
                <Terminal size={32} className="mb-4 opacity-50" />
                <p className="text-sm text-center max-w-[250px] leading-relaxed">
                  Sandbox ready. Write code and hit <strong className="text-slate-300 font-medium">Lint Syntax</strong> to analyze.
                </p>
              </div>
            )}

            {isPending && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-emerald-500 gap-4 bg-[#080c0f]/80 backdrop-blur-sm z-20">
                <Loader2 size={32} className="animate-spin" />
                <span className="text-sm font-mono tracking-widest animate-pulse">ANALYZING CODE...</span>
              </div>
            )}

            {validationResult && !isPending && (
              <ValidationFeedback
                diagnostics={validationResult.diagnostics}
                output={validationResult.output}
                success={validationResult.success}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
