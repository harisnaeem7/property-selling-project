import { TextField, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import loginBG from "../../../../public/loginbg.jpg";
import { useLoginController } from "./useLoginController";

const Login = () => {
  const {
    handleSubmit,
    register,
    errors,
    onSubmit,
    serverError,
    successMessage,
    backedError,
  } = useLoginController();

  return (
    <Box
      sx={{
        height: "100vh",
        p: 2,
        backgroundImage: `url(${loginBG})`,
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
            Login
          </Typography>

          <br />
          <Typography variant="h5">Welcome Back!</Typography>
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

            {backedError && (
              <>
                <Alert severity="error">{backedError}</Alert>
                <br />
              </>
            )}
            {serverError && (
              <>
                <Alert severity="error">{serverError}</Alert>
                <br />
              </>
            )}
            {successMessage && (
              <>
                <Alert severity="success">{successMessage}</Alert>
                <br />
              </>
            )}

            <Typography
              sx={{
                textAlign: "left",
                mt: "-15px",
                pl: "10px",
              }}
              variant="body2"
            >
              <NavLink to="forgot">forgot password?</NavLink>
            </Typography>
            <br />
            <Button
              sx={{ width: "100%" }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
            <br />
            <br />
            <Typography variant="body2">
              Don't have an account?{" "}
              <NavLink to="register">Register Here</NavLink>
            </Typography>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
