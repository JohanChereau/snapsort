import { ipcRenderer } from "electron";

export async function getVersion() {
    return await ipcRenderer.invoke('get-application-version');
  }