import { editor, languages } from 'monaco-editor'

let isInitialized = false

export function setupMonaco(monaco: typeof import('monaco-editor')) {
  if (isInitialized) return
  isInitialized = true

  if (!monaco.languages.getLanguages().some(l => l.id === 'cobol')) {
    monaco.languages.register({ id: 'cobol' })
  }
  if (!monaco.languages.getLanguages().some(l => l.id === 'jcl')) {
    monaco.languages.register({ id: 'jcl' })
  }

  // Register "Terminal Green" retro theme
  monaco.editor.defineTheme('terminal-green', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '22c55e', fontStyle: 'italic' },
      { token: 'keyword', foreground: '4ade80', fontStyle: 'bold' },
      { token: 'string', foreground: '86efac' },
      { token: 'number', foreground: 'bbf7d0' },
    ],
    colors: {
      'editor.background': '#022c22', // emerald-950
      'editor.foreground': '#4ade80', // emerald-400
      'editor.lineHighlightBackground': '#064e3b', // emerald-900
      'editorCursor.foreground': '#a7f3d0', // emerald-200
      'editorLineNumber.foreground': '#047857', // emerald-700
      'editorIndentGuide.background': '#064e3b',
      'editorRuler.foreground': '#064e3b'
    }
  })

  // IntelliSense: COBOL
  monaco.languages.registerCompletionItemProvider('cobol', {
    provideCompletionItems: () => {
      const suggestions = [
        { label: 'IDENTIFICATION DIVISION', kind: monaco.languages.CompletionItemKind.Keyword, insertText: '       IDENTIFICATION DIVISION.\n       PROGRAM-ID. ' },
        { label: 'ENVIRONMENT DIVISION', kind: monaco.languages.CompletionItemKind.Keyword, insertText: '       ENVIRONMENT DIVISION.\n' },
        { label: 'DATA DIVISION', kind: monaco.languages.CompletionItemKind.Keyword, insertText: '       DATA DIVISION.\n       WORKING-STORAGE SECTION.\n' },
        { label: 'PROCEDURE DIVISION', kind: monaco.languages.CompletionItemKind.Keyword, insertText: '       PROCEDURE DIVISION.\n' },
        { label: 'PERFORM', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'PERFORM ' },
        { label: 'DISPLAY', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'DISPLAY ' },
        { label: 'STOP RUN', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'STOP RUN.' },
      ]
      return { suggestions: suggestions as any }
    }
  })

  // IntelliSense: JCL
  monaco.languages.registerCompletionItemProvider('jcl', {
    provideCompletionItems: () => {
      const suggestions = [
        { label: 'JOB', kind: monaco.languages.CompletionItemKind.Keyword, insertText: "//MYJOB    JOB (ACCT),'NAME',CLASS=A,MSGCLASS=X" },
        { label: 'EXEC PGM', kind: monaco.languages.CompletionItemKind.Keyword, insertText: "//STEP1    EXEC PGM=" },
        { label: 'DD DSN', kind: monaco.languages.CompletionItemKind.Keyword, insertText: "//DD1      DD DSN=USER.DATA.SET,\n//            DISP=(NEW,CATLG,DELETE),\n//            SPACE=(TRK,(10,5))" },
        { label: 'SYSOUT', kind: monaco.languages.CompletionItemKind.Keyword, insertText: "//SYSOUT   DD SYSOUT=*" },
      ]
      return { suggestions: suggestions as any }
    }
  })
}
