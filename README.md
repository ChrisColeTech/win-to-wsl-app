# Win to WSL

A lightweight Electron-based desktop application for seamless path conversion between Windows, WSL, and MSYS formats.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Windows-lightgrey)

## Features

- **Multi-Format Path Conversion**: Convert paths between Windows, WSL (Windows Subsystem for Linux), and MSYS formats
- **Smart Path Detection**: Automatically detects the input path format
- **Clipboard Integration**: Quick copy/paste functionality for all path formats
- **Path History**: Remembers recently converted paths with usage tracking
- **System Tray Integration**: Minimizes to tray for quick access
- **Frameless Custom Window**: Modern, VS Code-style interface
- **Dark/Light Theme**: Toggle between themes with a single click
- **Persistent Storage**: Path history saved using electron-store

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui
- **Desktop**: Electron 27
- **State Management**: React Context API
- **Icons**: React Icons
- **Storage**: electron-store

## Installation

### Prerequisites

- Node.js 18+ and npm
- Windows with WSL installed (for full functionality)

### Development

```bash
# Clone the repository
git clone https://github.com/ChrisColeTech/win-to-wsl-app.git
cd win-to-wsl-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will start with hot-reload enabled. The frontend runs on port 5173, and Electron loads it automatically.

### Build

```bash
# Build for production
npm run build

# Create distributable packages
npm run dist          # Build for current platform
npm run dist:win      # Build for Windows
npm run dist:mac      # Build for macOS
npm run dist:linux    # Build for Linux
```

Built applications will be in the `dist/` directory.

## Releases

This project uses GitHub Actions for automated releases:

1. **Create a version tag**:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. **Automated build**: The workflow automatically builds for Windows, macOS, and Linux

3. **GitHub Release**: Installers are published to the GitHub Releases page

Download the latest release from the [Releases page](https://github.com/ChrisColeTech/win-to-wsl-app/releases).

## Usage

1. **Input Path**: Enter or paste any Windows, WSL, or MSYS path
2. **Auto-Detection**: The app automatically detects your input format
3. **View Conversions**: See all format conversions instantly
4. **Copy Paths**: Click copy buttons to copy any format to clipboard
5. **Path History**: Click the input field to see recent paths

### Path Format Examples

- **Windows**: `C:\Users\YourName\Documents\project`
- **WSL**: `/mnt/c/Users/YourName/Documents/project`
- **MSYS**: `/c/Users/YourName/Documents/project`

## Architecture

### Project Structure

```
win-to-wsl-app/
├── electron/              # Electron main process
│   ├── src/
│   │   ├── main.ts       # Main process entry
│   │   └── preload.ts    # Preload script
│   └── assets/           # App icons
├── frontend/             # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom hooks
│   │   ├── services/     # Path conversion logic
│   │   └── contexts/     # React contexts
│   └── public/           # Static assets
├── electron-builder.json # Build configuration
└── package.json          # Root package config
```

### Key Components

- **ConverterPanel**: Main UI panel with input/output sections
- **PathHistoryInput**: Custom dropdown for path history
- **TitleBar**: Custom frameless window controls
- **ThemeContext**: Dark/light theme management

### IPC Communication

The app uses Electron IPC for:
- Clipboard operations (`clipboard:read`, `clipboard:write`)
- Path history management (`history:read`, `history:add`, `history:clear`)
- Window controls (`window:minimize`, `window:maximize`, `window:close`)

## Configuration

### Window Settings

Default window configuration in `electron/src/main.ts`:

```typescript
{
  width: 800,
  height: 364,
  minWidth: 600,
  minHeight: 364,
  maxHeight: 364,
  resizable: true,  // Horizontal resize only
  frame: false      // Custom title bar
}
```

### Build Settings

Platform-specific icons and build targets in `electron-builder.json`.

## Development

### Available Scripts

```bash
npm run dev           # Start dev server (frontend + electron)
npm run build         # Build frontend and electron
npm run lint          # Run ESLint
npm run dist          # Create distributable
```

### Workspace Structure

This project uses npm workspaces:
- `frontend/` - React application workspace
- `electron/` - Electron main process workspace

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Built with [Electron](https://www.electronjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)

## Support

For issues, questions, or contributions, please visit the [GitHub repository](https://github.com/ChrisColeTech/win-to-wsl-app).

---

Made with ❤️ for Windows + WSL developers
