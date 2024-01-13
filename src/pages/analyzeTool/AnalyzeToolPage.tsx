import { useState, useEffect } from "react";
import HomeButton from "@/components/homeButton/HomeButton";
import FileSelector from "@/components/fileSelector/FileSelector";
import "./AnalyzeToolPage.scss";
import ProgressInfos from "@/components/progressInfos/ProgressInfos";
import { FileInfo, ProgressStatus } from "electron/types";
import { ErrorBoundary } from "react-error-boundary";
import { fallbackRender } from "@/utils/errors/fallbackRender";

const AnalyzeToolPage = () => {
  const [sourceFolder, setSourceFolder] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analyzeError, setAnalyzeError] = useState<Error | null>(null);
  const [analyseProgress, setAnalyseProgress] = useState<ProgressStatus>({
    sortedIndex: 0,
    total: 0,
    path: "",
  });
  const [analyzeResults, setAnalyzeResults] = useState<FileInfo[]>([]);

  async function handleAnalyze() {
    try {
      if (sourceFolder) {
        setIsAnalyzing(true);
        const results = await window.electron.performAnalyze({ sourceFolder });
        setAnalyzeResults(results);
      } else {
        console.error("Source folder is not selected.");
      }
    } catch (error) {
      console.error("Error during analyzing:", error);
    }
  }

  async function handleOpenInFileExplorer(path: string) {
    if (path) {
      await window.electron.dialog.showPathInFileExplorer(path);
    }
  }

  useEffect(() => {
    // Listeners
    window.electron.analyzeProgress.addAnalyzeProgressListener(
      (_event, progress) => {
        setAnalyseProgress(progress);
      }
    );

    window.electron.analyzeError.addAnalyzeErrorListener((_event, error) => {
      setAnalyzeError(error);
    });

    return () => {
      window.electron.analyzeProgress.removeAnalyzeProgressListener();
      window.electron.analyzeError.removeAnalyzeErrorListener();
    };
  }, []);

  return (
    <main>
      <section className="analyze-tool-section container">
        <HomeButton />

        <ErrorBoundary fallbackRender={fallbackRender}>
          <FileSelector
            title="Select your folder"
            subtitle="Select the folder to be analyzed"
            instructions="or drag & drop your folder here."
            actionButtonText="Browse folder"
            onFolderSelected={(folder) => setSourceFolder(folder)}
            isFolderValid={sourceFolder ? true : false}
            selectedFolder={sourceFolder}
          />
        </ErrorBoundary>

        <button
          className="button bg-primary analyze-tool__sort-button"
          onClick={handleAnalyze}
          disabled={!sourceFolder}
        >
          Analyze
        </button>

        {isAnalyzing && <ProgressInfos progressOptions={analyseProgress} />}

        {analyzeError && (
          <div className="progress-error container">
            <h3 className="progress-error__name">
              An error has occurred. Please try again.
            </h3>
            <p className="progress-error__message">
              {analyzeError.name} : {analyzeError.message}
            </p>
          </div>
        )}

        {analyzeResults?.length !== 0 && isAnalyzing && (
          <div className="progress-error container">
            <h3 className="progress-error__name">
              Scanning results: ({analyzeResults.length})
            </h3>
            <p className="progress-error__message">
              List of files found to be incorrectly sorted :
            </p>
            <ul className="analyze-results__list">
              {analyzeResults.map((file, index) => {
                return (
                  <li
                    className="analyze-results__item"
                    key={index}
                    onClick={() => handleOpenInFileExplorer(file.path)}
                  >
                    {
                      <>
                        <img src={`file://${file.path}`} alt="" />
                        <p>{file.name}</p>
                      </>
                    }
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {analyzeResults.length === 0 && isAnalyzing && (
          <div className="progress-error container">
            <h3 className="progress-error__name" style={{ color: "limegreen" }}>
              Scanning results: ({analyzeResults.length})
            </h3>
            <p className="progress-error__message">Everything is in order ✔️</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default AnalyzeToolPage;
