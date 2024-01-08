import { ipcRenderer } from 'electron';
import { ProgressStatus, SortingOptions } from '../../../types/index';

export async function performSort(options: SortingOptions) {
  return await ipcRenderer.invoke('perform-sort', options);
}

export function addSortProgressListener(
  callback: (event: Electron.IpcRendererEvent, progress: ProgressStatus) => void
) {
  ipcRenderer.on('sort-progress', callback);
}

export function removeSortProgressListener() {
  ipcRenderer.removeAllListeners('sort-progress');
}

export function addSortErrorListener(
  callback: (event: Electron.IpcRendererEvent, error: Error) => void
) {
  ipcRenderer.on('sort-error', callback);
}

export function removeSortErrorListener() {
  ipcRenderer.removeAllListeners('sort-error');
}
