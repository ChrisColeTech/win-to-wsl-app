import { contextBridge, ipcRenderer } from 'electron'

interface PathHistoryEntry {
  path: string;
  format: string;
  timestamp: number;
  usageCount: number;
}

contextBridge.exposeInMainWorld('electronAPI', {
  clipboard: {
    readText: () => ipcRenderer.invoke('clipboard:read'),
    writeText: (text: string) => ipcRenderer.invoke('clipboard:write', text),
  },
  window: {
    minimize: () => ipcRenderer.send('window:minimize'),
    maximize: () => ipcRenderer.send('window:maximize'),
    close: () => ipcRenderer.send('window:close'),
  },
  history: {
    read: () => ipcRenderer.invoke('history:read'),
    add: (entry: PathHistoryEntry) => ipcRenderer.invoke('history:add', entry),
    clear: () => ipcRenderer.invoke('history:clear'),
  },
})
