# Code3270 Development Phases

## Tech Stack

- **Frontend Framework:** React
- **Routing & Data Fetching:** TanStack Start
- **Editor:** Monaco Editor (VS Code core)
- **Styling:** Tailwind CSS
- **Syntax Validation:** Custom TypeScript JCL linter & GnuCOBOL-based stateless API (or WASM)
- **Schema Validation:** Zod
- **State Management:** Zustand
- **Progress Tracking:** Browser `localStorage`

## Phase 1: Foundation & UI

**Goal:** Build the landing page, core interface, theme system, and integrate the code editor.

- Implement the Landing Page (featuring the history of COBOL & JCL, and why they are critical today).
- Implement base UI layout (W3Schools-style: Sidebar navigation, Left-pane lesson content, Right-pane "Try it Yourself" interactive editor).
- Integrate Monaco Editor with basic COBOL/JCL syntax highlighting.
- Add "Terminal Green" retro theme toggle.

**Files to Create (DRY-focused):**

- `src/routes/__root.tsx`: Root layout and global providers.
- `src/routes/index.tsx`: Main landing page detailing the history/relevance of COBOL/JCL and a "Start Learning" call-to-action.
- `src/routes/learn.tsx`: The main application workspace route for the tutorials.
- `src/components/layout/Sidebar.tsx`: W3Schools-like left sidebar for navigating tutorial chapters.
- `src/components/layout/SplitScreen.tsx`: Reusable split-screen container (Lesson on left, "Try it Yourself" Editor on right).
- `src/components/editor/MonacoEditor.tsx`: Centralized Monaco wrapper component to handle initialization and cleanup consistently.
- `src/components/theme/ThemeToggle.tsx`: UI component for toggling themes.
- `src/utils/theme.ts`: Centralized theme management and utility functions.
- `src/index.css`: Global styles and Tailwind CSS variable definitions (e.g., Terminal Green palette).

## Phase 2: Core Logic & Validation

**Goal:** Implement progress saving and the core syntax validation engines.

- Develop local state management for saving user progress.
- Build the JCL positional syntax linter.
- Connect the COBOL syntax validation endpoint.

**Files to Create:**

- `src/hooks/useLocalStorage.ts`: Generic, reusable hook for `localStorage` interaction to ensure DRY state persistence.
- `src/store/progressStore.ts`: Centralized state management using **Zustand** for tracking user's tutorial progress and editor state.
- `src/lib/validation/schemas.ts`: Centralized **Zod** schemas for validating JCL/COBOL data structures, search params, and API payloads.
- `src/lib/validation/jclLinter.ts`: Core JCL parsing and validation logic (utilizing Zod schemas), isolated as a utility for testability.
- `src/lib/validation/cobolClient.ts`: TanStack Start server functions (`createServerFn`) or API client to interface with the external COBOL validation API.
- `src/components/editor/ValidationFeedback.tsx`: Reusable component for displaying linter/compiler errors and diagnostics.

## Phase 3: Content & Education

**Goal:** Create the W3Schools-like interactive tutorials and markdown rendering system.

- Implement "Next/Previous" lesson navigation and a "Run Code" button for the interactive experience.
- Write introductory modules for the COBOL tutorial, structured incrementally.
- Write introductory modules for the JCL tutorial, structured incrementally.

**Files to Create:**
* `src/components/tutorial/MarkdownViewer.tsx`: Reusable markdown rendering component to handle all lesson content.
* `src/components/tutorial/LessonNavigation.tsx`: "Next/Previous" buttons and "Try it Yourself" action triggers.
* `src/hooks/useTutorialLoader.ts`: Centralized logic for fetching and parsing tutorial content.
* `src/content/tutorials/cobol/01-intro.md`: First COBOL lesson module.

## 📚 Curriculum Blueprint
The platform features an integrated, interactive curriculum designed to take users from zero mainframe experience to writing production-ready batch pipelines.

### Track 1: JCL & Mainframe Execution Essentials
* **JCL Foundations:** Understanding the JOB, EXEC, and DD statements; Dataset Allocation (DSN, DISP, SPACE).
* **Conditional Execution:** Utilizing COND parameters and IF/THEN/ELSE constructs for job control flow.
* **System Utilities:** Implementing IEFBR14, IEBGENER, and DFSORT.
* **Advanced JCL Capabilities:** Externalizing code using Cataloged Procedures (PROCs), In-Stream Procedures, and JCL Include (JCLLIB).
* **Flexibility & Versioning:** Utilizing Symbolic Parameters for reusability and Generation Data Groups (GDGs) for managing multiple versions of related datasets.
* **Resilience:** Implementing Restart and Recovery techniques for job failures.

### Track 2: COBOL Core Programming Fundamentals
* **COBOL Anatomy:** Mastering the Identification, Environment, Data, and Procedure Divisions.
* **Data Types:** Utilizing PICTURE (PIC) clauses for alphanumeric and numeric variables, and internal representations (COMP).
* **Control Flow:** Implementing IF/ELSE, EVALUATE, and PERFORM statements (loops).
* **Table Handling (Arrays):** Managing fixed and variable-length tables using OCCURS and OCCURS DEPENDING ON; implementing sequential SEARCH and binary SEARCH ALL.
* **Modular Design:** Structuring code using Copybooks, Nested Programs, and the CALL statement (BY REFERENCE, BY CONTENT).

### Track 3: Advanced COBOL Processing
* **Sequential File Handling:** Implementing SELECT...ASSIGN, FD, READ, WRITE, and CLOSE operations.
* **Advanced File Processing:** Managing Key-Sequenced Datasets (VSAM KSDS) with dynamic reading and random access lookups.
* **Exception Management:** Implementing robust error handling using FILE STATUS codes to prevent program crashes.

*(Note: Database (DB2) and Online Transaction Processing (CICS) integration will be added in future updates).*
