import { RouterProvider, createHashRouter } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";
import SortingToolPage from "@/pages/sortingTool/SortingToolPage";
import Header from "components/header/Header";
import "../modals/Modal.scss";
import "./App.scss";
import AnalyzeToolPage from "@/pages/analyzeTool/AnalyzeToolPage";
import { ErrorBoundary } from "react-error-boundary";
import { fallbackRender } from "@/utils/errors/fallbackRender";
import Updater from "../updater/Updater";

const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/sorting-tool",
    element: (
      <ErrorBoundary fallbackRender={fallbackRender}>
        <SortingToolPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "/analyze-tool",
    element: (
      <ErrorBoundary fallbackRender={fallbackRender}>
        <AnalyzeToolPage />
      </ErrorBoundary>
    ),
  },
]);

function App() {
  return (
    <div className="app">
      <Header />
      <RouterProvider router={router} />
      <Updater />
    </div>
  );
}

export default App;
