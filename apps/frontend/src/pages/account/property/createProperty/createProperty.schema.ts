import * as yup from "yup";

export const propertySchema = yup.object({
  // Step 1
  title: yup.string().required("Title is required"),
  purpose: yup.string().required("Purpose is required"),
  price: yup
    .number()
    .typeError("Price is required")
    .required("Price is required")
    .min(0, "Price cannot be negative"),
  propertyType: yup.string().required("Property type is required"),
  bedrooms: yup
    .number()
    .typeError("Number of bedrooms required")
    .required("Number of bedrooms required")
    .min(0, "Please enter a valid number (must be positive)"),
  bathrooms: yup
    .number()
    .typeError("Number of bathrooms required")
    .required("Number of bathrooms required")
    .min(0, "Please enter a valid number (must be positive)"),
  utilities: yup
    .string()
    .required("Please select none if utilities are not included"),

  // Step 2
  description: yup
    .string()

    .required("Please enter property description (min 10 characters)")
    .min(10, "Description  must be at least 10 characters"),
  address: yup.string().required("Please enter property address"),
  city: yup.string().required("Please select city").trim(),
  images: yup.array().of(yup.mixed<File>().required("Image is required")),

  // Step 3
  email: yup.string().email().required("Please enter a valid email"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10,15}$/, "Phone number must be between 10 and 15 digits"),
});
