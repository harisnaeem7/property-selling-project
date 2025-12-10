import { CANADA_CITIES } from "./cities";
import { useFormContext } from "react-hook-form";
import { styled } from "@mui/material/styles";

export const usePropertDescriptionController = () => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const cities = CANADA_CITIES;
  return { cities, register, errors, VisuallyHiddenInput };
};
