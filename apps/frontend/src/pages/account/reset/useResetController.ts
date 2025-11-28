import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Schema } from "./reset.schema";
import { type UserInput } from "./reset.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPassword } from "../../../api/auth";

export const useResetController = () => {
  const [backendError, setBackendError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(Schema) });

  const onSubmit: SubmitHandler<UserInput> = async (data) => {
    setBackendError(null);
    setSuccessMessage(null);
    setServerError(null);

    try {
      const response = await ResetPassword(data, token as string);
      console.log(response);
      console.log(token);
      setSuccessMessage(response?.message);
    } catch (err: any) {
      console.log(err);
      setBackendError(err.response.data.message);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    successMessage,
    backendError,
    serverError,
  };
};
