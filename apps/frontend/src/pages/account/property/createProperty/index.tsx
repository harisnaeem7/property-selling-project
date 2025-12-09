import { useForm, FormProvider } from "react-hook-form";
import HorizontalLinearStepper from "./stepper";
import { Box, Container } from "@mui/material";

export const CreateProperty = () => {
  const methods = useForm({
    defaultValues: {
      title: "",
      price: null,
      purpose: "sell",
      propertyType: "house",
      bedrooms: null,
      bathrooms: null,
      utilities: "",
      address: "",
      city: "",
      description: "",
      images: [""],
      status: "",
    },
  });
  return (
    <Container>
      <h1>Create Property</h1>
      <Box>
        <FormProvider {...methods}>
          <HorizontalLinearStepper />
        </FormProvider>
      </Box>
    </Container>
  );
};
