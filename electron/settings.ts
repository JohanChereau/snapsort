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

export async function getCustomMonthsPreferences(): Promise<string[]> {
    const CUSTOM_MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    try {
        const customMonths = storage.get('customMonths') as string[];

        if (customMonths) {
          return customMonths;
        } else {
          storage.set('customMonths', CUSTOM_MONTHS);
          return CUSTOM_MONTHS;
        }
      } catch (error) {
        console.error(
          'An error occurred while retrieving user custom months preferences',
          error
        );
        return CUSTOM_MONTHS;
      }
}

export function setCustomMonthsPreferences(customMonths: string[]): void {
    try {
        storage.set('customMonths', customMonths);
    } catch (error) {
        console.error(
            'An error occurred when setting user custom months preferences',
            error
        );
    }
}
