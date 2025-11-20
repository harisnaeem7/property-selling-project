import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import {
  TextField,
  Typography,
  InputLabel,
  NativeSelect,
  Button,
} from "@mui/material";

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
  phone: yup.number(),
  role: yup.string(),
});

const Register = () => {
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
  //const onSubmit = (data) => console.log(data);
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
        <form onSubmit={handleSubmit((data) => console.log(data))}>
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
          <br />
          <br />
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
          <br />
          <br />
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
