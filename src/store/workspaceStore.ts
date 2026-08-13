import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface SavedFile {
  id: string
  name: string
  lang: 'cobol' | 'jcl'
  code: string
}

interface WorkspaceState {
  savedFiles: SavedFile[]
  activeFileId: string | null

  // Actions
  addFile: (name: string, lang: 'cobol' | 'jcl', code: string) => SavedFile
  updateFileCode: (id: string, code: string) => void
  updateFileLang: (id: string, lang: 'cobol' | 'jcl') => void
  deleteFile: (id: string) => void
  setActiveFileId: (id: string | null) => void
  getFileById: (id: string) => SavedFile | undefined
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      savedFiles: [],
      activeFileId: null,

      addFile: (name, lang, code) => {
        const newFile: SavedFile = {
          id: Math.random().toString(36).substring(2, 10),
          name: name.trim(),
          lang,
          code,
        }
        set((state) => ({
          savedFiles: [...state.savedFiles, newFile],
          activeFileId: newFile.id,
        }))
        return newFile
      },

      updateFileCode: (id, code) =>
        set((state) => {
          const file = state.savedFiles.find((f) => f.id === id)
          if (file && file.code === code) return state
          return {
            savedFiles: state.savedFiles.map((f) =>
              f.id === id ? { ...f, code } : f
            ),
          }
        }),

      updateFileLang: (id, lang) =>
        set((state) => ({
          savedFiles: state.savedFiles.map((f) =>
            f.id === id ? { ...f, lang } : f
          ),
        })),

      deleteFile: (id) =>
        set((state) => ({
          savedFiles: state.savedFiles.filter((f) => f.id !== id),
          activeFileId: state.activeFileId === id ? null : state.activeFileId,
        })),

      setActiveFileId: (id) => set({ activeFileId: id }),

      getFileById: (id) => get().savedFiles.find((f) => f.id === id),
    }),
    {
      name: 'code3270-workspace-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
