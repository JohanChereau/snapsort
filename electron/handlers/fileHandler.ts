import { BrowserWindow, OpenDialogOptions, dialog } from "electron";
import { checkIsFolder, openPathInFileExplorer } from "../utils/file/fileUtils";

export function handlingFileEvents(ipcMain: Electron.IpcMain, mainWindow: BrowserWindow) {
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

      ipcMain.handle('is-folder', async(_event, path) => {
        return checkIsFolder(path);
      });
    
      ipcMain.handle('show-path-in-explorer', async (_event, path) => {
        await openPathInFileExplorer(path);
      });
}