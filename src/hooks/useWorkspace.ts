import { useState, useEffect } from 'react'

export type SavedFile = {
  id: string;
  name: string;
  lang: 'cobol' | 'jcl';
  code: string;
}

export function useWorkspace() {
  const [savedFiles, setSavedFiles] = useState<SavedFile[]>([])
  const [activeFileId, setActiveFileId] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('code3270-saved-files')
    const savedActiveId = localStorage.getItem('code3270-active-file')
    if (saved) {
      try {
        const parsedFiles = JSON.parse(saved) as SavedFile[]
        setSavedFiles(parsedFiles)
        
        if (savedActiveId) {
          const activeFile = parsedFiles.find(f => f.id === savedActiveId)
          if (activeFile) {
            setActiveFileId(activeFile.id)
          }
        }
      } catch (e) {}
    }
  }, [])

  useEffect(() => {
    if (activeFileId) {
      localStorage.setItem('code3270-active-file', activeFileId)
    } else {
      localStorage.removeItem('code3270-active-file')
    }
  }, [activeFileId])

  useEffect(() => {
    localStorage.setItem('code3270-saved-files', JSON.stringify(savedFiles))
  }, [savedFiles])

  return {
    savedFiles,
    setSavedFiles,
    activeFileId,
    setActiveFileId
  }
}
