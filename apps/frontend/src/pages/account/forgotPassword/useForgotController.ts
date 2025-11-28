import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { forgotSchema } from "./forgot.schema";
import { type UserInput } from "./forgot.type";
import { type SubmitHandler } from "react-hook-form";
import { ForgotPassword } from "../../../api/auth";

export const useForgotController = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotSchema) });

  const onSubmit: SubmitHandler<UserInput> = async (data) => {
    setSuccessMessage(null);
    setBackendError(null);
    try {
      const response = await ForgotPassword(data);
      console.log(response);
      setSuccessMessage(response?.message);
    } catch (err: any) {
      if (err.response?.data?.message) {
        setBackendError(err.response?.data?.message);
      } else {
        setBackendError("Something went Wrong, Please try again");
      }
      console.log(err);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    successMessage,
    backendError,
  };
};
