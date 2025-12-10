import { Box, TextField, NativeSelect, Grid, InputLabel } from "@mui/material";
import { usePropertyDetailController } from "./usePropertyDetailController";

export const PropertyDetail = () => {
  const { register, errors, fields, selectFields, capitalize } =
    usePropertyDetailController();

  return (
    <Box maxWidth="sm" margin="0 auto" textAlign="left">
      <br></br>
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
            error={!!errors[item]}
            helperText={errors[item]?.message as string}
          />
        );
      })}
      <br></br>
      <br></br>
      <Grid container spacing={10} columns={12}>
        {selectFields.map((item) => {
          return (
            <Grid size={4}>
              <InputLabel
                sx={{ textTransform: "capitalize" }}
                shrink
                htmlFor={item.heading}
              >
                {item.heading}
              </InputLabel>
              <NativeSelect fullWidth {...register(`${item.title}`)}>
                {item.options.map((item) => {
                  return <option value={item}>{capitalize(item)}</option>;
                })}
              </NativeSelect>
            </Grid>
          );
        })}
      </Grid>
      <br></br>
      <br></br>
    </Box>
  );
};
