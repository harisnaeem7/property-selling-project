import {
  Box,
  Button,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useMFAController } from "./useMFAController";

export const MFASetup = () => {
  const { handleSetup, handleVerify, otp, setOtp, qr, verifying, loading } =
    useMFAController();
  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10, textAlign: "center" }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Setup Two-Factor Authentication
      </Typography>
      {!qr ? (
        <Button variant="contained" onClick={handleSetup} disabled={loading}>
          {loading ? <CircularProgress size={22} /> : "Generate QR Code"}
        </Button>
      ) : (
        <>
          <Typography sx={{ mb: 2 }}>
            Scan this QR code using Google Authenticator:
          </Typography>

          <img
            src={qr}
            alt="QR Code"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }}
          />

          <TextField
            fullWidth
            label="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            // inputProps={{ maxLength: 6 }}
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleVerify}
            disabled={verifying}
          >
            {verifying ? <CircularProgress size={22} /> : "Verify & Enable"}
          </Button>
        </>
      )}
    </Box>
  );
};
