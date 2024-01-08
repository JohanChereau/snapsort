import { getCustomMonthsPreferences, getFileExtensionsPreferences, setCustomMonthsPreferences, setFileExtensionsPreferences } from "../settings";

export function handlingUserPreferences(ipcMain: Electron.IpcMain) {
    ipcMain.handle('get-file-extensions-preferences', async (_event): Promise<string[]> => {
        return getFileExtensionsPreferences();
      });
    
      ipcMain.handle('set-file-extensions-preferences', async (_event, fileExtensions: string[]): Promise<void> => {
        return setFileExtensionsPreferences(fileExtensions);
      });
    
      ipcMain.handle('get-custom-months-preferences', async (_event): Promise<string[]> => {
        return getCustomMonthsPreferences();
      });
    
      ipcMain.handle('set-custom-months-preferences', async (_event, customMonths: string[]): Promise<void> => {
        return setCustomMonthsPreferences(customMonths);
      });
}