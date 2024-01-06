import { useState, useEffect } from 'react';
import './FileExtensionsModal.scss';
import { capitalize } from '@/utils/string/stringUtils';

interface FileExtensionsModalProps {
  open: boolean;
  onClose: () => void;
  defaultExtensions: string[];
  submitFileExtensions: (fileExtensions: string[]) => void;
}

const EXTENSIONS: { [key: string]: string[] } = {
  image: ['.jpg', '.png'],
  video: ['.mp4', '.mov'],
  text: ['.txt', '.pdf'],
};

const FileExtensionsModal = ({
  open,
  onClose,
  submitFileExtensions,
  defaultExtensions,
}: FileExtensionsModalProps) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedExtensions, setSelectedExtensions] =
    useState<string[]>(defaultExtensions);

  const handleSelectAllChange = () => {
    const allExtensions = Object.values(EXTENSIONS).flat();
    setSelectAll(!selectAll);
    setSelectedExtensions(selectAll ? [] : allExtensions);
  };

  const handleExtensionChange = (extension: string) => {
    const updatedSelectedExtensions = [...selectedExtensions];

    if (updatedSelectedExtensions.includes(extension)) {
      // Remove the extension if it exists
      updatedSelectedExtensions.splice(
        updatedSelectedExtensions.indexOf(extension),
        1
      );
    } else {
      // Add the extension if it doesn't exist
      updatedSelectedExtensions.push(extension);
    }

    setSelectedExtensions(updatedSelectedExtensions);
    setSelectAll(
      updatedSelectedExtensions.length ===
        Object.values(EXTENSIONS).flat().length
    );
  };

  const handleFileExtensionsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedExtensions.length) {
      submitFileExtensions(selectedExtensions);
      onClose();
    }
  };

  useEffect(() => {
    setSelectedExtensions(defaultExtensions);
  }, [defaultExtensions]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <dialog
        open={open}
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="modal__title">Select the file extensions to sort</h3>

        <span className="modal__close-button" onClick={onClose}>
          X
        </span>

        <form
          className="file-extensions__form"
          onSubmit={handleFileExtensionsSubmit}
        >
          <div className="file-extensions__select-all-action">
            <input
              type="checkbox"
              id="select-all"
              name="select-all"
              checked={selectAll}
              onChange={handleSelectAllChange}
            />
            <label htmlFor="select-all">Select All</label>
          </div>

          <ul className="file-extensions__list">
            {Object.keys(EXTENSIONS).map((key) => {
              return (
                <li key={key}>
                  <fieldset>
                    <legend>{capitalize(key)}</legend>
                    {EXTENSIONS[key].map((extension) => (
                      <div key={extension}>
                        <input
                          type="checkbox"
                          id={extension}
                          name={extension}
                          value={extension}
                          checked={selectedExtensions.includes(extension)}
                          onChange={() => handleExtensionChange(extension)}
                        />
                        <label htmlFor={extension}>{extension}</label>
                      </div>
                    ))}
                  </fieldset>
                </li>
              );
            })}
          </ul>

          <div className="file-extensions__form-actions">
            <button type="button" className="button bg-secondary">
              Reset
            </button>

            <button type="submit" className="button bg-primary">
              Save and close
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default FileExtensionsModal;
