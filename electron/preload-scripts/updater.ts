import { ipcRenderer } from "electron";

export function addUpdaterMessageListener(
  callback: (event: Electron.IpcRendererEvent, message: string) => void
) {
  ipcRenderer.on("updaterMessage", callback);
}

export function removeUpdaterMessageListener() {
  ipcRenderer.removeAllListeners("updaterMessage");
}
