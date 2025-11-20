import * as yup from "yup";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {
  TextField,
  Typography,
  InputLabel,
  NativeSelect,
  Button,
} from "@mui/material";
import { RegisterUser } from "../../api/auth";

type RegisterFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: number;
  role?: string;
};

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),
  phone: yup.number(),
  role: yup.string(),
});

const Register = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role: "buyer",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setServerError(null);
    try {
      const respone = await RegisterUser(data);
      console.log(respone);
    } catch (err: any) {
      if (err.response?.data?.message) {
        setServerError(err.response.data.message);
      } else {
        setServerError("Something went wrong. Please try again.");
      }
      console.log(err.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="section"
        sx={{
          p: 5,
          pt: 2,
          border: "0px solid grey",
          width: 350,
          margin: "0 auto",
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

          <InputLabel
            sx={{ textAlign: "left" }}
            variant="standard"
            htmlFor="uncontrolled-native"
          >
            Role
          </InputLabel>
          <NativeSelect
            fullWidth
            {...register("role")}
            defaultValue="buyer"
            inputProps={{
              name: "role",
              id: "uncontrolled-native",
            }}
          >
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
  );
};

export default Register;
