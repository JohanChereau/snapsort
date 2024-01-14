import { BrowserWindow, app } from "electron";
import { DownloadProgress } from "electron/types";
export async function getApplicationVersion(): Promise<string> {
  return app.getVersion().toString();
}

export function sendMessage(
  window: BrowserWindow | null,
  event: string,
  message: string | DownloadProgress
) {
  window?.webContents.send(event, message);
}
