import "./App.css";
import { useLogin } from "./hooks/useLogin";
import Torrents from "./components/Torrents";

function App() {
  const { loginData, loading } = useLogin();

  if (loading) {
    return <div>Logging in...</div>;
  }

  if (loginData?.error) {
    return <div>Error</div>;
  }

  if (loginData?.success) {
    return <Torrents />;
  }
  return null;
}

export default App;
