import type { ReactNode } from 'react'
import { FileText, Code2, GripVertical } from 'lucide-react'

interface SplitScreenProps {
  sidebar: ReactNode
  lessonContent: ReactNode
  editorContent: ReactNode
}

export function SplitScreen({ sidebar, lessonContent, editorContent }: SplitScreenProps) {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#0a0f12] text-slate-200 overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* 1. Sidebar Panel */}
      <div className="shrink-0 h-full z-20 shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
        {sidebar}
      </div>

      {/* 2. Middle Panel: Lesson Content */}
      <div className="flex-1 flex flex-col bg-[#0a0f12] overflow-y-auto relative z-10">
        <header className="h-[52px] shrink-0 border-b border-slate-800/60 flex items-center px-6 bg-[#0a0f12]/95 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-emerald-500/70" />
            <h2 className="text-sm font-semibold text-slate-300 tracking-wide">Tutorial Module</h2>
          </div>
        </header>
        <div className="flex-1 p-8 lg:p-12 pb-24">
          <div className="max-w-3xl mx-auto">
            {lessonContent}
          </div>
        </div>
      </div>

      {/* Visual Divider / Resizer Indicator */}
      <div className="hidden md:flex w-1 bg-slate-800/60 items-center justify-center relative cursor-col-resize hover:bg-emerald-500/50 transition-colors group z-20">
        <div className="absolute w-4 h-8 flex items-center justify-center bg-slate-800 border border-slate-700 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical size={12} className="text-slate-400" />
        </div>
      </div>

      {/* 3. Right Panel: Interactive Editor (Try it Yourself) */}
      <div className="flex-[1.2] flex flex-col md:min-w-[500px] bg-[#0d1317] relative z-10 shadow-[-4px_0_24px_rgba(0,0,0,0.2)]">
        <header className="h-[52px] shrink-0 border-b border-slate-800/60 flex items-center justify-between px-6 bg-[#0d1317]/95 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1.5 mr-3">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            </div>
            <Code2 size={16} className="text-emerald-400" />
            <h2 className="text-sm font-medium text-slate-300">Interactive Editor</h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Future Actions / Badges */}
          </div>
        </header>
        <div className="flex-1 relative w-full h-full overflow-hidden flex flex-col">
          {editorContent}
        </div>
      </div>
    </div>
  )
}
