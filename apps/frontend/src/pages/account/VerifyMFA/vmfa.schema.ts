import * as yup from "yup";

export const Schema = yup.object({
  code: yup
    .string()
    .required("Please enter a valid 6-digit code")
    .matches(/^\d{6}$/, "Code must be exactly 6 digits"),
});
