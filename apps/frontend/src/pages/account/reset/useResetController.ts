import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { resetSchema } from "./reset.schema";
import { type UserInput } from "./reset.type";
import { type SubmitHandler } from "react-hook-form";
import { ResetPassword } from "../../../api/auth";

export const useResetController = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetSchema) });

  const onSubmit: SubmitHandler<UserInput> = async (data) => {
    setSuccessMessage(null);
    setBackendError(null);
    try {
      const response = await ResetPassword(data);
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
