import { memo } from 'react'
import { Code2, Server, FilePlus, Upload, Trash2, X, FolderKanban } from 'lucide-react'
import type { SavedFile } from '../../store/workspaceStore'

interface SyntaxSidebarProps {
  savedFiles: SavedFile[];
  activeFileId: string | null;
  maxFiles: number;
  onNewFile: () => void;
  onImportClick: () => void;
  onDeleteFile: (id: string) => void;
  onSelectFile: (file: SavedFile) => void;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export const SyntaxSidebar = memo(function SyntaxSidebar({
  savedFiles,
  activeFileId,
  maxFiles,
  onNewFile,
  onImportClick,
  onDeleteFile,
  onSelectFile,
  isMobile = false,
  onCloseMobile
}: SyntaxSidebarProps) {
  return (
    <div className={`flex flex-col bg-[#0a0f12] border-r border-slate-800/60 shadow-[4px_0_24px_rgba(0,0,0,0.2)] z-20 ${isMobile ? 'w-full h-full' : 'hidden md:flex w-64'}`}>
      <div className="h-[56px] sm:h-[60px] flex items-center justify-between px-4 sm:px-5 border-b border-slate-800/60 shrink-0 bg-[#0d1317]">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <FolderKanban size={15} className="text-emerald-400" />
          Workspace Files
        </span>
        <div className="flex items-center gap-1">
          <button 
            onClick={onNewFile}
            className="w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all"
            title="New File"
          >
            <FilePlus size={15} />
          </button>
          <button 
            onClick={onImportClick}
            className="w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all"
            title="Import File"
          >
            <Upload size={15} />
          </button>
          {isMobile && onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-all ml-1"
              title="Close Drawer"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-700/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-600/50">
        {savedFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center px-4 mt-4">
            <div className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center mb-3">
              <FilePlus size={16} className="text-slate-500" />
            </div>
            <span className="text-xs text-slate-400 leading-relaxed">
              Workspace is empty.<br/>Create or import a file.
            </span>
          </div>
        ) : (
          savedFiles.map(f => (
            <div 
              key={f.id} 
              className={`group relative flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer text-sm transition-all overflow-hidden
                ${activeFileId === f.id 
                  ? 'bg-emerald-500/10 text-emerald-400 shadow-[inset_2px_0_0_0_rgba(16,185,129,1)]' 
                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                }`}
              onClick={() => {
                onSelectFile(f)
                if (isMobile && onCloseMobile) onCloseMobile()
              }}
            >
              {/* Subtle background glow for active item */}
              {activeFileId === f.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-50"></div>
              )}

              <div className="flex items-center gap-2.5 overflow-hidden relative z-10">
                <div className={`p-1.5 rounded-md ${activeFileId === f.id ? 'bg-emerald-500/20' : 'bg-slate-800/80 group-hover:bg-slate-700'}`}>
                  {f.lang === 'cobol' ? <Code2 size={13} className={activeFileId === f.id ? 'text-emerald-400' : 'text-slate-400'}/> : <Server size={13} className={activeFileId === f.id ? 'text-emerald-400' : 'text-slate-400'}/>}
                </div>
                <span className="truncate font-medium select-none text-xs tracking-wide">{f.name}</span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); onDeleteFile(f.id) }}
                className="opacity-80 md:opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all relative z-10 shrink-0"
                title="Delete File"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))
        )}
      </div>
      
      <div className="h-14 border-t border-slate-800/60 flex items-center justify-between px-4 sm:px-5 shrink-0 bg-[#0d1317]">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">Storage</span>
          <span className="text-xs text-slate-400 font-mono mt-0.5">{savedFiles.length} / {maxFiles}</span>
        </div>
        <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-emerald-500 transition-all duration-500" 
            style={{ width: `${(savedFiles.length / maxFiles) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
})
