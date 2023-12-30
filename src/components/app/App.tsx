import { RouterProvider, createHashRouter } from 'react-router-dom';
import HomePage from '@/pages/home/HomePage';
import SortingToolPage from '@/pages/sortingTool/SortingToolPage';
import Header from 'components/header/Header';

const router = createHashRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/sorting-tool',
    element: <SortingToolPage />
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
