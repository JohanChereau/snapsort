import { AnalyzingOptions, FileInfo, SortingOptions } from "../types/index";
import { analyzeFiles, sortFiles } from "../utils/file/fileUtils";

export function handlingCoreFeatures(ipcMain: Electron.IpcMain) {
    ipcMain.handle(
        'perform-sort',
        async (
          event,
          { sourceFolder, destinationFolder, fileExtensions, monthNames }: SortingOptions
        ) => {
          await sortFiles(event, {sourceFolder, destinationFolder, fileExtensions, monthNames});
        }
      );
    
      ipcMain.handle('perform-analyze', async (event, {sourceFolder}: AnalyzingOptions): Promise<FileInfo[]> => {
        return await analyzeFiles(event, {sourceFolder});
      })
}