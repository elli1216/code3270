# Code3270: COBOL & JCL Syntax Checker

![Status](https://img.shields.io/badge/Status-Work_in_Progress-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)

Code3270 is a frictionless, web-based platform designed to help developers learn, write, and validate COBOL and Job Control Language (JCL) directly in the browser. No accounts, no emulators, and no heavy IDE setups required.

## Features

- **Instant Syntax Checking:** Write COBOL and JCL and get immediate, real-time validation without needing to spin up a mainframe emulator.
- **Interactive Tutorials:** Split-screen learning environment featuring markdown-based lessons on the left and a live code editor on the right.
- **Account-Free Experience:** Jump straight into coding. All tutorial progress and editor states are saved locally in your browser using `localStorage`.
- **Modern IDE Feel:** Powered by Monaco Editor, complete with syntax highlighting, line numbers, and error annotations. Includes a retro "Green Screen" theme for the classic mainframe aesthetic.
- **Privacy First:** Your code never permanently leaves your machine. Validation is handled entirely client-side.

## Linting Architecture

Code3270 features custom-built, in-browser linting engines for both COBOL and JCL.

To ensure maximum maintainability and strict adherence to SOLID principles, both linters are designed using the **Strategy (Rule-Based) Design Pattern**:

- **Decoupled Rules:** Every syntax check (e.g., Sequence Area boundaries, Undefined Variables, JCL Continuation fields) is extracted into its own independent rule object adhering to a strict interface (`CobolRule` or `JclRule`).
- **Open-Closed Principle (OCP):** The core linting engines are closed for modification but open for extension. The engine simply iterates over an array of registered rules (`ALL_COBOL_RULES` and `ALL_JCL_RULES`). Adding a new syntax check requires zero modifications to the core parser loop; you only need to build and register a new rule object.
- **Shared Specifications:** Positional column numbers, allowed clauses, and reserved words are centralized in a single `constants.ts` file (`COBOL_SPECS` and `JCL_SPECS`) to maintain a single source of truth across all rules.

## Tech Stack

- **Frontend Framework:** React, TanStack Start
- **Editor:** Monaco Editor (VS Code core)
- **Styling:** Tailwind CSS, Shadcn UI
- **Syntax Validation:** Custom modular TypeScript engines
- **Progress Tracking:** Browser `localStorage`

## Getting Started (Local Development)

### Prerequisites

- Node.js 18.x or higher
- npm or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/Code3270.git
   cd Code3270
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open the app**
   Navigate to `http://localhost:3000` in your browser.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
