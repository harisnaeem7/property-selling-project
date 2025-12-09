import { Box, TextField } from "@mui/material";
import { usePropertyDetailController } from "./usePropertyDetailController";

export const PropertyDetail = () => {
  const { register, errors } = usePropertyDetailController();
  const fields = ["title", "price", "bedrooms", "bathrooms"];

  return (
    <Box maxWidth="sm" margin="0 auto" textAlign="left">
      <br></br>
      <br></br>
      {fields.map((item) => {
        return (
          <TextField
            fullWidth
            sx={{ margin: "10px 0px" }}
            size="medium"
            id="outlined-basic"
            label={item}
            variant="outlined"
            {...register(`${item}`)}
            error={!!errors.item}
            //  helperText={errors.title?.message}
          />
        );
      })}
    </Box>
  );
};
