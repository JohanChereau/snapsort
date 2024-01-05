import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/app/App';
import { IconContext } from 'react-icons';
import AppInfoProvider from './contexts/AppInfoContext';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IconContext.Provider
      value={{ className: 'react-icon', style: { verticalAlign: 'middle' } }}
    >
      <AppInfoProvider>
        <App />
      </AppInfoProvider>
      
    </IconContext.Provider>
  </React.StrictMode>
);

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*');

// Use contextBridge
window.electron.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message);
});
