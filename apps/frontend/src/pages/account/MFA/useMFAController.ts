import { useState } from "react";
import { setupMFA, verifyMFA } from "../../../api/auth";

export const useMFAController = () => {
  const [qr, setQr] = useState<string>("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [success, setSuccess] = useState<string | null>("");
  const [error, setError] = useState<string | null>("");

  const handleSetup = async () => {
    setLoading(true);
    try {
      const res = await setupMFA();
      setQr(res.qrCode);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleVerify = async () => {
    setSuccess(null);
    setError(null);
    setVerifying(true);
    try {
      await verifyMFA(otp);
      setSuccess("MFA Enabled Successfully!");
    } catch (err) {
      setError("Invalid code. Try again.");
      console.log(err);
    }
    setVerifying(false);
  };

  return {
    handleSetup,
    handleVerify,
    qr,
    otp,
    loading,
    verifying,
    setOtp,
    success,
    error,
  };
};
