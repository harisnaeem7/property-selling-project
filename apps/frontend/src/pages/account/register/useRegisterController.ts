import { yupResolver } from "@hookform/resolvers/yup";
import { type SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { schema } from "./register.schema";
import { useState } from "react";
import { RegisterUser, LogInUser } from "../../../api/auth";
import { type UserInput } from "./register.type";

export const useRegisterController = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<UserInput> = async (data) => {
    setServerError(null);
    setBackendError(null);
    setSuccessMessage(null);
    try {
      const respone = await RegisterUser(data);
      setSuccessMessage("Account created successfully!");
      const login = await LogInUser(data);
    } catch (err: any) {
      if (err.response?.data?.message) {
        setServerError(err.response.data.message);
      } else {
        setBackendError("Something went wrong. Please try again.");
      }
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    successMessage,
    serverError,
    backendError,
    onSubmit,
  };
};
