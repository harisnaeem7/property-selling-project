import { Box, TextField } from "@mui/material";
import { useContactDetailsController } from "./useContactDetailsController";

export const ContactDetails = () => {
  const { fields, register, errors } = useContactDetailsController();
  return (
    <Box maxWidth="sm" margin="0 auto" textAlign="left">
      <br></br>
      <Box>
        {fields.map((item) => {
          return (
            <TextField
              fullWidth
              sx={{ margin: "10px 0px", textTransform: "capitalize" }}
              size="medium"
              id="outlined-basic"
              label={item}
              variant="outlined"
              {...register(`${item}`)}
              error={!!errors.item}
              helperText={errors.item?.message as string}
            />
          );
        })}
      </Box>
      <br></br>
      <br></br>
    </Box>
  );
};
