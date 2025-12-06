import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useMFAVerifyController } from "./useMFAVerifyController";

const MFAVerifyLogin = () => {
  const {
    error,
    errors,
    loading,
    handleInput,
    handleVerify,
    register,
    handleSubmit,
  } = useMFAVerifyController();

  return (
    <form onSubmit={handleSubmit(handleVerify)}>
      <Box
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: 10,
          p: 4,
          border: "1px solid #ccc",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" mb={2}>
          Verify MFA Code
        </Typography>

        <Typography variant="body2" mb={2}>
          Enter the 6-digit code from your Google Authenticator app.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Enter 6-digit code"
          {...register("code")}
          error={!!errors.code}
          helperText={errors.code?.message}
          type="text"
          inputMode="numeric"
          onChange={handleInput}
          inputProps={{ maxLength: 6 }}
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Code"}
        </Button>
      </Box>
    </form>
  );
};

export default MFAVerifyLogin;
