import { useState, useRef, useEffect, type ReactNode } from 'react'
import { FileText, Code2, Menu, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sidebar } from './Sidebar'

interface SplitScreenProps {
  sidebar?: ReactNode
  lessonContent: ReactNode
  editorContent: ReactNode
}

export function SplitScreen({ lessonContent, editorContent }: SplitScreenProps) {
  const [activeTab, setActiveTab] = useState<'lesson' | 'editor'>('lesson')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const [editorWidthPercent, setEditorWidthPercent] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!containerRef.current) return
      const containerRect = containerRef.current.getBoundingClientRect()
      
      // The X coordinate relative to the container
      const mouseX = moveEvent.clientX - containerRect.left
      // Calculate right panel width percentage
      const rightWidth = containerRect.width - mouseX
      const percentage = (rightWidth / containerRect.width) * 100
      
      // Clamp between 20% and 80%
      const clamped = Math.max(20, Math.min(80, percentage))
      setEditorWidthPercent(clamped)
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'default'
      // Remove a class from body to prevent text selection during drag
      document.body.classList.remove('select-none')
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.body.style.cursor = 'col-resize'
    document.body.classList.add('select-none')
  }

  // Detect if we are on mobile to ignore the inline width
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#0a0f12] text-slate-200 overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* 1. Desktop Static Sidebar Panel */}
      <div className="shrink-0 h-full z-20 shadow-[4px_0_24px_rgba(0,0,0,0.2)] hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Drawer (Slide-over) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative w-[85%] max-w-[320px] h-full bg-[#0a0f12] shadow-2xl z-10 flex flex-col"
            >
              <Sidebar isMobile onCloseMobile={() => setMobileMenuOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Top App Bar (Only on < md) */}
      <div className="md:hidden h-14 shrink-0 border-b border-slate-800/80 bg-[#0a0f12]/95 backdrop-blur-xl flex items-center justify-between px-3 z-30 sticky top-0">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
          aria-label="Open curriculum menu"
        >
          <Menu size={20} className="text-emerald-400" />
          <span className="text-xs font-mono font-bold text-slate-200">Modules</span>
        </button>

        {/* Mobile Tab Switcher */}
        <div className="flex bg-slate-900/90 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('lesson')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'lesson'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText size={13} />
            <span>Lesson</span>
          </button>
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === 'editor'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 size={13} />
            <span>Editor</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col md:flex-row relative" ref={containerRef}>
        
        {/* 2. Middle Panel: Lesson Content */}
        <div 
          className={`flex-col bg-[#0a0f12] overflow-y-auto relative z-10 ${
            activeTab === 'lesson' ? 'flex flex-1' : 'hidden md:flex'
          }`}
          style={{ width: isMobile ? '100%' : `${100 - editorWidthPercent}%`, flex: isMobile ? '1' : 'none' }}
        >
          <header className="hidden md:flex h-13 shrink-0 border-b border-slate-800/60 items-center px-6 bg-[#0a0f12]/95 backdrop-blur-xl sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-emerald-500/70" />
              <h2 className="text-sm font-semibold text-slate-300 tracking-wide">Tutorial Module</h2>
            </div>
          </header>
          
          <div className="flex-1 p-4 sm:p-8 lg:p-12 pb-24">
            <div className="max-w-3xl mx-auto">
              {lessonContent}

              {/* Mobile quick action to switch to editor */}
              <div className="md:hidden mt-8 pt-6 border-t border-slate-800/80 flex justify-center">
                <button
                  onClick={() => setActiveTab('editor')}
                  className="w-full py-3 px-4 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-950 flex items-center justify-center gap-2 text-sm"
                >
                  <Sparkles size={16} />
                  <span>Open Code Editor for this Activity</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Divider (Desktop only) */}
        <div 
          className="hidden md:flex w-1.5 hover:w-2 -ml-0.5 bg-slate-800/60 items-center justify-center relative cursor-col-resize hover:bg-emerald-500/50 active:bg-emerald-500 transition-all group z-20"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute w-4 h-8 flex flex-col items-center justify-center gap-0.5 bg-slate-800 border border-slate-700 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-0.5 h-1 bg-slate-400 rounded-full" />
            <div className="w-0.5 h-1 bg-slate-400 rounded-full" />
            <div className="w-0.5 h-1 bg-slate-400 rounded-full" />
          </div>
        </div>

        {/* 3. Right Panel: Interactive Editor */}
        <div 
          className={`flex-col bg-[#0d1317] relative z-10 shadow-[-4px_0_24px_rgba(0,0,0,0.2)] ${
            activeTab === 'editor' ? 'flex flex-1 h-[calc(100vh-56px)]' : 'hidden md:flex'
          }`}
          style={{ width: isMobile ? '100%' : `${editorWidthPercent}%`, flex: isMobile ? '1' : 'none' }}
        >
          <header className="hidden md:flex h-13 shrink-0 border-b border-slate-800/60 items-center justify-between px-6 bg-[#0d1317]/95 backdrop-blur-xl sticky top-0 z-10">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1.5 mr-3">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              </div>
              <Code2 size={16} className="text-emerald-400" />
              <h2 className="text-sm font-medium text-slate-300">Interactive Editor</h2>
            </div>
          </header>

          <div className="flex-1 relative w-full h-full overflow-hidden flex flex-col">
            {editorContent}
          </div>
        </div>
      </div>
    </div>
  )
}
