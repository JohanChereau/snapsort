import { getApplicationVersion } from "../utils/application/applicationUtils";

export function handlingApplicationEvents(ipcMain: Electron.IpcMain) {
    ipcMain.handle('get-application-version', async (_event): Promise<string> => {
        return await getApplicationVersion();
      });
}