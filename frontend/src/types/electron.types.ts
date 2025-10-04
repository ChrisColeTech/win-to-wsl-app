import type { PathHistoryEntry, PathHistory } from './history.types';

// Electron IPC channels
export type IpcChannel =
  | 'clipboard:read'
  | 'clipboard:write'
  | 'app:quit'
  | 'window:minimize'
  | 'window:maximize'
  | 'window:close'
  | 'history:read'
  | 'history:add'
  | 'history:clear';

// Electron API exposed via contextBridge
export interface ElectronAPI {
  clipboard: {
    readText: () => Promise<string>;
    writeText: (text: string) => Promise<void>;
  };
  app: {
    quit: () => void;
  };
  window: {
    minimize: () => void;
    maximize: () => void;
    close: () => void;
  };
  history: {
    read: () => Promise<PathHistory>;
    add: (entry: PathHistoryEntry) => Promise<PathHistory>;
    clear: () => Promise<PathHistory>;
  };
}

// Extend Window interface
declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}
