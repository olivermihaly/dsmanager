import { useState, useEffect } from "react";

interface File {
  filename: string;
  index: number;
  priority: "low" | "normal" | "high";
  size: number;
  size_downloaded: number;
  wanted: boolean;
}

interface AdditionalDetails {
  completed_time: number;
  connected_leechers: number;
  connected_peers: number;
  connected_seeders: number;
  create_time: number;
  destination: string;
  seedelapsed: number;
  started_time: number;
  total_peers: number;
  total_pieces: number;
  unzip_password: string;
  uri: string;
  waiting_seconds: number;
}

interface TransferProps {
  downloaded_pieces: number;
  size_downloaded: number;
  size_uploaded: number;
  speed_download: number;
  speed_upload: number;
}

export interface TorrentProps {
  id: string;
  size: number;
  status: "paused" | "downloading" | "seeding" | "completed" | "error" | "waiting";
  title: string;
  type: "bt" | "http" | "ftp" | "other";
  username: string;
  additional: { detail: AdditionalDetails; file: File[]; transfer: TransferProps };
}

interface DataResponse {
  data: {
    tasks: TorrentProps[];
  };
}

interface DataError {
  code: number;
  message: string;
}

export function useData() {
  const [data, setData] = useState<TorrentProps[]>([]);
  const [error, setError] = useState<DataError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchData() {
    const url = "/api/webapi/DownloadStation/task.cgi?api=SYNO.DownloadStation.Task&version=3&method=list&additional=detail,transfer";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: DataResponse = await response.json();
      setData(result.data.tasks);
    } catch (err: any) {
      setError({ code: 0, message: err.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function refetch() {
    fetchData();
  }

  return { data, error, loading, refetch };
}
