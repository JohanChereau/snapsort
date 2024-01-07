import { RouterProvider, createHashRouter } from 'react-router-dom';
import HomePage from '@/pages/home/HomePage';
import SortingToolPage from '@/pages/sortingTool/SortingToolPage';
import Header from 'components/header/Header';
import '../modals/Modal.scss';
import './App.scss';
import AnalyzeToolPage from '@/pages/analyzeTool/AnalyzeToolPage';

const router = createHashRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/sorting-tool',
    element: <SortingToolPage />
  },
  {
    path: '/analyze-tool',
    element: <AnalyzeToolPage />
  }
]);

function App() {

  return (
    <div className="app">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
