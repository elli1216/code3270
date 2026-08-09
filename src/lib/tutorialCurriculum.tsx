import { BookOpen, Terminal, Database } from 'lucide-react'

export const TUTORIAL_CURRICULUM = [
  {
    id: 'track-1',
    title: 'Track 1: JCL & Execution',
    icon: <Terminal size={16} />,
    track: 'jcl',
    modules: [
      { id: 'foundations', title: 'JCL Foundations' },
      { id: 'conditional', title: 'Conditional Execution' },
      { id: 'utilities', title: 'System Utilities' },
      { id: 'advanced', title: 'Advanced JCL Capabilities' },
      { id: 'flexibility', title: 'Flexibility & Versioning' },
      { id: 'resilience', title: 'Resilience & Recovery' }
    ]
  },
  {
    id: 'track-2',
    title: 'Track 2: COBOL Core',
    icon: <BookOpen size={16} />,
    track: 'cobol',
    modules: [
      { id: 'anatomy', title: 'COBOL Anatomy' },
      { id: 'datatypes', title: 'Data Types (PIC & COMP)' },
      { id: 'controlflow', title: 'Control Flow (IF & PERFORM)' },
      { id: 'tables', title: 'Table Handling (Arrays)' },
      { id: 'modular', title: 'Modular Design (Copybooks)' }
    ]
  },
  {
    id: 'track-3',
    title: 'Track 3: Advanced COBOL',
    icon: <Database size={16} />,
    track: 'cobol',
    modules: [
      { id: 'sequential', title: 'Sequential File Handling' },
      { id: 'vsam', title: 'VSAM KSDS Processing' },
      { id: 'exception', title: 'Exception Management' }
    ]
  }
]
