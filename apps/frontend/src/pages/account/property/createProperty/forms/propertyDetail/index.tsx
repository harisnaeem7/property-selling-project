import { Box, Grid, TextField } from "@mui/material";
import { usePropertyDetailController } from "./usePropertyDetailController";

export const PropertyDetail = () => {
  const { register, errors } = usePropertyDetailController();
  return (
    <Box>
      <h1>Property details</h1>
      <Grid container spacing={2}>
        <Grid size={6}>
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="Title"
            variant="outlined"
            {...register("title")}
            error={!!errors.title}
            //  helperText={errors.title?.message}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            fullWidth
            size="small"
            placeholder="$"
            id="outlined-basic"
            label="Price"
            variant="outlined"
            {...register("price")}
            error={!!errors.price}
            //helperText={errors.price?.message}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
