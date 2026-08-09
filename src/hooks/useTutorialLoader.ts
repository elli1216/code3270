import { createServerFn } from '@tanstack/react-start'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { z } from 'zod'

const LoadTutorialSchema = z.object({
  track: z.string(),
  module: z.string(),
})

// Since we are in the server context, we can read files
export const loadTutorialContentFn = createServerFn({ method: 'GET' })
  .validator((data: unknown) => LoadTutorialSchema.parse(data))
  .handler(async ({ data }) => {
    // Determine directory based on track
    const dir = data.track === 'jcl' ? 'jcl' : 'cobol'
    let filePath = ''
    try {
      // Find the first file in the directory that includes the module id
      const dirPath = path.join(
        process.cwd(),
        'src',
        'content',
        'tutorials',
        dir,
      )
      let filename = `${data.module}.md` // Fallback if no specific prefix

      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath)
        const matchedFile = files.find(
          (f) => f.includes(data.module) && f.endsWith('.md'),
        )
        if (matchedFile) filename = matchedFile
      }

      filePath = path.join(dirPath, filename)
      const content = fs.readFileSync(filePath, 'utf-8')

      const markdown = content.replace(/^---[\s\S]+?---/, '').trim()

      return { success: true, content: markdown }
    } catch (e: any) {
      // Graceful fallback for unwritten modules
      return {
        success: true,
        content: `# Module: ${data.module}\n\n> 🚧 **Under Construction**\n\nThis lesson is part of the curriculum but the content has not been authored yet.\n\nCheck back soon!`,
      }
    }
  })
