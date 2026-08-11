import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ThemeState {
  isRetroMode: boolean
  toggleRetroMode: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isRetroMode: false,
      toggleRetroMode: () => set((state) => ({ isRetroMode: !state.isRetroMode })),
    }),
    {
      name: 'code3270-theme',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
