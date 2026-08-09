import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { MonacoEditor } from '../components/editor/MonacoEditor'
import { ValidationFeedback } from '../components/editor/ValidationFeedback'
import { Play, Loader2, Code2, Server } from 'lucide-react'
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

    try {
      if (activeLang === 'jcl') {
        const diags = lintJCL(code)
        setValidationResult({
          success: diags.length === 0,
          diagnostics: diags,
          output: diags.length === 0 ? "JCL syntax is valid." : undefined
        })
      } else {
        const diags = lintCOBOL(code)
        setValidationResult({
          success: diags.length === 0,
          diagnostics: diags,
          output: diags.length === 0 ? "COBOL syntax is valid." : undefined
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
    <div className="flex-1 flex flex-col h-screen bg-slate-950 overflow-hidden">
      {/* Header Toolbar */}
      <div className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
            <button
              onClick={() => { setActiveLang('cobol'); setValidationResult(null) }}
              className={`px-4 py-1.5 text-sm font-medium rounded-md flex items-center gap-2 transition-colors ${activeLang === 'cobol' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Code2 size={16} /> COBOL
            </button>
            <button
              onClick={() => { setActiveLang('jcl'); setValidationResult(null) }}
              className={`px-4 py-1.5 text-sm font-medium rounded-md flex items-center gap-2 transition-colors ${activeLang === 'jcl' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Server size={16} /> JCL
            </button>
          </div>

          <select
            onChange={handleSampleChange}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
            defaultValue="cobol-hello"
          >
            <option value="custom">-- Custom Code --</option>
            <option value="cobol-hello">Sample: COBOL Hello World</option>
            <option value="cobol-math">Sample: COBOL Basic Math</option>
            <option value="jcl-basic">Sample: JCL Basic Job</option>
          </select>
        </div>

        <button
          onClick={handleRunCode}
          disabled={isPending}
          className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white font-medium rounded-lg shadow-lg shadow-emerald-900/20 transition-all flex items-center gap-2"
        >
          {isPending ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} fill="currentColor" />}
          Lint Syntax
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Editor */}
        <div className="flex-1 border-r border-slate-800 relative">
          <MonacoEditor
            language={activeLang}
            value={code}
            onChange={(val) => setCode(val || '')}
          />
        </div>

        {/* Output Panel */}
        <div className="w-full md:w-1/3 min-w-[300px] bg-[#0a0a0a] overflow-y-auto p-4 flex flex-col gap-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Execution Output</div>

          {!validationResult && !isPending && (
            <div className="flex-1 flex items-center justify-center text-slate-600 text-sm text-center border-2 border-dashed border-slate-800 rounded-xl p-6">
              Write or select a program, then hit Run to see the output here.
            </div>
          )}

          {isPending && (
            <div className="flex-1 flex flex-col items-center justify-center text-emerald-500 gap-3">
              <Loader2 size={24} className="animate-spin" />
              <span className="text-sm font-medium animate-pulse">Running Syntax Check...</span>
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
  )
}
