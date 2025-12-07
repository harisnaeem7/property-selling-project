// api.ts
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: `${API_URL}`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthHOC = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        if (err.response && err.response.status === 401) {
          console.log(err);
          localStorage.clear();
          navigate("/account");
        }
        if (err.response && err.response.status === 403) {
          setError("Haye ghurbat");
        }
        if (err.response && err.response.status === 404) {
          setError("Haye ghurbat tedi behn ku yahan");
        }
        return Promise.reject(err);
      }
    );
    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  const clearAlert = useCallback(() => {
    setError("");
  }, [error]);
  return error ? (
    <Alert severity="error" onClose={clearAlert}>
      {error}{" "}
    </Alert>
  ) : (
    <></>
  );
};

export default api;
