import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import { AuthContext } from "../../../context/AuthContext";

export const useMFAVerifyController = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔥 Redirect away if tempToken missing
  useEffect(() => {
    const tempToken = localStorage.getItem("tempToken");
    if (!tempToken) {
      navigate("/account", { replace: true });
    }
  }, [navigate]);

  const handleVerify = async () => {
    setError("");

    // ⚡ Always read latest value here
    const tempToken = localStorage.getItem("tempToken");

    if (!tempToken) {
      setError("Your MFA session has expired. Please login again.");
      navigate("/account", { replace: true });
      return;
    }

    if (!code || code.length !== 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post(
        "/auth/mfa/verify-login",
        { token: code },
        {
          headers: { Authorization: `Bearer ${tempToken}` },
        }
      );

      // 🎉 Success
      localStorage.setItem("token", res.data.token);
      localStorage.removeItem("tempToken");
      auth?.login(res.data.token, res.data.email);

      navigate("/user/profile", { replace: true });
    } catch (err: any) {
      const message = err.response?.data?.message || "Invalid MFA code";

      // 🔥 Handle expired tempToken
      if (
        message === "TEMP_TOKEN_EXPIRED" ||
        message === "Invalid temp token" ||
        err.response?.status === 401
      ) {
        localStorage.removeItem("tempToken");
        return navigate("/account", { replace: true });
      }

      setError(message);
    }

    setLoading(false);
  };

  return { code, error, setCode, loading, handleVerify };
};
