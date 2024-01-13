import { useNavigate } from "react-router-dom";
import "./ErrorDisplay.scss";

interface ErrorDisplayProps {
  error: {
    name?: string;
    message?: string;
  } | null;
  resetErrorBoundary?: () => void;
}

const ErrorDisplay = ({ error, resetErrorBoundary }: ErrorDisplayProps) => {
  const navigateToHome = useNavigate();

  const handleTryAgain = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();

      // Navigate to home page
      navigateToHome("/");
    }
  };

  return (
    <div className="error__container">
      <p className="error__title">Something went wrong ...</p>
      <p className="error__name">{error?.name || "Name"}</p>
      <p className="error__message">{error?.message || "A message here"}</p>
      {resetErrorBoundary && (
        <button
          className="button primary-button bg-primary error__button"
          onClick={handleTryAgain}
        >
          Return to home page
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;
