import { useState, useEffect } from "react";

export function useLogin() {
  const [loginData, setLoginData] = useState<any>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "login" }, (response) => {
      setLoading(false);
      if (response.success) {
        setLoginData(response.data);
      } else {
        setError(response.error);
      }
    });
  }, []);

  return { loginData, error, loading };
}
