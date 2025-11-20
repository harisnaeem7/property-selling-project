import * as yup from "yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { TextField, Select, MenuItem } from "@mui/material";

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
  } = useForm({ resolver: yupResolver(schema) });
  //const onSubmit = (data) => console.log(data);
  return (
    <Container maxWidth="sm">
      <Box component="section" sx={{ p: 2, border: "1px solid grey" }}>
        register
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <br />
          <Select {...register("role")} labelId="role-label" label="Role">
            <MenuItem value="buyer">Buyer</MenuItem>
            <MenuItem value="seller">Seller</MenuItem>
          </Select>
          <br />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <br />
          <input type="submit" />
        </form>
      </Box>
    </Container>
  );
};

export default Register;
