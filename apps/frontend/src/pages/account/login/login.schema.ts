import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email().required("Please enter a valid email"),
  password: yup.string().required("Please enter password"),
});
