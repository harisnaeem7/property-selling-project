import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import signupBG from "../../../../public/signup-bg.jpg";
import { TextField, Typography, NativeSelect, Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useRegisterController } from "./useRegisterController";

const Register = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    serverError,
    backendError,
    successMessage,
  } = useRegisterController();

  return (
    <Box
      sx={{
        height: "100vh",
        p: 2,
        backgroundImage: `url(${signupBG})`,
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
            Sign Up
          </Typography>
          <br />
          <Typography variant="body1">
            Please fill this form to create an account!
          </Typography>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  fullWidth
                  size="small"
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  {...register("firstName")}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  size="small"
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  {...register("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Grid>
            </Grid>

            <br />
            <TextField
              fullWidth
              size="small"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              {...register("email")}
              error={!!errors.email || !!serverError}
              helperText={errors.email?.message || serverError}
            />
            <br />
            <br />
            <TextField
              fullWidth
              size="small"
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              {...register("phone")}
            />
            <br />
            <br />

            <NativeSelect fullWidth {...register("role")}>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </NativeSelect>

            <br />
            <br />
            <TextField
              fullWidth
              size="small"
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
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
              label="Confirm Password"
              type="password"
              variant="outlined"
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
            <br />
            <br />
            {backendError && (
              <>
                <Alert severity="error">{backendError}</Alert>
                <br />
              </>
            )}
            {successMessage && (
              <>
                <Alert severity="success">{successMessage}</Alert>
                <br />
              </>
            )}

            <Button
              sx={{ width: "100%" }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
