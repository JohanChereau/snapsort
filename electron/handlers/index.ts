import { BrowserWindow } from "electron";
import { handlingApplicationEvents } from "./applicationHandler";
import { handlingCoreFeatures } from "./coreFeaturesHandler";
import { handlingFileEvents } from "./fileHandler";
import { handlingUserPreferences } from "./userPreferencesHandler";

export function loadHandlers(ipcMain: Electron.IpcMain, mainWindow: BrowserWindow) {
    handlingApplicationEvents(ipcMain);
    handlingFileEvents(ipcMain, mainWindow);
    handlingCoreFeatures(ipcMain);
    handlingUserPreferences(ipcMain);
  }