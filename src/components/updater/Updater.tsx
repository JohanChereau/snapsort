import { useEffect, useState } from "react";
import ProgressInfos from "../progressInfos/ProgressInfos";
import { DownloadProgress } from "electron/types";
import "./Updater.scss";

const Updater = () => {
  const [updaterMessage, setUpdaterMessage] = useState<
    string | DownloadProgress
  >("...");

  const displayUpdater =
    (typeof updaterMessage === "string" &&
      updaterMessage === "checking-for-update") ||
    updaterMessage === "download-progress"
      ? "block"
      : "";

  useEffect(() => {
    window.electron.updater.addUpdaterMessageListener((_event, message) => {
      setUpdaterMessage(message);
    });

    return () => {
      window.electron.updater.removeUpdaterMessageListener();
    };
  }, []);

  return (
    <div className="updater__container" style={{ display: displayUpdater }}>
      <h3 className="updater__title">Snapsort update manager</h3>
      <div className="updater__status-container">
        {updaterMessage && typeof updaterMessage === "string" ? (
          <p className="updater__status">{updaterMessage || ""}</p>
        ) : (
          updaterMessage &&
          typeof updaterMessage === "object" && (
            <ProgressInfos
              progressOptions={{
                sortedIndex: updaterMessage?.transferred,
                total: updaterMessage?.total,
                path: `Speed : ${updaterMessage?.speed.toString()} Bps`,
              }}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Updater;
