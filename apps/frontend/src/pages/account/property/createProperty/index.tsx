import { useForm, FormProvider } from "react-hook-form";
import HorizontalLinearStepper from "./stepper";
import { Box, Container } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { propertySchema } from "./createProperty.schema";

export const CreateProperty = () => {
  const methods = useForm({
    resolver: yupResolver(propertySchema),
    defaultValues: {
      title: "",
      purpose: "sell",
      address: "",
      city: "calgary",
      description: "",
      images: [""],
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
