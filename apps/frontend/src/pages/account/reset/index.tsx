import {
  Box,
  Container,
  Typography,
  Alert,
  TextField,
  Button,
} from "@mui/material";
import { useResetController } from "./useResetController";

export const Reset = () => {
  const {
    register,
    handleSubmit,
    errors,
    successMessage,
    backendError,
    serverError,
    onSubmit,
  } = useResetController();
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          p: 2,
          // backgroundImage: `url(${loginBG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container maxWidth="sm">
          <Box
            component="section"
            sx={{
              p: 5,
              pt: 2,
              border: "0px solid grey",
              width: 350,
              margin: "0 auto",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              mt: 5,
              boxShadow: 9,
              borderRadius: 2,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Reset Password
            </Typography>

            <br />
            <Typography variant="body1">Enter New Password</Typography>
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <br />
              <br />
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                type="password"
                label="Confirm Password"
                variant="outlined"
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
              <br />
              <br />
              {successMessage && (
                <>
                  <Alert severity="success">{successMessage}</Alert>
                  <br />
                </>
              )}
              {backendError && (
                <>
                  <Alert severity="error">{backendError}</Alert>
                  <br />
                </>
              )}
              {serverError && (
                <>
                  <Alert severity="error">{serverError}</Alert>
                  <br />
                </>
              )}
              <Button
                sx={{ width: "100%" }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Reset
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
    </>
  );
};
