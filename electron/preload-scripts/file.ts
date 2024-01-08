import { OpenDialogOptions, ipcRenderer } from 'electron';

export async function showOpenDialog(options: OpenDialogOptions) {
  return await ipcRenderer.invoke('show-open-dialog', options);
}

export async function showPathInFileExplorer(path: string) {
  return await ipcRenderer.invoke('show-path-in-explorer', path);
}

export async function isFolder(path: string) {
  return await ipcRenderer.invoke('is-folder', path);
}
