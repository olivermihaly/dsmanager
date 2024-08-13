import { useData } from "../hooks/useData";
import Torrent from "./Torrent";

export default function Torrents() {
  const { data, loading, error, refetch } = useData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <div>Shaaws download manager</div>
      {data.map((torrent) => {
        if (torrent.status === "downloading" || torrent.status === "paused" || torrent.status === "waiting") {
          return <Torrent torrent={torrent} key={torrent.id} refetch={refetch} />;
        }
        return null;
      })}
    </div>
  );
}
