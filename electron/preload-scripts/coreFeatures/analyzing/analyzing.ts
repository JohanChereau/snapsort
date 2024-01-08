import { ipcRenderer } from 'electron';
import { AnalyzingOptions, ProgressStatus } from '../../../types/index';

export async function performAnalyze(options: AnalyzingOptions) {
  return await ipcRenderer.invoke('perform-analyze', options);
}

export function addAnalyzeProgressListener(
  callback: (event: Electron.IpcRendererEvent, progress: ProgressStatus) => void
) {
  ipcRenderer.on('analyze-progress', callback);
}

export function removeAnalyzeProgressListener() {
  ipcRenderer.removeAllListeners('analyze-progress');
}

export function addAnalyzeErrorListener(
  callback: (event: Electron.IpcRendererEvent, error: Error) => void
) {
  ipcRenderer.on('analyze-error', callback);
}

export function removeAnalyzeErrorListener() {
  ipcRenderer.removeAllListeners('analyze-error');
}
