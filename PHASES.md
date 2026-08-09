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

- `src/components/tutorial/MarkdownViewer.tsx`: Reusable markdown rendering component to handle all lesson content.
- `src/components/tutorial/LessonNavigation.tsx`: "Next/Previous" buttons and "Try it Yourself" action triggers.
- `src/hooks/useTutorialLoader.ts`: Centralized logic for fetching and parsing tutorial content.
- `src/content/tutorials/cobol/01-intro.md`: First COBOL lesson module.
- `src/content/tutorials/jcl/01-intro.md`: First JCL lesson module.
