import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

const LoadTutorialSchema = z.object({
  track: z.string(),
  module: z.string(),
})
const markdownFiles = import.meta.glob('../content/tutorials/**/*.md', { 
  eager: true, 
  query: '?raw', 
  import: 'default' 
})

export const loadTutorialContentFn = createServerFn({ method: 'GET' })
  .validator((data: unknown) => LoadTutorialSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      // Determine directory based on track
      const dir = data.track === 'jcl' ? 'jcl' : 'cobol'

      // Keys look like: '../content/tutorials/cobol/anatomy.md'
      const matchedKey = Object.keys(markdownFiles).find(
        (key) =>
          key.includes(`/${dir}/`) &&
          key.includes(data.module) &&
          key.endsWith('.md'),
      )

      if (matchedKey) {
        const content = markdownFiles[matchedKey]
        const markdown = content.replace(/^---[\s\S]+?---/, '').trim()
        return { success: true, content: markdown }
      } else {
        throw new Error(`File not found for module: ${data.module}`)
      }
    } catch (e: any) {
      console.error('Error loading tutorial content:', e)
      // Graceful fallback for unwritten modules
      return {
        success: true,
        content: `# Module: ${data.module}\n\n> 🚧 **Under Construction**\n\nThis lesson is part of the curriculum but the content has not been authored yet.\n\nCheck back soon!`,
      }
    }
  })
