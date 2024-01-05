import fs from 'fs';
import path from 'node:path';
import { shell } from 'electron';
import { FileInfo, SortingOptions, SortingProgress } from 'electron/types';
import { getMonthNameFromIndex } from '..';

export async function getAllFilesFromFolder(
  sourceFolder: string,
  extensions: string[],
  monthNames: string[]
): Promise<FileInfo[]> {
  let results: FileInfo[] = [];

  try {
    const files = fs.readdirSync(sourceFolder);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(sourceFolder, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        results = results.concat(
          await getAllFilesFromFolder(filePath, extensions, monthNames)
        );
      } else if (extensions.includes(path.extname(file))) {
        const mtime = stat.mtime;

        const monthIndex: number = mtime.getMonth() + 1;
        let monthName: string;

        if(!monthNames.length || monthNames.length !== 12) {
          monthName = getMonthNameFromIndex(monthIndex - 1);
        } else {
          monthName = monthNames[monthIndex - 1];
        }

        results.push({
          path: filePath,
          name: file,
          mtime: stat.mtime,
          year: mtime.getFullYear().toString(),
          month: monthName,
          monthIndex: mtime.getMonth() + 1,
          day: mtime.getDate().toString(),
        });
      }
    }
  } catch (error) {
    console.error(
      `An error occurred while reading the files : ${error}`
    );
  }

  return results;
}

export async function sortFiles(
  event: Electron.IpcMainInvokeEvent,
  {
    sourceFolder,
    destinationFolder,
    fileExtensions,
    monthNames,
  }: SortingOptions
): Promise<void> {
  try {
    const files: FileInfo[] = await getAllFilesFromFolder(
      sourceFolder,
      fileExtensions,
      monthNames,
    );

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await sortFile(file, destinationFolder);

      const progress: SortingProgress = {
        sortedIndex: i + 1,
        path: file.path,
        total: files.length,
      };

      //Send a progress event
      event.sender.send('sort-progress', progress);
    }
  } catch (error) {
    event.sender.send('sort-error', { error: error });
  }
}

export async function sortFile(
  file: FileInfo,
  destinationFolder: string
): Promise<void> {
  try {
    let destinationPath: string;

    const concatenatedMonth = `${file.monthIndex.toString().padStart(2, '0')} - ${file.month}`;

    // We check if the year folder exists.
    const yearFolder = path.join(destinationFolder, file.year);
    if(fs.existsSync(yearFolder)) {

      // List of all folders in the year folder
      const existingFolders = fs.readdirSync(yearFolder);

      // Find a folder with the same month index
      const existingFolder = existingFolders.find(folder => folder.startsWith(file.monthIndex.toString().padStart(2, '0')));

      if(existingFolder) {
        // Use full path for existing folder
        destinationPath = path.join(yearFolder, existingFolder);
      } else {
        destinationPath = path.join(yearFolder, concatenatedMonth);
      }
    } else {
      // Create the year folder if it doesn't exist
      fs.mkdirSync(yearFolder);
      destinationPath = path.join(yearFolder, concatenatedMonth);
    }

    let destinationFilePath = path.join(destinationPath, file.name);

    // Create the destination folder if it doesn't exist
    fs.mkdirSync(destinationPath, { recursive: true });

    // If the file already exists, generate a new name
    while (fs.existsSync(destinationFilePath)) {
      destinationFilePath = path.join(
        destinationPath,
        generateUniqueFileName(file)
      );
    }

    // Copy file to destination folder
    fs.copyFileSync(file.path, destinationFilePath);
  } catch (error) {
    console.error(
      `An error occurred while sorting the file ${file.path}: ${error}`
    );
  }
}

function generateUniqueFileName(file: FileInfo): string {
  const date = new Date();
  const timestamp = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
  const ext = path.extname(file.name);
  const base = path.basename(file.name, ext);
  return `SNAPSORT_${timestamp}_${base}${ext}`;
}

export async function checkIsFolder(path: string): Promise<boolean> {
  return !fs.lstatSync(path).isFile();
}

export async function openPathInFileExplorer(path: string): Promise<void> {
  if (!checkIsFolder(path)) return;
  shell.showItemInFolder(path);
}
