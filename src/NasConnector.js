import React, { useState } from "react";
import Item from "./Item";
const NasConnector = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const connectToNAS = async () => {
    const url = "/api/webapi/auth.cgi?api=SYNO.API.Auth&version=3&method=login&account=shaaw&passwd=3LBgZtHJ&session=DownloadStation&format=sid";

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

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    }
  };

  async function getData() {
    const url = "/api/webapi/DownloadStation/task.cgi?api=SYNO.DownloadStation.Task&version=3&method=list&additional=detail,file";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log(response.body);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.data.tasks);
      result.data.tasks.length && setData(result.data.tasks);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <button onClick={connectToNAS}>Connect to NAS</button>
      <button onClick={getData}>Get data</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data.map((item) => {
        if (item.status === "downloading") {
          return <Item item={item} />;
        }
        return null;
      })}
    </div>
  );
};

export default NasConnector;
