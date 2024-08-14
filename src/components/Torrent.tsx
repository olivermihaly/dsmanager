import { useEffect, useRef, useState } from "react";
import { TorrentProps } from "../hooks/useData";
import { formatSize, formatSpeed } from "../utils/utils";
import styles from "./torrent.module.scss";
import { IconDelete } from "../shared/Icons";

export default function Torrent({ torrent }: { torrent: TorrentProps }) {
  const [remainingTime, setRemainingTime] = useState<string>("");
  const prevSizeRef = useRef<number>(
    torrent.additional.transfer.size_downloaded
  );
  const lastUpdateRef = useRef<number>(Date.now());

  const downloadedSize = torrent.additional.transfer.size_downloaded;
  const percentage = (downloadedSize / torrent.size) * 100;
  const totalSize = formatSize(torrent.size);
  const currentDownloadSize = formatSize(downloadedSize);
  const downloadSpeed = formatSpeed(torrent.additional.transfer.speed_download);

  useEffect(() => {
    const now = Date.now();
    const timeElapsed = (now - lastUpdateRef.current) / 1000;
    const currentSize = torrent.additional.transfer.size_downloaded;
    const sizeChange = currentSize - prevSizeRef.current;

    if (sizeChange > 0 && timeElapsed > 0) {
      const speed = sizeChange / timeElapsed;
      const remainingSize = torrent.size - currentSize;
      const estimatedTime = remainingSize / speed;

      const hours = Math.floor(estimatedTime / 3600);
      const minutes = Math.floor((estimatedTime % 3600) / 60);
      const seconds = Math.floor(estimatedTime % 60);

      setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
      prevSizeRef.current = currentSize;
    }

    lastUpdateRef.current = now;
  }, [torrent.size, torrent.additional.transfer.size_downloaded]);

  async function onPauseResume(
    id: string,
    status:
      | "error"
      | "paused"
      | "downloading"
      | "seeding"
      | "completed"
      | "waiting"
  ) {
    const method = status === "paused" ? "resume" : "pause";
    const url = `/api/webapi/DownloadStation/task.cgi?api=SYNO.DownloadStation.Task&version=3&method=${method}&id=${id}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (response.ok) {
        // refetch();
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err: any) {
      console.error(err);
    }
  }

  async function onDelete(id: string) {
    const url = `/api/webapi/DownloadStation/task.cgi?api=SYNO.DownloadStation.Task&version=3&method=delete&id=${id}&force_complete=true`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (response.ok) {
        // refetch();
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err: any) {
      console.error(err);
    }
  }

  return (
    <div className={styles.torrentContainer}>
      <div className={styles.torrentTitle}>{torrent.title}</div>
      <div style={{ display: "flex" }}>
        <div className={styles.torrentSubtext}>{percentage.toFixed(2)}%</div>
        <div className={styles.torrentSubtext} style={{ marginLeft: 20 }}>
          {currentDownloadSize}/{totalSize}
        </div>
        <div className={styles.torrentSubtext} style={{ marginLeft: 20 }}>
          Download Speed: {downloadSpeed}
        </div>
        <div className={styles.torrentSubtext} style={{ marginLeft: 20 }}>
          Time Remaining: {remainingTime}
        </div>
        <button onClick={() => onPauseResume(torrent.id, torrent.status)}>
          {torrent.status === "downloading" ? "Pause" : "Resume"}
        </button>
        <div onClick={() => onDelete(torrent.id)} className={styles.icon}>
          <IconDelete />
        </div>
      </div>
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}
