import { ipcRenderer } from "electron";

export async function getFileExtensionsPreferences(): Promise<string[]> {
  return ipcRenderer.invoke('get-file-extensions-preferences');
}

export async function setFileExtensionsPreferences(
  fileExtensions: string[]
): Promise<void> {
  return ipcRenderer.invoke('set-file-extensions-preferences', fileExtensions);
}

export async function getCustomMonthsPreferences(): Promise<string[]> {
  return ipcRenderer.invoke('get-custom-months-preferences');
}

export async function setCustomMonthsPreferences(
  customMonths: string[]
): Promise<void> {
  return ipcRenderer.invoke('set-custom-months-preferences', customMonths);
}
