import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { type SubmitHandler } from "react-hook-form";

import { AuthContext } from "../../../context/AuthContext";
import { loginSchema } from "./login.schema";
import { LogInUser } from "../../../api/auth";
import { type UserInput } from "./login.type";

export const useLoginController = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [backedError, setBackendError] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit: SubmitHandler<UserInput> = async (data) => {
    setBackendError(null);
    setServerError(null);
    setSuccessMessage(null);
    try {
      const response = await LogInUser(data);
      console.log(response);

      if (response.mfaRequired) {
        localStorage.setItem("tempToken", response.tempToken);
        setSuccessMessage("MFA required. Please enter your 6-digit code.");
        navigate("/auth/mfa-verify", { replace: true });
        return;
      }

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", response.email);
      setSuccessMessage("Logged in successfully!");
      auth?.login(response.token, response.email);
      navigate("/user/profile", { replace: true });
    } catch (err: any) {
      console.log(err.response?.data?.message);
      if (err.response?.data?.message) {
        setBackendError(err.response?.data?.message);
      } else {
        setServerError("Something went wrong. Please try again");
      }
    }
  };
  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
    backedError,
    serverError,
    successMessage,
  };
};
