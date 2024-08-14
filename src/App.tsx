import "./App.css";
import Torrents from "./components/Torrents";
import { useEffect, useState } from "react";

function App() {
  //const { loginData, loading } = useLogin();
  //const [sajt, setSajt] = useState<string>("asd");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    chrome.runtime.sendMessage({ action: "login" }, (response) => {
      if (response.success) {
        setLoggedIn(true);
      } /* else {
        setLoggedIn(false);
      }*/
    });
  }, []);

  /*if (loading) {
    return <div>Logging in...</div>;
  }
*/

  if (loggedIn) {
    return <Torrents />;
  }
  return null;
}

export default App;
