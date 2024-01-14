import { app, BrowserWindow, ipcMain } from "electron";
import { autoUpdater } from "electron-updater";
import path from "node:path";
import { loadHandlers } from "./handlers/index";
import { DownloadProgress } from "./types";
import { sendMessage } from "./utils/application/applicationUtils";
// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

console.info("DIST:", process.env.DIST);
console.info("VITE_PUBLIC:", process.env.VITE_PUBLIC);

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow(): BrowserWindow {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "Snapsort.png"),
    width: 1220,
    height: 720,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
      webSecurity: false,
      devTools: process.env.NODE_ENV !== "production",
    },
  });

  // Auto updater
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    if (import.meta.env.DEV) {
      win?.webContents.send(
        "main-process-message",
        new Date().toLocaleString()
      );
      win?.webContents.openDevTools();
    }
  });

  if (VITE_DEV_SERVER_URL) {
    console.log("Loading URL from VITE_DEV_SERVER_URL:", VITE_DEV_SERVER_URL);
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    console.log("Loading file from DIST:", process.env.DIST);

    const indexHTML = path.join(process.env.DIST, "index.html");
    win.loadFile(indexHTML);
  }

  return win;
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  const mainWindow = createWindow();
  loadHandlers(ipcMain, mainWindow);

  mainWindow.webContents.on("did-finish-load", () => {
    autoUpdater.checkForUpdates();

    autoUpdater.on("checking-for-update", () => {
      sendMessage(mainWindow, "updaterMessage", "Checking for updates...");
    });

    autoUpdater.on("update-available", () => {
      sendMessage(mainWindow, "updaterMessage", "Update is available");
    });

    autoUpdater.on("update-not-available", () => {
      sendMessage(mainWindow, "updaterMessage", "Update not available");
    });

    autoUpdater.on("download-progress", (progressObj) => {
      const downloadProgress: DownloadProgress = {
        speed: progressObj.bytesPerSecond,
        percent: progressObj.percent,
        transferred: progressObj.transferred,
        total: progressObj.total,
      };
      sendMessage(mainWindow, "updaterMessage", downloadProgress);
    });

    autoUpdater.on("update-downloaded", () => {
      sendMessage(mainWindow, "updaterMessage", "Update downloaded");
    });
  });
});
