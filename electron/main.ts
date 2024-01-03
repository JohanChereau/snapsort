import {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  OpenDialogOptions,
} from 'electron';
import { checkIsFolder, openPathInFileExplorer, sortFiles } from './utils/file/fileUtils';
import path from 'node:path';
import { SortingOptions } from './types';

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, '../public');

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

function createWindow(): BrowserWindow {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'Snapsort.png'),
    width: 1220,
    height: 720,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'));
  }

  return win;
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  const mainWindow = createWindow();

  ipcMain.handle(
    'show-open-dialog',
    async (_event, options: OpenDialogOptions) => {
      if (mainWindow) {
        return await dialog.showOpenDialog(mainWindow, options);
      } else {
        throw new Error('Main window not available');
      }
    }
  );

  ipcMain.handle(
    'perform-sort',
    async (
      event,
      { sourceFolder, destinationFolder, fileExtensions }: SortingOptions
    ) => {
      await sortFiles(event, sourceFolder, destinationFolder, fileExtensions);
    }
  );

  ipcMain.handle('is-folder', async(_event, path) => {
    return checkIsFolder(path);
  });

  ipcMain.handle('show-path-in-explorer', async (_event, path) => {
    await openPathInFileExplorer(path);
  })
});
