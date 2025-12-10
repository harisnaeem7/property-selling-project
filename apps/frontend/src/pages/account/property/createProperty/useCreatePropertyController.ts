import { useFormContext } from "react-hook-form";

export const useCreatePropertyController = () => {
  const { handleSubmit, trigger } = useFormContext();

  const onSubmit = (data: object) => {
    return console.log("data", data);
  };

  return { handleSubmit, onSubmit, trigger };
};
