import { useState, useEffect } from "react";

interface LoginResponse {
  success: boolean;
  data: {
    sid: string;
  };
  error?: {
    code: number;
    message: string;
  };
}

interface LoginError {
  code: number;
  message: string;
}

export function useLogin() {
  const [loginData, setLoginData] = useState<LoginResponse | null>(null);
  const [error, setError] = useState<LoginError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function login() {
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

        const result: LoginResponse = await response.json();
        if (result.success) {
          setLoginData(result);
        } else {
          setError(result.error || { code: 0, message: "Unknown error" });
        }
      } catch (err: any) {
        setError({ code: 0, message: err.message });
      } finally {
        setLoading(false);
      }
    }

    login();
  }, []);

  return { loginData, error, loading };
}
