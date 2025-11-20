import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { TextField, Button, Typography } from "@mui/material";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import loginBG from "../../../public/loginbg.jpg";
import { LogInUser } from "../../api/auth";
import { useState } from "react";

type UserInput = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email().required("Please enter a valid email"),
  password: yup.string().required("Please enter password"),
});

const Login = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [backedError, setBackendError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<UserInput> = async (data) => {
    setBackendError(null);
    setServerError(null);
    setSuccessMessage(null);
    try {
      const respone = await LogInUser(data);
      console.log(respone);
      setSuccessMessage("Logged in successfully!");
    } catch (err: any) {
      console.log(err.response?.data?.message);
      if (err.response?.data?.message) {
        setBackendError(err.response?.data?.message);
      } else {
        setServerError("Something went wrong. Please try again");
      }
    }
  };

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
            <Typography variant="body1">
              Don't have an account? Register Here
            </Typography>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
