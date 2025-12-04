import {
  Box,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import { useMFAController } from "./useMFAController";

export const MFASetup = () => {
  const {
    handleSetup,
    handleVerify,
    handleSubmit,
    qr,
    verifying,
    loading,
    success,
    error,
    errors,
    register,
  } = useMFAController();
  return (
    <form onSubmit={handleSubmit(handleVerify)}>
      <Box sx={{ mt: { xs: 5, sm: 15 } }}>
        <Grid
          container
          sx={{ justifyContent: "center", alignItems: "center" }}
          spacing={{ xs: 4, md: 6 }}
          columns={{ xs: 2, sm: 2, md: 2 }}
        >
          <Box sx={{ width: { xs: 300, sm: 400 }, textAlign: "center" }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Setup Two-Factor Authentication
            </Typography>
            {!qr ? (
              <Button
                variant="contained"
                onClick={handleSetup}
                disabled={loading}
              >
                {loading ? <CircularProgress size={22} /> : "Generate QR Code"}
              </Button>
            ) : (
              <>
                <Typography sx={{ mb: 2 }}>
                  Scan this QR code using Google Authenticator:
                </Typography>

                <TextField
                  fullWidth
                  label="Enter 6-digit code"
                  {...register("code")}
                  error={!!errors.code}
                  helperText={errors.code?.message}
                  sx={{ mb: 2 }}
                />
                {error && (
                  <>
                    {" "}
                    <Alert severity="error">{error}</Alert> <br />
                  </>
                )}
                {success && (
                  <>
                    {" "}
                    <Alert severity="success">{success}</Alert> <br />
                  </>
                )}
                <Button
                  variant="contained"
                  fullWidth
                  //onClick={handleVerify}
                  type="submit"
                  // disabled={verifying}
                >
                  {verifying ? (
                    <CircularProgress size={22} />
                  ) : (
                    "Verify & Enable"
                  )}
                </Button>
              </>
            )}
          </Box>
          {qr ? (
            <Box>
              <img
                src={qr}
                alt="QR Code"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  marginBottom: "20px",
                }}
              />
            </Box>
          ) : null}
        </Grid>
      </Box>
    </form>
  );
};
