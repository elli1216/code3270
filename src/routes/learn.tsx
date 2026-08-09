import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Sidebar } from '../components/layout/Sidebar'
import { TUTORIAL_CURRICULUM } from '../lib/tutorialCurriculum'
import { SplitScreen } from '../components/layout/SplitScreen'
import { MonacoEditor } from '../components/editor/MonacoEditor'
import { ValidationFeedback } from '../components/editor/ValidationFeedback'
import { LessonNavigation } from '../components/tutorial/LessonNavigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useProgressStore } from '../store/progressStore'
import { lintCOBOL } from '../lib/validation/cobolLinter'
import { loadTutorialContentFn } from '../hooks/useTutorialLoader'
import { lintJCL } from '../lib/validation/jclLinter'
import type { ValidationResult } from '../lib/validation/schemas'
import { DEFAULT_CODE_MAP } from '../lib/constants'
import { z } from 'zod'

const searchSchema = z.object({
  track: z.string().optional().default('cobol'),
  module: z.string().optional().default('anatomy')
})

export const Route = createFileRoute('/learn')({
  validateSearch: searchSchema,
  component: LearnWorkspace,
})


function LearnWorkspace() {
  const { track, module: currentModuleId } = Route.useSearch()
  const navigate = useNavigate({ from: '/learn' })
  const currentLessonId = `${track}-${currentModuleId}`
  
  const { getLessonCode, saveLessonCode, markLessonCompleted } = useProgressStore()
  const [code, setCode] = useState<string>(DEFAULT_CODE_MAP[track] || '')
  
  const [markdownContent, setMarkdownContent] = useState<string>("Loading lesson...")
  const [isPending, setIsPending] = useState(false)
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)

  // 1. Load Content & Initial Code when URL changes
  useEffect(() => {
    let isMounted = true
    const loadContent = async () => {
      setValidationResult(null)
      try {
        const res = await loadTutorialContentFn({ data: { track, module: currentModuleId } })
        if (isMounted) setMarkdownContent(res.content)
      } catch (err) {
        if (isMounted) setMarkdownContent("# Error\nFailed to load lesson content.")
      }
    }
    loadContent()

    const saved = getLessonCode(currentLessonId)
    if (saved) {
      setCode(saved)
    } else {
      setCode(DEFAULT_CODE_MAP[track] || '')
    }
    
    return () => { isMounted = false }
  }, [track, currentModuleId, currentLessonId, getLessonCode])

  // 2. Compute Next/Prev Navigation
  // Flatten all modules into a single ordered array
  const flatModules = TUTORIAL_CURRICULUM.flatMap(t => t.modules.map(m => ({ track: t.track, module: m.id })))
  const currentIndex = flatModules.findIndex(m => m.track === track && m.module === currentModuleId)
  
  const hasNext = currentIndex < flatModules.length - 1
  const hasPrev = currentIndex > 0
  
  const handleNext = () => {
    if (hasNext) {
      const next = flatModules[currentIndex + 1]
      navigate({ search: { track: next.track, module: next.module } })
    }
  }

  const handlePrev = () => {
    if (hasPrev) {
      const prev = flatModules[currentIndex - 1]
      navigate({ search: { track: prev.track, module: prev.module } })
    }
  }

  // 3. Handle Code Editor and Run
  const handleEditorChange = (val: string | undefined) => {
    const newCode = val || ''
    setCode(newCode)
    saveLessonCode(currentLessonId, newCode)
  }

  const handleRunCode = async () => {
    setIsPending(true)
    setValidationResult(null)
    
    try {
      if (track === 'jcl') {
        // Run client-side JCL Linter
        const diags = lintJCL(code)
        setValidationResult({
          success: diags.length === 0,
          diagnostics: diags,
          output: diags.length === 0 ? "JCL syntax is valid." : undefined
        })
        if (diags.length === 0) markLessonCompleted(currentLessonId, code)
      } else if (track === 'cobol') {
        const diags = lintCOBOL(code)
        
        // If syntax is perfect, check if they used required keywords from the lesson
        if (diags.length === 0) {
           const requiredKeywords = currentModuleId === 'anatomy' ? ['IDENTIFICATION DIVISION', 'PROGRAM-ID'] : []
           const missing = requiredKeywords.filter(kw => !code.toUpperCase().includes(kw))
           
           if (missing.length > 0) {
             setValidationResult({
               success: false,
               diagnostics: [{ line: 1, message: `Missing required keywords: ${missing.join(', ')}`, severity: 'error' }],
               output: ''
             })
           } else {
             setValidationResult({
               success: true,
               diagnostics: [],
               output: 'COBOL syntax is valid. Great job!'
             })
             // Mark lesson as complete
             markLessonCompleted(currentLessonId, code)
           }
        } else {
           setValidationResult({
             success: false,
             diagnostics: diags,
             output: ''
           })
        }
      }
    } catch (err) {
      setValidationResult({
        success: false,
        diagnostics: [{ line: 1, message: "Server Error occurred.", severity: "error" }]
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <SplitScreen
      sidebar={<Sidebar />}
      lessonContent={
        <div className="prose prose-invert prose-emerald max-w-none pb-12">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {markdownContent}
          </ReactMarkdown>

          <LessonNavigation 
            onNext={handleNext}
            onPrev={handlePrev}
            onRun={handleRunCode}
            isRunning={isPending}
            hasNext={hasNext}
            hasPrev={hasPrev}
          />
            
          {validationResult && (
            <ValidationFeedback 
              diagnostics={validationResult.diagnostics} 
              output={validationResult.output} 
              success={validationResult.success} 
            />
          )}
        </div>
      }
      editorContent={
        <MonacoEditor
          language={track === 'jcl' ? 'jcl' : 'cobol'}
          value={code}
          onChange={handleEditorChange}
        />
      }
    />
  )
}
