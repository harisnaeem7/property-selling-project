import { useFormContext } from "react-hook-form";

export const useCreatePropertyController = () => {
  const { handleSubmit } = useFormContext();

  const onSubmit = () => {
    return;
  };

  return { handleSubmit, onSubmit };
};
