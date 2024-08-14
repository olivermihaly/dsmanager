import { useEffect, useState } from "react";
import Torrent from "./Torrent";

export default function Torrents() {
  const [tasks, setTasks] = useState<any[]>([]);

  const fetchTasks = () => {
    chrome.runtime.sendMessage({ action: "getTasks" }, (response) => {
      if (response) {
        setTasks(response);
      } else {
      }
    });
  };

  useEffect(() => {
    fetchTasks();
    const intervalId = setInterval(fetchTasks, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <div>Shaaws download manager</div>
      {tasks.map((torrent) => {
        if (
          torrent.status === "downloading" ||
          torrent.status === "paused" ||
          torrent.status === "waiting"
        ) {
          return <Torrent torrent={torrent} key={torrent.id} />;
        }
        return null;
      })}
    </div>
  );
}
