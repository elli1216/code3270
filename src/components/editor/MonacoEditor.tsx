import { Editor, useMonaco } from '@monaco-editor/react'
import { useEffect, useState } from 'react'
import { Download, AlignLeft } from 'lucide-react'
import type { editor } from 'monaco-editor'
import { COBOL_SPECS } from '../../lib/validation/constants'
import { formatCOBOL } from '../../lib/formatter/cobolFormatter'
import { useThemeStore } from '../../store/themeStore'
import { setupMonaco } from '../../lib/editor/monacoSetup'

interface MonacoEditorProps {
  language: 'cobol' | 'jcl' // Or standard languages if we don't have custom highlighters yet
  value: string
  onChange: (value: string | undefined) => void
  readOnly?: boolean
}

export function MonacoEditor({ language, value, onChange, readOnly = false }: MonacoEditorProps) {
  const monaco = useMonaco()

  useEffect(() => {
    if (monaco) {
      setupMonaco(monaco)
    }
  }, [monaco])

  const [cursorPos, setCursorPos] = useState({ line: 1, column: 1 })

  const handleEditorMount = (editorInstance: editor.IStandaloneCodeEditor) => {
    editorInstance.onDidChangeCursorPosition((e) => {
      setCursorPos({ line: e.position.lineNumber, column: e.position.column })
    })
  }

  const handleExport = (ext: string) => {
    const blob = new Blob([value], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `source.${ext}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

    const handleFormat = () => {
      if (language === 'cobol') {
        onChange(formatCOBOL(value))
      }
    }

    const downloadTxtLabel = `Download as text file`
    const downloadLangLabel = `Download as ${language.toUpperCase()} file`

  const isRetroMode = useThemeStore((s) => s.isRetroMode)

  return (
    <div className="w-full h-full absolute inset-0 flex flex-col">
      {/* ... header ... */}
      <div className="h-8 shrink-0 bg-[#1e1e1e] border-b border-[#2d2d2d] flex items-center justify-end overflow-hidden pr-4 gap-3">
        <div className="flex items-center gap-2">
          {language === 'cobol' && !readOnly && (
            <button onClick={handleFormat} className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-500/70 hover:text-emerald-400 hover:bg-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 transition-colors" title="Format COBOL Code">
              <AlignLeft size={12} /> Format
            </button>
          )}
          <button onClick={() => handleExport('txt')} className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-500/70 hover:text-emerald-400 hover:bg-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 transition-colors" title={downloadTxtLabel}>
            <Download size={12} /> .txt
          </button>
          <button onClick={() => handleExport(language === 'cobol' ? 'cob' : 'jcl')} className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-500/70 hover:text-emerald-400 hover:bg-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 transition-colors" title={downloadLangLabel}>
            <Download size={12} /> .{language === 'cobol' ? 'cob' : 'jcl'}
          </button>
        </div>
        <div className="text-xs font-mono text-emerald-500/70 select-none bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Ln {cursorPos.line}, Col {cursorPos.column}
        </div>
      </div>

      <div className="flex-1 relative">
        <Editor
          height="100%"
          defaultLanguage="plaintext"
          language={language}
          theme={isRetroMode ? 'terminal-green' : 'vs-dark'}
          value={value}
          onChange={onChange}
          onMount={handleEditorMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
            lineNumbers: 'on',
            lineNumbersMinChars: 3,
            scrollBeyondLastLine: false,
            readOnly,
            wordWrap: 'off',
            padding: { top: 16, bottom: 16 },
            rulers: [
              COBOL_SPECS.COLUMNS.AREA_A_START,
              COBOL_SPECS.COLUMNS.AREA_B_START,
              COBOL_SPECS.COLUMNS.MAX_LINE_LENGTH
            ] // Vertical rulers for Area A, Area B, and max width
          }}
          loading={<div className="flex items-center justify-center h-full text-slate-500">Loading Editor...</div>}
        />
      </div>
    </div>
  )
}
