import './FileSelector.scss';
import folderIcon from '@/assets/icons/folder.svg';
import browseFolderIcon from '@/assets/icons/browse-folder.svg';

type FileSelectorProps = {
  title?: string;
  subtitle?: string;
  instructions?: string;
  actionButtonText?: string;
};

const FileSelector = ({
  title,
  subtitle,
  instructions,
  actionButtonText,
}: FileSelectorProps) => {
  return (
    <div className="file-selector-container">
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
        <button className="button bg-primary drag-and-drop-area__browse-button">
          <img src={browseFolderIcon} alt="" className="button__icon" />
          <span className="button__text">
            {actionButtonText || 'Browse folder'}
          </span>
        </button>

        <p className="drag-and-drop-area__instructions darken-text">
          {instructions || 'or drag & drop your folder here.'}
        </p>
      </div>

      <p className="file-selector__selected-filepath">...</p>
    </div>
  );
};

export default FileSelector;
