import * as yup from "yup";

export const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required."),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(
      /[@$!%*?&^#().,_-]/,
      "Must contain at least one special character (@$!%*?&^#().,_-)"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confrim password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  phone: yup.number(),
  role: yup.string(),
});
