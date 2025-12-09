import { useForm, FormProvider } from "react-hook-form";
import HorizontalLinearStepper from "./stepper";
import { Box, Container } from "@mui/material";

export const CreateProperty = () => {
  const methods = useForm({
    defaultValues: {
      title: "",
      price: 0,
      purpose: "",
      propertyType: "",
      bedrooms: 0,
      bathrooms: 0,
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
