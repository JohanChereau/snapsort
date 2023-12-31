import { useState } from 'react';
import './SortingToolPage.scss';
import FileSelector from 'components/fileSelector/FileSelector';

const SortingToolPage = () => {

  const [sourceFolder, setSourceFolder] = useState<string | null>(null);
  const [exportFolder, setExportFolder] = useState<string | null>(null);

  console.log(sourceFolder);
  console.log(exportFolder);

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
            onFolderSelected={(folder) => setExportFolder(folder)}
            isFolderValid={exportFolder ? true : false}
            selectedFolder={exportFolder}
          />
        </div>

        <button className="button bg-primary sorting-tool__sort-button">
          Sort
        </button>
      </section>
    </main>
  );
};

export default SortingToolPage;
