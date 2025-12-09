import { useFormContext } from "react-hook-form";

export const usePropertyDetailController = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return { register, errors };
};
