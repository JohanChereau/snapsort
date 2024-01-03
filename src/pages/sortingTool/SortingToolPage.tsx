import { useState, useEffect } from 'react';
import './SortingToolPage.scss';
import FileSelector from 'components/fileSelector/FileSelector';
import { SortingProgress } from 'electron/types';
import ProgressInfos from 'components/progressInfos/ProgressInfos';
import HomeButton from '@/components/homeButton/HomeButton';

const SortingToolPage = () => {
  const [sourceFolder, setSourceFolder] = useState<string | null>(null);
  const [destinationFolder, setDestinationFolder] = useState<string | null>(null);

  const isReadyToSort: boolean = sourceFolder && destinationFolder ? true : false;

  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [sortProgress, setSortProgress] = useState<SortingProgress>({sortedIndex: 0, total: 0, path: ''});
  const [sortError, setSortError] = useState<Error | null>(null);

  async function handleSort() {
    try {
      if (sourceFolder && destinationFolder) {
        setIsSorting(true);
        await window.electron.performSort({
          sourceFolder,
          destinationFolder,
          fileExtensions: ['.jpg', '.png', '.JPG', '.PNG'],
        });
      } else {
        console.error('Source folder or export folder is not selected.');
      }
    } catch (error) {
      console.error('Error during sorting:', error);
      // Gérez les erreurs ici.
    }
  }

  useEffect(() => {
    window.electron.sortProgress.addSortProgressListener((_event, progress) => {
      setSortProgress(progress);
    });

    window.electron.sortError.addSortErrorListener((_event, error) => {
      setSortError(error);
    })
  
    return () => {
      window.electron.sortProgress.removeSortProgressListener();
      window.electron.sortError.removeSortErrorListener();
    }
  }, [])
  

  return (
    <main>
      <section className="sorting-tool-section">

        <HomeButton />

        <div className="file-selectors container">
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
          disabled={!isReadyToSort}
        >
          Sort
        </button>

        {isSorting && <ProgressInfos progressOptions={sortProgress}/>}
        
        {sortError && <div className="progress-error container">
          <h3 className='progress-error__name'>An error has occurred. Please try again.</h3>
          <p className="progress-error__message">{sortError.name} : {sortError.message}</p>
        </div>}

      </section>
    </main>
  );
};

export default SortingToolPage;
