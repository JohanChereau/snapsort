import { contextBridge, ipcRenderer } from "electron";
import {
  isFolder,
  showOpenDialog,
  showPathInFileExplorer,
} from "./preload-scripts/file";
import { getVersion } from "./preload-scripts/application";
import {
  performAnalyze,
  addAnalyzeProgressListener,
  removeAnalyzeProgressListener,
  addAnalyzeErrorListener,
  removeAnalyzeErrorListener,
} from "./preload-scripts/coreFeatures/analyzing/analyzing";
import {
  performSort,
  addSortProgressListener,
  removeSortProgressListener,
  addSortErrorListener,
  removeSortErrorListener,
} from "./preload-scripts/coreFeatures/sorting/sorting";
import {
  getFileExtensionsPreferences,
  setFileExtensionsPreferences,
  getCustomMonthsPreferences,
  setCustomMonthsPreferences,
} from "./settings";
import {
  addUpdaterMessageListener,
  removeUpdaterMessageListener,
} from "./preload-scripts/updater";

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: withPrototype(ipcRenderer),
  dialog: { showOpenDialog, showPathInFileExplorer },
  file: { isFolder },
  updater: { addUpdaterMessageListener, removeUpdaterMessageListener },
  performSort: performSort,
  performAnalyze: performAnalyze,
  sortProgress: { addSortProgressListener, removeSortProgressListener },
  analyzeProgress: {
    addAnalyzeProgressListener,
    removeAnalyzeProgressListener,
  },
  sortError: { addSortErrorListener, removeSortErrorListener },
  analyzeError: { addAnalyzeErrorListener, removeAnalyzeErrorListener },
  application: { getVersion },
  preferences: {
    getFileExtensionsPreferences,
    setFileExtensionsPreferences,
    getCustomMonthsPreferences,
    setCustomMonthsPreferences,
  },
});

// `exposeInMainWorld` can't detect attributes and methods of `prototype`, manually patching it.
function withPrototype(obj: Record<string, any>) {
  const protos = Object.getPrototypeOf(obj);

  for (const [key, value] of Object.entries(protos)) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) continue;

    if (typeof value === "function") {
      // Some native APIs, like `NodeJS.EventEmitter['on']`, don't work in the Renderer process. Wrapping them into a function.
      obj[key] = function (...args: any) {
        return value.call(obj, ...args);
      };
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

// --------- Preload scripts loading ---------
function domReady(
  condition: DocumentReadyState[] = ["complete", "interactive"]
) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener("readystatechange", () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find((e) => e === child)) {
      parent.appendChild(child);
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find((e) => e === child)) {
      parent.removeChild(child);
    }
  },
};

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
  const className = `loaders-css__logo-spin`;
  const styleContent = `
@keyframes logo-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.${className} > img {
  animation: logo-spin 2s linear infinite;
  width: 100px;
  height: 100px;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: hsl(252, 100%, 3%);
  z-index: 9;
}
    `;
  const oStyle = document.createElement("style");
  const oDiv = document.createElement("div");

  oStyle.id = "app-loading-style";
  oStyle.innerHTML = styleContent;
  oDiv.className = "app-loading-wrap";
  oDiv.innerHTML = `<div class="${className}"><img src="/Snapsort.png" alt="Snapsort logo"></div>`;

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle);
      safeDOM.remove(document.body, oDiv);
    },
  };
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);

window.onmessage = (ev) => {
  ev.data.payload === "removeLoading" && removeLoading();
};

setTimeout(removeLoading, 4999);

declare global {
  interface Window {
    electron: {
      ipcRenderer: typeof ipcRenderer;
      dialog: {
        showOpenDialog: typeof showOpenDialog;
        showPathInFileExplorer: typeof showPathInFileExplorer;
      };
      performSort: typeof performSort;
      performAnalyze: typeof performAnalyze;
      sortProgress: {
        addSortProgressListener: typeof addSortProgressListener;
        removeSortProgressListener: typeof removeSortProgressListener;
      };
      analyzeProgress: {
        addAnalyzeProgressListener: typeof addAnalyzeProgressListener;
        removeAnalyzeProgressListener: typeof removeAnalyzeProgressListener;
      };
      sortError: {
        addSortErrorListener: typeof addSortErrorListener;
        removeSortErrorListener: typeof removeSortErrorListener;
      };
      analyzeError: {
        addAnalyzeErrorListener: typeof addAnalyzeErrorListener;
        removeAnalyzeErrorListener: typeof removeAnalyzeErrorListener;
      };
      file: {
        isFolder: typeof isFolder;
      };
      updater: {
        addUpdaterMessageListener: typeof addUpdaterMessageListener;
        removeUpdaterMessageListener: typeof removeUpdaterMessageListener;
      };
      application: {
        getVersion: typeof getVersion;
      };
      preferences: {
        getFileExtensionsPreferences: typeof getFileExtensionsPreferences;
        setFileExtensionsPreferences: typeof setFileExtensionsPreferences;
        getCustomMonthsPreferences: typeof getCustomMonthsPreferences;
        setCustomMonthsPreferences: typeof setCustomMonthsPreferences;
      };
    };
  }
}
