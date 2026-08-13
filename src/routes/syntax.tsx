import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { MonacoEditor } from '../components/editor/MonacoEditor'
import { ValidationFeedback } from '../components/editor/ValidationFeedback'
import { Play, Loader2, Code2, Server, Terminal, ChevronLeft, FolderKanban, CheckCircle2, AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { lintCOBOL } from '../lib/validation/cobolLinter'
import { lintJCL } from '../lib/validation/jclLinter'
import type { ValidationResult } from '../lib/validation/schemas'
import { SAMPLE_PROGRAMS } from '../lib/constants'
import { SyntaxSidebar } from '../components/layout/SyntaxSidebar'
import { useWorkspaceStore, type SavedFile } from '../store/workspaceStore'
import { motion, AnimatePresence } from 'framer-motion'

export const Route = createFileRoute('/syntax')({
  component: SyntaxChecker,
})

const MAX_FILES = 15

function SyntaxChecker() {
  const [activeLang, setActiveLang] = useState<'cobol' | 'jcl'>('cobol')
  const [code, setCode] = useState<string>(SAMPLE_PROGRAMS['cobol-hello'].code)

  const [isPending, setIsPending] = useState(false)
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)
  
  const [activeMobileTab, setActiveMobileTab] = useState<'editor' | 'output'>('editor')
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)

  // Zustand selective state subscriptions
  const savedFiles = useWorkspaceStore((state) => state.savedFiles)
  const activeFileId = useWorkspaceStore((state) => state.activeFileId)
  const setActiveFileId = useWorkspaceStore((state) => state.setActiveFileId)
  const addFile = useWorkspaceStore((state) => state.addFile)
  const updateFileCode = useWorkspaceStore((state) => state.updateFileCode)
  const updateFileLang = useWorkspaceStore((state) => state.updateFileLang)
  const deleteFile = useWorkspaceStore((state) => state.deleteFile)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isNewFileDialogOpen, setIsNewFileDialogOpen] = useState(false)
  const [newFileName, setNewFileName] = useState('')

  // Debounce timer ref to prevent synchronous localStorage writes on every keystroke
  const debounceSaveTimerRef = useRef<NodeJS.Timeout | null>(null)
  const latestCodeRef = useRef<string>(code)
  latestCodeRef.current = code

  // Sync editor with active file when workspace restores or selection changes
  useEffect(() => {
    if (activeFileId) {
      const activeFile = savedFiles.find(f => f.id === activeFileId)
      if (activeFile) {
        setCode(activeFile.code)
        setActiveLang(activeFile.lang)
      }
    }
  }, [activeFileId])

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceSaveTimerRef.current) {
        clearTimeout(debounceSaveTimerRef.current)
      }
    }
  }, [])

  const flushPendingSave = useCallback(() => {
    if (debounceSaveTimerRef.current) {
      clearTimeout(debounceSaveTimerRef.current)
      debounceSaveTimerRef.current = null
    }
    if (activeFileId) {
      updateFileCode(activeFileId, latestCodeRef.current)
    }
  }, [activeFileId, updateFileCode])

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode)
    latestCodeRef.current = newCode

    if (activeFileId) {
      // Debounce saving file content to Zustand / localStorage (300ms)
      if (debounceSaveTimerRef.current) {
        clearTimeout(debounceSaveTimerRef.current)
      }
      debounceSaveTimerRef.current = setTimeout(() => {
        updateFileCode(activeFileId, newCode)
        debounceSaveTimerRef.current = null
      }, 300)
    }
  }, [activeFileId, updateFileCode])

  const handleLangChange = useCallback((lang: 'cobol' | 'jcl') => {
    setActiveLang(lang)
    setValidationResult(null)
    if (activeFileId) {
      updateFileLang(activeFileId, lang)
    }
  }, [activeFileId, updateFileLang])

  const handleOpenNewFileDialog = useCallback(() => {
    if (savedFiles.length >= MAX_FILES) {
      alert(`Maximum of ${MAX_FILES} files reached. Please delete some files first.`)
      return
    }
    setNewFileName('')
    setIsNewFileDialogOpen(true)
  }, [savedFiles.length])

  const submitNewFile = useCallback(() => {
    if (!newFileName || newFileName.trim() === '') return
    
    flushPendingSave()
    addFile(newFileName.trim(), activeLang, code || '')
    setValidationResult(null)
    setIsNewFileDialogOpen(false)
    setIsMobileDrawerOpen(false)
  }, [newFileName, flushPendingSave, addFile, activeLang, code])

  const handleImportFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (savedFiles.length >= MAX_FILES) {
      alert(`Maximum of ${MAX_FILES} files reached. Please delete some files first.`)
      return
    }

    flushPendingSave()

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      let lang: 'cobol' | 'jcl' = 'cobol'
      const name = file.name
      
      if (name.toLowerCase().endsWith('.jcl')) {
        lang = 'jcl'
      } else if (name.toLowerCase().endsWith('.cbl') || name.toLowerCase().endsWith('.cob')) {
        lang = 'cobol'
      } else {
        if (content.split('\n')[0]?.startsWith('//')) {
          lang = 'jcl'
        }
      }

      addFile(name, lang, content)
      setCode(content)
      setActiveLang(lang)
      setValidationResult(null)
      setIsMobileDrawerOpen(false)
    }
    reader.readAsText(file)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [savedFiles.length, flushPendingSave, addFile])

  const handleDeleteFile = useCallback((id: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      deleteFile(id)
      if (activeFileId === id) {
        setCode('')
        setValidationResult(null)
      }
    }
  }, [deleteFile, activeFileId])

  const handleSelectFile = useCallback((file: SavedFile) => {
    flushPendingSave()
    setActiveFileId(file.id)
    setCode(file.code)
    setActiveLang(file.lang)
    setValidationResult(null)
    setIsMobileDrawerOpen(false)
  }, [flushPendingSave, setActiveFileId])

  const handleSampleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    flushPendingSave()
    const val = e.target.value
    setActiveFileId(null)
    if (val === 'custom') {
      setCode('')
      setValidationResult(null)
      return
    }
    const sample = SAMPLE_PROGRAMS[val as keyof typeof SAMPLE_PROGRAMS]
    setActiveLang(sample.lang as 'cobol' | 'jcl')
    setCode(sample.code)
    setValidationResult(null)
  }, [flushPendingSave, setActiveFileId])

  const handleRunCode = useCallback(async () => {
    flushPendingSave()
    setIsPending(true)
    setValidationResult(null)

    // Instant execution with a microtask to allow UI state to update
    await new Promise(r => setTimeout(r, 100))

    try {
      if (activeLang === 'jcl') {
        const diags = lintJCL(code)
        setValidationResult({
          success: diags.length === 0,
          diagnostics: diags,
          output: diags.length === 0 ? "JOB SUBMITTED SUCCESSFULLY.\nRC = 0000\nIEF404I IEBGENER - ENDED - TIME=14.22.34" : undefined
        })
      } else {
        const diags = lintCOBOL(code)
        setValidationResult({
          success: diags.length === 0,
          diagnostics: diags,
          output: diags.length === 0 ? "COMPILATION SUCCESSFUL. 0 WARNINGS, 0 ERRORS." : undefined
        })
      }
      if (window.innerWidth < 768) {
        setActiveMobileTab('output')
      }
    } catch (err) {
      setValidationResult({
        success: false,
        diagnostics: [{ line: 1, message: "Execution engine error.", severity: "error" }],
        output: ""
      })
      if (window.innerWidth < 768) {
        setActiveMobileTab('output')
      }
    } finally {
      setIsPending(false)
    }
  }, [flushPendingSave, activeLang, code])

  const errorCount = useMemo(() => validationResult?.diagnostics.filter(d => d.severity === 'error').length || 0, [validationResult])
  const warningCount = useMemo(() => validationResult?.diagnostics.filter(d => d.severity === 'warning').length || 0, [validationResult])

  return (
    <div className="flex-1 flex flex-col h-screen bg-[#0a0f12] overflow-hidden font-sans">
      {/* Mobile Drawer (Slide-over) */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileDrawerOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative w-[85%] max-w-[320px] h-full bg-[#0a0f12] shadow-2xl z-10 flex flex-col"
            >
              <SyntaxSidebar
                savedFiles={savedFiles}
                activeFileId={activeFileId}
                maxFiles={MAX_FILES}
                onNewFile={handleOpenNewFileDialog}
                onImportClick={() => fileInputRef.current?.click()}
                onDeleteFile={handleDeleteFile}
                onSelectFile={handleSelectFile}
                isMobile
                onCloseMobile={() => setIsMobileDrawerOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header Toolbar */}
      <div className="h-14 sm:h-[60px] border-b border-slate-800/60 bg-[#0a0f12]/95 backdrop-blur-xl flex items-center justify-between px-3 sm:px-6 shrink-0 relative z-20 gap-2">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-1">
          <Link 
            to="/" 
            className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors border border-slate-700/50 shrink-0"
            title="Back to Home"
          >
            <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
          </Link>

          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setIsMobileDrawerOpen(true)}
            className="md:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700/50 shrink-0"
            title="Workspace Files"
          >
            <FolderKanban size={14} className="text-emerald-400" />
            <span>Files</span>
            {savedFiles.length > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 text-[10px] rounded-full font-mono">
                {savedFiles.length}
              </span>
            )}
          </button>
          
          {/* Language Selector */}
          <div className="flex bg-[#0d1317] rounded-lg p-0.5 sm:p-1 border border-slate-800/60 shadow-inner shrink-0">
            <button
              onClick={() => handleLangChange('cobol')}
              className={`px-2.5 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-md flex items-center gap-1.5 transition-all ${
                activeLang === 'cobol' ? 'bg-slate-800 shadow text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 size={14} /> <span>COBOL</span>
            </button>
            <button
              onClick={() => handleLangChange('jcl')}
              className={`px-2.5 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-md flex items-center gap-1.5 transition-all ${
                activeLang === 'jcl' ? 'bg-slate-800 shadow text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Server size={14} /> <span>JCL</span>
            </button>
          </div>

          <div className="h-5 w-px bg-slate-800 hidden md:block shrink-0" />

          {/* Sample Select */}
          <select
            onChange={handleSampleChange}
            className="bg-[#0d1317] border border-slate-800 text-slate-300 text-xs sm:text-sm rounded-lg px-2.5 sm:px-4 py-1.5 sm:py-2 outline-none focus:border-emerald-500/50 hover:border-slate-700 transition-colors hidden sm:block appearance-none cursor-pointer pr-8 sm:pr-10 shrink-0"
            defaultValue="cobol-hello"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.6rem center' }}
          >
            <option value="custom">-- Custom Code --</option>
            <option value="cobol-hello">Sample: COBOL Hello World</option>
            <option value="cobol-math">Sample: COBOL Basic Math</option>
            <option value="jcl-basic">Sample: JCL Basic Job</option>
          </select>
        </div>

        {/* Action Button */}
        <button
          onClick={handleRunCode}
          disabled={isPending}
          className="group px-3 sm:px-5 py-1.5 sm:py-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 disabled:border-slate-700 disabled:cursor-not-allowed text-slate-950 font-bold text-xs sm:text-sm rounded-lg transition-all flex items-center gap-1.5 sm:gap-2 border border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] shrink-0"
        >
          {isPending ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Play size={14} fill="currentColor" className="group-hover:scale-110 transition-transform" />
          )}
          <span>LINT</span>
          <span className="hidden sm:inline">SYNTAX</span>
        </button>
      </div>

      {/* Mobile Tab Switcher (< md) */}
      <div className="md:hidden h-11 shrink-0 border-b border-slate-800/80 bg-[#0a0f12] flex items-center justify-between px-3 z-10">
        <div className="flex bg-slate-900/90 p-1 rounded-lg border border-slate-800 w-full">
          <button
            onClick={() => setActiveMobileTab('editor')}
            className={`flex-1 py-1 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1.5 ${
              activeMobileTab === 'editor'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 size={13} />
            <span>Editor</span>
          </button>
          <button
            onClick={() => setActiveMobileTab('output')}
            className={`flex-1 py-1 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1.5 ${
              activeMobileTab === 'output'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal size={13} />
            <span>Output</span>
            {validationResult && (
              <span className={`w-2 h-2 rounded-full ${validationResult.success ? 'bg-emerald-400' : 'bg-red-400'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-row overflow-hidden relative z-10">
        {/* Desktop Static Sidebar */}
        <SyntaxSidebar
          savedFiles={savedFiles}
          activeFileId={activeFileId}
          maxFiles={MAX_FILES}
          onNewFile={handleOpenNewFileDialog}
          onImportClick={() => fileInputRef.current?.click()}
          onDeleteFile={handleDeleteFile}
          onSelectFile={handleSelectFile}
        />
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImportFile} 
          className="hidden" 
          accept=".cbl,.cob,.jcl,.txt"
        />

        {/* Editor + Output Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          {/* Editor Panel */}
          <div 
            className={`border-r border-slate-800/60 relative bg-[#0d1317] ${
              activeMobileTab === 'editor' ? 'flex-1 flex' : 'hidden md:flex md:flex-[1.5]'
            }`}
          >
            <MonacoEditor
              language={activeLang}
              value={code}
              onChange={(val) => handleCodeChange(val || '')}
            />
          </div>

          {/* Output Panel */}
          <div 
            className={`bg-[#080c0f] overflow-y-auto flex-col relative shadow-[-10px_0_30px_rgba(0,0,0,0.3)] ${
              activeMobileTab === 'output' ? 'flex-1 flex' : 'hidden md:flex md:flex-1 md:min-w-[340px] lg:min-w-[400px]'
            }`}
          >
            <div className="h-9 sm:h-10 border-b border-slate-800/60 bg-[#0a0f12]/90 sticky top-0 flex items-center justify-between px-4 sm:px-5 shrink-0 z-10">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-emerald-500/70" />
                <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Compiler Diagnostics
                </div>
              </div>

              {validationResult && (
                <div className="flex items-center gap-2">
                  {validationResult.success ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <CheckCircle2 size={11} /> CLEAN (RC=0)
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                      <AlertCircle size={11} /> {errorCount} ERR, {warningCount} WARN
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex-1 p-4 sm:p-6 relative">
              {!validationResult && !isPending && (
                <div className="flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-800/50 rounded-2xl p-6 bg-slate-900/20 my-auto min-h-[180px]">
                  <Terminal size={28} className="mb-3 opacity-50 text-emerald-500/60" />
                  <p className="text-xs sm:text-sm text-center max-w-[250px] leading-relaxed">
                    Sandbox ready. Write code and tap <strong className="text-emerald-400 font-medium">LINT</strong> to analyze.
                  </p>
                </div>
              )}

              {isPending && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-emerald-500 gap-3 bg-[#080c0f]/80 backdrop-blur-sm z-20">
                  <Loader2 size={28} className="animate-spin" />
                  <span className="text-xs sm:text-sm font-mono tracking-widest animate-pulse">ANALYZING CODE...</span>
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

      {/* New File Dialog */}
      <Dialog open={isNewFileDialogOpen} onOpenChange={setIsNewFileDialogOpen}>
        <DialogContent className="bg-[#0a0f12] border-slate-800 text-slate-200 w-[90%] max-w-[425px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription className="text-slate-400 text-xs sm:text-sm">
              Enter a name for your new file (e.g., TEST01.CBL).
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input 
              value={newFileName} 
              onChange={(e) => setNewFileName(e.target.value)} 
              placeholder="Filename..."
              className="bg-[#0d1317] border-slate-700 text-slate-200 placeholder:text-slate-600 focus-visible:ring-emerald-500"
              onKeyDown={(e) => e.key === 'Enter' && submitNewFile()}
              autoFocus
            />
          </div>
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setIsNewFileDialogOpen(false)} className="text-slate-400 hover:text-slate-300 hover:bg-slate-800 text-xs sm:text-sm">
              Cancel
            </Button>
            <Button onClick={submitNewFile} className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm">
              Create File
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
