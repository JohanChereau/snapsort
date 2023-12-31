import folderIcon from '@/assets/icons/folder.svg';
import browseFolderIcon from '@/assets/icons/browse-folder.svg';
import checkIcon from '@/assets/icons/check.svg';
import './FileSelector.scss';

type FileSelectorProps = {
  title?: string;
  subtitle?: string;
  instructions?: string;
  actionButtonText?: string;
  onFolderSelected?: (folder: string) => void;
  isFolderValid: boolean;
  selectedFolder: string | null;
};

const FileSelector = ({
  title,
  subtitle,
  instructions,
  actionButtonText,
  onFolderSelected,
  isFolderValid,
  selectedFolder,
}: FileSelectorProps) => {

  const handleBrowseClick = async () => {
    try {
      const result = await window.electron.dialog.showOpenDialog({
        properties:['openDirectory'],
      });

      if(!result.canceled && result.filePaths.length > 0) {
        const selectedFolder = result.filePaths[0];

        if(onFolderSelected) {
          onFolderSelected(selectedFolder);
        }
      }
    } catch(error) {
      console.error('An error has occurred while opening the dialog window.');
    }
  }

  return (
    <div className="file-selector-container">

      {
        isFolderValid && <img src={checkIcon} alt="Checked icon : the folder is valid" className='file-selector__checked-icon'/>
      }

      <h3 className="file-selector__title">{title || 'Title'}</h3>
      <p className="file-selector__subtitle darken-text">
        {subtitle || 'Subtitle'}
      </p>

      <div className="file-selector__drag-and-drop-area">
        <img
          src={folderIcon}
          alt="Folder icon"
          className="drag-and-drop-area__icon"
        />
        <button className="button bg-primary drag-and-drop-area__browse-button" onClick={() => handleBrowseClick()}>
          <img src={browseFolderIcon} alt="" className="button__icon" />
          <span className="button__text">
            {selectedFolder ? 'Modify folder' : (actionButtonText ? actionButtonText : 'Browse folder')}
          </span>
        </button>

        <p className="drag-and-drop-area__instructions darken-text">
          {instructions || 'or drag & drop your folder here.'}
        </p>
      </div>

      <p className="file-selector__selected-filepath">{selectedFolder || '...'}</p>
    </div>
  );
};

export default FileSelector;
