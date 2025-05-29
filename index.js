const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let settingsWindow;

const CONFIG_PATH = path.join(app.getPath('userData'), 'saved-config.json');

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('index.html');
   mainWindow.webContents.on('did-finish-load', () => {
    if (fs.existsSync(CONFIG_PATH)) {
      const saved = JSON.parse(fs.readFileSync(CONFIG_PATH));
      if (saved.lastPath) {
        mainWindow.webContents.send('load-contact-file', saved.lastPath);
      }
    }
  });
}




  ipcMain.handle('open-json-file', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    filters: [{ name: 'JSON Files', extensions: ['json'] }],
    properties: ['openFile'],
  });

  if (!canceled && filePaths[0]) {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify({ lastPath: filePaths[0] }));
    return fs.readFileSync(filePaths[0], 'utf-8');
  }

  return null;
});

function createSettingsWindow() {
  settingsWindow = new BrowserWindow({
    width: 400,
    height: 300,
    title: 'Settings',
    parent: mainWindow,
    modal: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  settingsWindow.loadFile('settings.html');
}

app.whenReady().then(createMainWindow);

ipcMain.on('open-settings', () => {
  createSettingsWindow();
});

ipcMain.on('set-theme', (_, theme) => {
  mainWindow.webContents.send('apply-theme', theme);
 // settingsWindow.webContents.send('apply-theme', theme);
});
