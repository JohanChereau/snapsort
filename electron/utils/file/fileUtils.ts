import fs from 'fs';
import path from 'node:path';
import { FileInfo, SortingProgress } from 'electron/types';
import { getMonthNameFromIndex } from '..';

export async function getAllFilesFromFolder(
  sourceFolder: string,
  extensions: string[]
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
          await getAllFilesFromFolder(filePath, extensions)
        );
      } else if (extensions.includes(path.extname(file))) {
        const mtime = stat.mtime;

        results.push({
          path: filePath,
          name: file,
          mtime: stat.mtime,
          year: mtime.getFullYear().toString(),
          month: getMonthNameFromIndex(mtime.getMonth()),
          monthIndex: mtime.getMonth() + 1,
          day: mtime.getDate().toString(),
        });
      }
    }
  } catch (error) {
    console.error(
      `Une erreur est survenue lors de la lecture des fichiers : ${error}`
    );
  }

  return results;
}

export async function sortFiles(
  event: Electron.IpcMainInvokeEvent,
  sourceFolder: string,
  destinationFolder: string,
  fileExtensions: string[]
): Promise<void> {
  try {
    const files: FileInfo[] = await getAllFilesFromFolder(
      sourceFolder,
      fileExtensions
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
    const concatenatedMonth = `${file.monthIndex} - ${file.month}`;

    const destinationPath = path.join(
      destinationFolder,
      file.year,
      concatenatedMonth
    );
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

    // Copy the file to the destination folder
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
