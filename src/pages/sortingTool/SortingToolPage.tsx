import { useState } from 'react';
import './SortingToolPage.scss';
import FileSelector from 'components/fileSelector/FileSelector';

const SortingToolPage = () => {
  const [sourceFolder, setSourceFolder] = useState<string | null>(null);
  const [destinationFolder, setDestinationFolder] = useState<string | null>(null);

  async function handleSort() {
    try {
      if (sourceFolder && destinationFolder) {
        const result = await window.electron.performSort({
          sourceFolder,
          destinationFolder,
          fileExtensions: ['.jpg', '.png', '.JPG', '.PNG'],
        });
        console.log(result);
      } else {
        console.error('Source folder or export folder is not selected.');
      }
    } catch (error) {
      console.error('Error during sorting:', error);
      // Gérez les erreurs ici.
    }
  }

  return (
    <main>
      <section className="sorting-tool-section">
        <div className="file-selectors-container container">
          <FileSelector
            title="Upload your photos"
            subtitle="Select your photo folder to sort."
            instructions="or drag & drop your folder here."
            actionButtonText="Browse folder"
            onFolderSelected={(folder) => setSourceFolder(folder)}
            isFolderValid={sourceFolder ? true : false}
            selectedFolder={sourceFolder}
          />
          <FileSelector
            title="Export your photos"
            subtitle="Select a folder for exporting your sorted photos."
            instructions="or drag & drop your folder here."
            actionButtonText="Browse folder"
            onFolderSelected={(folder) => setDestinationFolder(folder)}
            isFolderValid={destinationFolder ? true : false}
            selectedFolder={destinationFolder}
          />
        </div>

        <button
          className="button bg-primary sorting-tool__sort-button"
          onClick={() => handleSort()}
        >
          Sort
        </button>
      </section>
    </main>
  );
};

export default SortingToolPage;
