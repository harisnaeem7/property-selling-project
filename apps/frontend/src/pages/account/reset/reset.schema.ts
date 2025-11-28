import * as yup from "yup";

export const resetSchema = yup.object({
  email: yup.string().email().required("Please enter a valid email"),
});
