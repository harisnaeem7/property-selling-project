import { useState } from "react";

import { setupMFA, verifyMFA } from "../../../api/auth";
import { schema } from "./mfa.schema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { type UserInput } from "./input";

export const useMFAController = () => {
  const [qr, setQr] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [success, setSuccess] = useState<string | null>("");
  const [error, setError] = useState<string | null>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleSetup = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await setupMFA();
      setQr(res.qrCode);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleVerify: SubmitHandler<UserInput> = async (data) => {
    setSuccess(null);
    setError(null);
    setVerifying(true);

    try {
      await verifyMFA(data);
      setSuccess("MFA Enabled Successfully!");
    } catch (err) {
      setError("Invalid code. Try again.");
      console.log(err);
    } finally {
      setVerifying(false);
    }
  };

  return {
    handleSetup,
    handleVerify,
    handleSubmit,
    register,
    qr,
    loading,
    verifying,
    success,
    error,
    errors,
  };
};
