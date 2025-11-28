import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import { useResetController } from "./useResetController";

const Reset = () => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    successMessage,
    backendError,
  } = useResetController();
  return (
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
          <Typography variant="body1">
            Enter Your Email to Reset Password
          </Typography>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              size="small"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
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
  );
};

export default Reset;
