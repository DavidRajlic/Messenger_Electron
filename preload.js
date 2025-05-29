const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  openSettingsWindow: () => ipcRenderer.send('open-settings'),
  setTheme: (theme) => ipcRenderer.send('set-theme', theme),
  onThemeChange: (callback) => ipcRenderer.on('apply-theme', (_, theme) => callback(theme)),
});

contextBridge.exposeInMainWorld('electronAPI', {
  openJsonFile: () => ipcRenderer.invoke('open-json-file'),
  onLoadContactFile: (callback) => ipcRenderer.on('load-contact-file', (_, path) => callback(path)),
});
