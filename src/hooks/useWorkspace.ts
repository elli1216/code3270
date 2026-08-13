import { useWorkspaceStore, type SavedFile } from '../store/workspaceStore'

export type { SavedFile }

export function useWorkspace() {
  const savedFiles = useWorkspaceStore((state) => state.savedFiles)
  const activeFileId = useWorkspaceStore((state) => state.activeFileId)
  const setActiveFileId = useWorkspaceStore((state) => state.setActiveFileId)
  const addFile = useWorkspaceStore((state) => state.addFile)
  const updateFileCode = useWorkspaceStore((state) => state.updateFileCode)
  const updateFileLang = useWorkspaceStore((state) => state.updateFileLang)
  const deleteFile = useWorkspaceStore((state) => state.deleteFile)

  return {
    savedFiles,
    activeFileId,
    setActiveFileId,
    addFile,
    updateFileCode,
    updateFileLang,
    deleteFile,
  }
}
