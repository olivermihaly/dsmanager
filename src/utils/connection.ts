export async function connect() {
  const url = "/api/webapi/auth.cgi?api=SYNO.API.Auth&version=3&method=login&account=shaaw&passwd=3LBgZtHJ&session=DownloadStation&format=sid";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function getData() {
  const url = "/api/webapi/DownloadStation/task.cgi?api=SYNO.DownloadStation.Task&version=3&method=list&additional=detail,file";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result.data.tasks);
    return result.data.tasks;
  } catch (err) {
    return err;
  }
}
