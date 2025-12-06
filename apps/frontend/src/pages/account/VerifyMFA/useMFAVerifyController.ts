import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import { AuthContext } from "../../../context/AuthContext";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema } from "./vmfa.schema";
import type { UserInput } from "./input";

export const useMFAVerifyController = () => {
  //const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(Schema) });

  useEffect(() => {
    const tempToken = localStorage.getItem("tempToken");
    if (!tempToken) {
      navigate("/account", { replace: true });
    }
  }, [navigate]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, "").slice(0, 6);
    setValue("code", cleaned, { shouldValidate: true });
  };
  const handleVerify: SubmitHandler<UserInput> = async (code) => {
    console.log(code);
    setError(null);

    const tempToken = localStorage.getItem("tempToken");

    if (!tempToken) {
      setError("Your MFA session has expired. Please login again.");
      navigate("/account", { replace: true });
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/mfa/verify-login", code, {
        headers: { Authorization: `Bearer ${tempToken}` },
      });

      localStorage.setItem("token", res.data.token);
      localStorage.removeItem("tempToken");
      auth?.login(res.data.token, res.data.email);

      navigate("/user/profile", { replace: true });
    } catch (err: any) {
      const message = err.response?.data?.message || "Invalid MFA code";

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

  return {
    error,
    errors,
    handleInput,
    loading,
    handleVerify,
    register,
    handleSubmit,
  };
};
