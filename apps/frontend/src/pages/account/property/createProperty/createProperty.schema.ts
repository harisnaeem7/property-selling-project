import * as yup from "yup";

export const propertySchema = yup.object({
  // Step 1
  title: yup.string().required("Title is required"),
  purpose: yup.string().required("Purpose is required"),
  price: yup.string().required("Price is required"),
  propertyType: yup.string().required("Property type is required"),
  bedrooms: yup.string().required("Number of bedrooms required"),
  bathrooms: yup.string().required("Number of bathrooms required"),
  utilities: yup
    .string()
    .required("Please select none if utilities are not included"),

  // Step 2
  description: yup
    .string()
    .min(50)
    .required("Please enter property description (min 50 characters)"),
  address: yup.string().required(),
  city: yup.string().required(),
  images: yup.array().required(),

  // Step 3
  email: yup.string().required().email(),
  phone: yup.string().required(),
});
