import { createFileRoute } from '@tanstack/react-router'
import { Sidebar } from '../components/layout/Sidebar'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const Route = createFileRoute('/setup')({
  component: SetupGuide,
})

const markdownContent = `
# GnuCOBOL Setup & Execution Guide

This guide provides the necessary steps to install, configure, and run **COBOL** programs on a Windows environment using the GnuCOBOL compiler.

---

## 1. Installation

You can download the GnuCOBOL compiler from either of these sources:

* **Official SourceForge (Standard):** [Download GnuCOBOL](https://sourceforge.net/projects/gnucobol/)
* **Arnold Trembley's Build (Recommended for Windows):** [Download .7z Installer](https://www.arnoldtrembley.com/GC32-BDB-SP1-rename-7z-to-exe.7z)
* *Note: If using the Arnold Trembley link, you **must** rename the file extension from \`.7z\` to \`.exe\` before running the installer.*

Extract or install the contents to a path without spaces, for example: \`C:\\GnuCOBOL\`.

---

## 2. System Environment Variables

To ensure the compiler can find its configuration files and binary tools, set the following variables in your **System Environment Variables**.

### Primary Variables

| Variable Name | Value |
| --- | --- |
| \`COB_MAIN_DIR\` | \`C:\\GnuCOBOL\` |
| \`COB_CONFIG_DIR\` | \`C:\\GnuCOBOL\\config\` |
| \`COB_COPY_DIR\` | \`C:\\GnuCOBOL\\copy\` |
| \`COB_INCLUDE_DIR\` | \`C:\\GnuCOBOL\\include\` |
| \`COB_LIB_DIR\` | \`C:\\GnuCOBOL\\lib\` |

### Path Variable

Add the following to your \`Path\` variable:

* \`C:\\GnuCOBOL\\bin\`

---

## 3. VSCode Configuration

To get syntax highlighting and code completion in VSCode, install the following extensions:

* **COBOL** by bitlang
* **COBOL Extension Pack**

---

## 4. Compiling and Running

To compile a COBOL program, use the \`cobc\` command in your terminal:

\`\`\`bash
cobc -x -free hello.cob -o hello.exe
\`\`\`

* \`-x\`: Build an executable program.
* \`-free\`: Use free-format COBOL (if applicable).
* \`-o\`: Specify the output file name.

Run the compiled executable:

\`\`\`bash
./hello.exe
\`\`\`

You're all set! You can now write, compile, and execute COBOL programs on your Windows machine.
`

function SetupGuide() {
  return (
    <div className="flex h-screen bg-slate-950 text-slate-300">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto py-12 px-6 sm:px-8 lg:px-12">
          <div className="prose prose-invert prose-emerald max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdownContent}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}
