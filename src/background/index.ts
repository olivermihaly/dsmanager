const apiUrl =
  "http://192.168.0.65:5000/webapi/DownloadStation/task.cgi?api=SYNO.DownloadStation.Task&version=3&method=list&additional=detail,transfer";

// Function to login and store session ID
async function login() {
  const url =
    "http://192.168.0.65:5000/webapi/auth.cgi?api=SYNO.API.Auth&version=3&method=login&account=shaaw&passwd=3LBgZtHJ&session=DownloadStation&format=sid";

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

    if (result.success) {
      console.log("Login successful:", result.data);
      // Store the session ID
      await chrome.storage.local.set({ sid: result.data.sid });
      return { success: true, data: result.data };
    } else {
      console.error("Login failed:", result);
      return {
        success: false,
        error: result.error || { code: 0, message: "Unknown error" },
      };
    }
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, error: { code: 0, message: "err.message" } };
  }
}

// Function to fetch data and store it
async function fetchData() {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const tasks = result.data.tasks;

    // Store the fetched data in chrome.storage
    await chrome.storage.local.set({ tasks });

    console.log("Data fetched and stored:", tasks);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

// Function to start periodic data fetching
function startFetchingData() {
  fetchData(); // Initial fetch
  const intervalId = setInterval(fetchData, 5000); // Fetch every 5 seconds

  // Clear interval when background script is unloaded
  chrome.runtime.onSuspend.addListener(() => {
    clearInterval(intervalId);
  });
}

// Initialize fetching data on startup and installation
chrome.runtime.onStartup.addListener(startFetchingData);
chrome.runtime.onInstalled.addListener(startFetchingData);

// Consolidate message listeners into one
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.action === "login") {
    login().then((result) => {
      sendResponse(result);
    });
    return true; // Keep the message channel open for async response
  } else if (message.action === "getTasks") {
    chrome.storage.local.get("tasks", (result) => {
      sendResponse(result.tasks || []);
    });
    return true; // Keep the message channel open for async response
  }
});
