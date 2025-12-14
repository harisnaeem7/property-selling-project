import { useFormContext } from "react-hook-form";

export const useContactDetailsController = () => {
  const fields = ["email", "phone"];
  const customField = ["phone"];
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return { fields, register, errors, customField };
};
