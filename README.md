# 🖥️ Code3270: COBOL & JCL Syntax Checker

![Status](https://img.shields.io/badge/Status-Work_in_Progress-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)

Code3270 is a frictionless, web-based platform designed to help developers learn, write, and validate COBOL and Job Control Language (JCL) directly in the browser. No accounts, no emulators, and no heavy IDE setups required.

## ✨ Features

* **⚡ Instant Syntax Checking:** Write COBOL and JCL and get immediate, real-time validation without needing to spin up a mainframe emulator.
* **📖 Interactive Tutorials:** Split-screen learning environment featuring markdown-based lessons on the left and a live code editor on the right.
* **🕵️ Account-Free Experience:** Jump straight into coding. All tutorial progress and editor states are saved locally in your browser using `localStorage`.
* **🎨 Modern IDE Feel:** Powered by Monaco Editor, complete with syntax highlighting, line numbers, and error annotations. Includes a retro "Green Screen" theme for the classic mainframe aesthetic.
* **🔒 Privacy First:** Your code never permanently leaves your machine. Validation is handled via stateless APIs or client-side WebAssembly (WASM).

## 🛠️ Tech Stack

* **Frontend Framework:** React, Next.js
* **Routing & Data Fetching:** Tanstack Start
* **Editor:** Monaco Editor (VS Code core)
* **Styling:** Tailwind CSS
* **Syntax Validation:** Custom TypeScript JCL linter & GnuCOBOL-based stateless API (or WASM)
* **Progress Tracking:** Browser `localStorage`

## 🚀 Getting Started (Local Development)

### Prerequisites
* Node.js 18.x or higher
* npm or pnpm

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

## 🗺️ Roadmap

- [ ] Implement base UI layout (Split-screen editor).
- [ ] Integrate Monaco Editor with basic COBOL/JCL syntax highlighting.
- [ ] Develop local state management for saving user progress.
- [ ] Build the JCL positional syntax linter.
- [ ] Connect the COBOL syntax validation endpoint.
- [ ] Write introductory modules for the COBOL tutorial.
- [ ] Write introductory modules for the JCL tutorial.
- [ ] Add "Terminal Green" retro theme toggle.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](#) if you want to contribute.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
