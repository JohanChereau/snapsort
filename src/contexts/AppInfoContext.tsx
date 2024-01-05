import { createContext, useContext, useState, useEffect } from 'react';

type AppInfoType = {
  name: string;
  version: string;
};

type AppInfoProviderProps = {
  children: React.ReactNode;
};

export const AppInfoContext = createContext<AppInfoType | null>(null);

export default function AppInfoProvider({ children }: AppInfoProviderProps) {
  const [appInfo, setAppInfos] = useState<AppInfoType | null>(null);

  const getAppInfos = async () => {
    const appName = 'Snapsort';
    const appVersion = await getAppVersion();

    const appInfos: AppInfoType = {
      name: appName,
      version: appVersion,
    };

    setAppInfos(appInfos);
  };

  const getAppVersion = async () => {
    const version = await window.electron.application.getVersion();

    if (!version) {
      return 'unknown';
    }

    return version;
  };

  useEffect(() => {
    getAppInfos();
  }, []);

  return (
    <AppInfoContext.Provider value={appInfo}>
      {children}
    </AppInfoContext.Provider>
  );
}

export function useAppInfoContext() {
  const context = useContext(AppInfoContext);

  if (!context) {
    throw new Error('useAppInfoContext must be used within a AppInfoProvider');
  }

  return context;
}
