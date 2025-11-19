import * as React from "react";
import * as yup from "yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schedule } from "@mui/icons-material";

const schema = yup.object({
  fristName: yup.string().required(),
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
    <div>
      register
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <input {...register("fristName")} placeholder="First Name" />
        <p>{errors.fristName?.message}</p>
        <input {...register("lastName")} placeholder="Last Name" />
        <p>{errors.lastName?.message}</p>
        <input {...register("email")} placeholder="Email" />
        <p>{errors.email?.message}</p>
        <input {...register("phone")} placeholder="Phone" />
        <p>{errors.phone?.message}</p>
        <select {...register("role")} defaultValue="Buyer">
          <option value="" disabled>
            Select role
          </option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <p>{errors.role?.message}</p>

        <input {...register("password")} placeholder="Password" />
        <p>{errors.password?.message}</p>
        <input {...register("confirmPassword")} placeholder="Password" />
        <p>{errors.confirmPassword?.message}</p>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Register;
