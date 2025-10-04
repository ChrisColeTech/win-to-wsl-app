import { app, BrowserWindow, ipcMain, clipboard, Tray, Menu, nativeImage } from 'electron';
import * as path from 'path';
import Store from 'electron-store';

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 364,
    minWidth: 600,
    minHeight: 364,
    maxHeight: 364,
    resizable: true, // Allow horizontal resize only
    frame: false, // Hide native title bar
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  // Minimize to tray instead of taskbar
  mainWindow.on('minimize', (event: Electron.Event) => {
    event.preventDefault();
    mainWindow?.hide();
  });

  // Hide to tray on close (don't quit app)
  mainWindow.on('close', (event) => {
    if (!(app as any).isQuitting) {
      event.preventDefault();
      mainWindow?.hide();
    }
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../frontend/dist/index.html'));
  }

  return mainWindow;
};

function createTray() {
  // Load platform-specific tray icon
  let iconPath: string;

  if (process.platform === 'darwin') {
    // macOS: Use 16x16 or 32x32 for Retina
    iconPath = path.join(__dirname, '../assets/icons/png/16x16.png');
  } else if (process.platform === 'win32') {
    // Windows: Use 16x16 or ICO file
    iconPath = path.join(__dirname, '../assets/icons/png/16x16.png');
  } else {
    // Linux: Use 16x16
    iconPath = path.join(__dirname, '../assets/icons/png/16x16.png');
  }

  const icon = nativeImage.createFromPath(iconPath);
  tray = new Tray(icon);
  tray.setToolTip('Path Converter');

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show Window',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        } else {
          createWindow();
        }
      }
    },
    {
      label: 'Hide Window',
      click: () => {
        mainWindow?.hide();
      }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        (app as any).isQuitting = true;
        app.quit();
      }
    }
  ]);

  tray.setContextMenu(contextMenu);

  // Click to show/hide
  tray.on('click', () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
    } else {
      createWindow();
    }
  });

  return tray;
};

app.whenReady().then(() => {
  createWindow();
  createTray();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else if (mainWindow) {
      mainWindow.show();
    }
  });
});

app.on('before-quit', () => {
  (app as any).isQuitting = true;
});

app.on('window-all-closed', () => {
  // Keep app running in tray even when all windows are closed
  // Don't quit unless user explicitly quits from tray menu
  if (process.platform === 'darwin' && !(app as any).isQuitting) {
    // macOS apps typically stay open
  }
});

// History management with electron-store
interface PathHistoryEntry {
  path: string;
  format: string;
  timestamp: number;
  usageCount: number;
}

interface PathHistory {
  entries: PathHistoryEntry[];
  maxEntries: number;
}

const store = new Store<{ history: PathHistory }>({
  defaults: {
    history: {
      entries: [],
      maxEntries: 50,
    },
  },
});

// IPC Handlers
ipcMain.handle('clipboard:read', () => clipboard.readText());
ipcMain.handle('clipboard:write', (_, text: string) => clipboard.writeText(text));

ipcMain.handle('history:read', () => {
  return store.get('history');
});

ipcMain.handle('history:add', (_, entry: PathHistoryEntry) => {
  const history = store.get('history');
  const existingIndex = history.entries.findIndex(e => e.path === entry.path);

  if (existingIndex >= 0) {
    history.entries[existingIndex].timestamp = entry.timestamp;
    history.entries[existingIndex].usageCount += 1;
  } else {
    history.entries.unshift(entry);
    if (history.entries.length > history.maxEntries) {
      history.entries = history.entries.slice(0, history.maxEntries);
    }
  }

  store.set('history', history);
  return history;
});

ipcMain.handle('history:clear', () => {
  const defaultHistory: PathHistory = { entries: [], maxEntries: 50 };
  store.set('history', defaultHistory);
  return defaultHistory;
});

// Window control handlers
ipcMain.on('window:minimize', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win?.minimize();
});

ipcMain.on('window:maximize', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win?.isMaximized()) {
    win?.unmaximize();
  } else {
    win?.maximize();
  }
});

ipcMain.on('window:close', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win?.close();
});
