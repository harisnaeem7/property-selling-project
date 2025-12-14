import { Box, TextField } from "@mui/material";
import { useContactDetailsController } from "./useContactDetailsController";

export const ContactDetails = () => {
  const { fields, register, errors, customField } =
    useContactDetailsController();
  return (
    <Box maxWidth="sm" margin="0 auto" textAlign="left">
      <br></br>
      <Box>
        {fields.map((item) => {
          return (
            <TextField
              fullWidth
              sx={{ margin: "10px 0" }}
              size="medium"
              label={item}
              type={customField.includes(item) ? "tel" : "text"}
              variant="outlined"
              {...register(item)}
              error={!!errors[item]}
              inputProps={{
                inputMode: customField.includes(item) ? "numeric" : "text",
              }}
              helperText={errors[item]?.message as string}
            />
          );
        })}
      </Box>
      <br></br>
      <br></br>
    </Box>
  );
};
