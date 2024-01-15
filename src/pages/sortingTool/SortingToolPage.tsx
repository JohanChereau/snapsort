import { useState, useEffect } from "react";
import "./SortingToolPage.scss";
import FileSelector from "components/fileSelector/FileSelector";
import { ProgressStatus } from "electron/types";
import ProgressInfos from "components/progressInfos/ProgressInfos";
import HomeButton from "@/components/homeButton/HomeButton";
import FileExtensionsModal from "@/components/modals/fileExtensions/FileExtensionsModal";
import { arraysAreEqual } from "@/utils/array/arrayUtils";
import CustomMonthsModal from "@/components/modals/customMonths/CustomMonthsModal";
import { ErrorBoundary } from "react-error-boundary";
import { fallbackRender } from "@/utils/errors/fallbackRender";

const SortingToolPage = () => {
  const [sourceFolder, setSourceFolder] = useState<string>("");
  const [destinationFolder, setDestinationFolder] = useState<string>("");
  const [fileExtensions, setFileExtensions] = useState<string[]>([]);
  const [customMonths, setCustomMonths] = useState<string[]>([]);

  const isReadyToSort: boolean = Boolean(
    sourceFolder &&
      destinationFolder &&
      sourceFolder !== destinationFolder &&
      !isSubdirectory(sourceFolder, destinationFolder) &&
      !isSubdirectory(destinationFolder, sourceFolder)
  );

  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [sortProgress, setSortProgress] = useState<ProgressStatus>({
    sortedIndex: 0,
    total: 0,
    path: "",
  });
  const [sortError, setSortError] = useState<Error | null>(null);

  //Modals
  const [openFileExtensionsModal, setOpenFileExtensionsModal] =
    useState<boolean>(false);
  const [openCustomMonthsModal, setOpenCustomMonthsModal] =
    useState<boolean>(false);

  function isSubdirectory(parent: string, dir: string): boolean {
    return dir.startsWith(parent);
  }

  async function handleSort() {
    try {
      if (sourceFolder && destinationFolder) {
        setIsSorting(true);
        await window.electron.performSort({
          sourceFolder,
          destinationFolder,
          fileExtensions: fileExtensions,
          monthNames: customMonths,
        });
      } else {
        console.error("Source folder or export folder is not selected.");
      }
    } catch (error) {
      console.error("Error during sorting:", error);
    }
  }

  const getFileExtensionsFromModal = (
    newModalFileExtensions: string[]
  ): void => {
    if (arraysAreEqual(newModalFileExtensions, fileExtensions)) return;

    //If the modal has modified the extensions, we save them
    setFileExtensions(newModalFileExtensions);
    saveFileExtensionsPreferences(newModalFileExtensions);
  };

  const getCustomMonthsFromModal = (newModalCustomMonths: string[]): void => {
    if (arraysAreEqual(newModalCustomMonths, customMonths)) return;

    //If the modal has modified the months, we save them
    setCustomMonths(newModalCustomMonths);
    saveCustomMonthsPreferences(newModalCustomMonths);
  };

  const getFileExtensionsPreferences = async (): Promise<void> => {
    const fileExtensions =
      await window.electron.preferences.getFileExtensionsPreferences();

    if (fileExtensions.length) {
      setFileExtensions(fileExtensions);
      console.log("Getting preferences : ", fileExtensions);
    }
  };

  const saveFileExtensionsPreferences = async (
    newFileExtensions: string[]
  ): Promise<void> => {
    if (newFileExtensions.length) {
      await window.electron.preferences.setFileExtensionsPreferences(
        newFileExtensions
      );
      console.log("Setting new preferences : ", newFileExtensions);
    }
  };

  const getCustomMonthsPreferences = async (): Promise<void> => {
    const customMonths =
      await window.electron.preferences.getCustomMonthsPreferences();

    if (customMonths.length) {
      setCustomMonths(customMonths);
      console.log("Getting preferences : ", customMonths);
    }
  };

  const saveCustomMonthsPreferences = async (
    newCustomMonths: string[]
  ): Promise<void> => {
    if (newCustomMonths.length) {
      await window.electron.preferences.setCustomMonthsPreferences(
        newCustomMonths
      );
      console.log("Setting new preferences : ", newCustomMonths);
    }
  };

  useEffect(() => {
    // Listeners
    window.electron.sortProgress.addSortProgressListener((_event, progress) => {
      setSortProgress(progress);
    });

    window.electron.sortError.addSortErrorListener((_event, error) => {
      setSortError(error);
    });

    // User preferences
    getFileExtensionsPreferences();
    getCustomMonthsPreferences();

    return () => {
      window.electron.sortProgress.removeSortProgressListener();
      window.electron.sortError.removeSortErrorListener();
    };
  }, []);

  return (
    <main>
      <section className="sorting-tool-section">
        <HomeButton />

        <div className="file-selectors container">
          <ErrorBoundary fallbackRender={fallbackRender}>
            <FileSelector
              title="Upload your photos"
              subtitle="Select your photo folder to sort."
              instructions="or drag & drop your folder here."
              actionButtonText="Browse folder"
              onFolderSelected={(folder) => setSourceFolder(folder)}
              isFolderValid={Boolean(
                sourceFolder && !isSubdirectory(destinationFolder, sourceFolder)
              )}
              selectedFolder={sourceFolder}
            />
          </ErrorBoundary>

          <ErrorBoundary fallbackRender={fallbackRender}>
            <FileSelector
              title="Export your photos"
              subtitle="Select a folder for exporting your sorted photos."
              instructions="or drag & drop your folder here."
              actionButtonText="Browse folder"
              onFolderSelected={(folder) => setDestinationFolder(folder)}
              isFolderValid={Boolean(
                destinationFolder &&
                  !isSubdirectory(sourceFolder, destinationFolder)
              )}
              selectedFolder={destinationFolder}
            />
          </ErrorBoundary>
        </div>

        {!isSorting && (
          <div className="sorting-tool__settings container">
            <div className="sorting-tool__setting">
              <button
                className="button sorting-tool__setting-button"
                onClick={() => setOpenFileExtensionsModal(true)}
              >{`File extensions (${fileExtensions.length})`}</button>
            </div>

            <div className="sorting-tool__setting">
              <button
                className="button sorting-tool__setting-button"
                onClick={() => setOpenCustomMonthsModal(true)}
              >
                Edit months
              </button>
            </div>
          </div>
        )}

        {!isSorting && (
          <button
            className="button bg-primary sorting-tool__sort-button"
            onClick={() => handleSort()}
            disabled={!isReadyToSort}
          >
            Sort
          </button>
        )}

        <ErrorBoundary fallbackRender={fallbackRender}>
          <FileExtensionsModal
            open={openFileExtensionsModal}
            onClose={() => setOpenFileExtensionsModal(false)}
            defaultExtensions={fileExtensions}
            submitFileExtensions={getFileExtensionsFromModal}
          />
        </ErrorBoundary>

        <ErrorBoundary fallbackRender={fallbackRender}>
          <CustomMonthsModal
            open={openCustomMonthsModal}
            onClose={() => setOpenCustomMonthsModal(false)}
            defaultMonths={customMonths}
            submitCustomMonths={getCustomMonthsFromModal}
          />
        </ErrorBoundary>

        {isSorting && <ProgressInfos progressOptions={sortProgress} />}

        {sortError && (
          <div className="progress-error container">
            <h3 className="progress-error__name">
              An error has occurred. Please try again.
            </h3>
            <p className="progress-error__message">
              {sortError.name} : {sortError.message}
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default SortingToolPage;
