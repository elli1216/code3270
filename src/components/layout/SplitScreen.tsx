import type { ReactNode } from 'react'

interface SplitScreenProps {
  sidebar: ReactNode
  lessonContent: ReactNode
  editorContent: ReactNode
}

export function SplitScreen({ sidebar, lessonContent, editorContent }: SplitScreenProps) {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-slate-950 text-slate-200 overflow-hidden font-sans">
      {/* 1. Sidebar Panel */}
      <div className="shrink-0 h-full">
        {sidebar}
      </div>

      {/* 2. Middle Panel: Lesson Content */}
      <div className="flex-1 flex flex-col border-r border-slate-800 bg-slate-950 overflow-y-auto">
        <header className="h-12 shrink-0 border-b border-slate-800 flex items-center px-4 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
          <h2 className="text-sm font-semibold text-slate-300">Tutorial Module</h2>
        </header>
        <div className="flex-1 p-6">
          {lessonContent}
        </div>
      </div>

      {/* 3. Right Panel: Interactive Editor (Try it Yourself) */}
      <div className="flex-1 flex flex-col md:min-w-[400px] bg-[#1e1e1e]">
        <header className="h-12 shrink-0 border-b border-[#2d2d2d] flex items-center justify-between px-4 bg-[#252526] sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-600" />
            <h2 className="text-sm font-medium text-slate-300">Try it Yourself</h2>
          </div>
          {/* Theme Toggle could go here later */}
        </header>
        <div className="flex-1 relative">
          {editorContent}
        </div>
      </div>
    </div>
  )
}
