import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface LessonProgress {
  id: string
  completed: boolean
  code?: string
}

interface ProgressState {
  completedLessons: Record<string, LessonProgress>
  markLessonCompleted: (lessonId: string, code?: string) => void
  saveLessonCode: (lessonId: string, code: string) => void
  isLessonCompleted: (lessonId: string) => boolean
  getLessonCode: (lessonId: string) => string | undefined
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: {},
      
      markLessonCompleted: (lessonId, code) => set((state) => ({
        completedLessons: {
          ...state.completedLessons,
          [lessonId]: {
            ...state.completedLessons[lessonId],
            id: lessonId,
            completed: true,
            ...(code !== undefined ? { code } : {})
          }
        }
      })),

      saveLessonCode: (lessonId, code) => set((state) => ({
        completedLessons: {
          ...state.completedLessons,
          [lessonId]: {
            id: lessonId,
            completed: state.completedLessons[lessonId]?.completed || false,
            code
          }
        }
      })),

      isLessonCompleted: (lessonId) => {
        return get().completedLessons[lessonId]?.completed || false
      },

      getLessonCode: (lessonId) => {
        return get().completedLessons[lessonId]?.code
      }
    }),
    {
      name: 'code3270-progress',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
