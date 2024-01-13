import { useState, useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";
import "./CustomMonthsModal.scss";

interface CustomMonthsModalProps {
  open: boolean;
  onClose: () => void;
  defaultMonths: string[];
  submitCustomMonths: (customMonths: string[]) => void;
}

const CustomMonthsModal = ({
  open,
  onClose,
  defaultMonths,
  submitCustomMonths,
}: CustomMonthsModalProps) => {
  const [formCustomMonths, setFormCustomMonths] =
    useState<string[]>(defaultMonths);
  const [formError, setFormError] = useState<string | null>(null);

  const handleMonthChange = (index: number, value: string) => {
    const updatedMonths = [...formCustomMonths];
    updatedMonths[index] = value;
    setFormCustomMonths(updatedMonths);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Vérifier si tous les mois sont non vides
    if (formCustomMonths.some((month) => !month.trim())) {
      setFormError("All months must have a non-empty name.");
      return;
    }

    setFormError(null);

    // Appeler la fonction de soumission avec formCustomMonths
    submitCustomMonths(formCustomMonths);
    onClose(); // Fermer le modal après la soumission si nécessaire
  };

  useEffect(() => {
    if (defaultMonths) {
      setFormCustomMonths(defaultMonths);
    }
  }, [defaultMonths]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <dialog
        open={open}
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="modal__title">Change month names</h3>
        <span className="modal__close-button" onClick={onClose}>
          <IoCloseCircle />
        </span>

        <form className="custom-months__form" onSubmit={handleSubmit}>
          <ul className="custom-months__list">
            {formCustomMonths.map((month, index) => (
              <li
                className="custom-months__item"
                key={index}
                data-position={index + 1}
              >
                <div className="custom-months__inputs">
                  <label htmlFor={String(index)}>{`Month n° ${
                    index + 1
                  } :`}</label>
                  <input
                    type="text"
                    value={month}
                    maxLength={30}
                    minLength={1}
                    id={String(index)}
                    onChange={(e) => handleMonthChange(index, e.target.value)}
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="custom-months__form-actions">
            <button type="button" className="button bg-secondary">
              Reset
            </button>
            <button type="submit" className="button bg-primary">
              Save and close
            </button>
            {formError && (
              <p style={{ color: "var(--clr-accent-400)", marginLeft: "auto" }}>
                {formError}
              </p>
            )}
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default CustomMonthsModal;
