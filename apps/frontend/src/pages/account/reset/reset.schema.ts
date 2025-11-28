import * as yup from "yup";

export const Schema = yup.object({
  password: yup
    .string()
    .required("Please enter password")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(
      /[@$!%*?&^#().,_-]/,
      "Must contain at least one special character (@$!%*?&^#().,_-)"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
