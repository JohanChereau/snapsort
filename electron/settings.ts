import Store from 'electron-store';
const storage = new Store();

export async function getFileExtensionsPreferences(): Promise<string[]> {
  const DEFAULT_FILE_EXTENSIONS = ['.jpg', '.png', '.mp4'];

  try {
    const fileExtensions = storage.get('fileExtensions') as string[];

    if (fileExtensions) {
      return fileExtensions;
    } else {
      storage.set('fileExtensions', DEFAULT_FILE_EXTENSIONS);
      return DEFAULT_FILE_EXTENSIONS;
    }
  } catch (error) {
    console.error(
      'An error occurred while retrieving user file extensions preferences',
      error
    );
    return DEFAULT_FILE_EXTENSIONS;
  }
}

export function setFileExtensionsPreferences(fileExtensions: string[]):void {
  try {
    storage.set('fileExtensions', fileExtensions);
  } catch (error) {
    console.error(
      'An error occurred when setting user file extensions preferences',
      error
    );
  }
}
