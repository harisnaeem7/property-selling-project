import { usePropertDescriptionController } from "./usePropertyDescriptionController";
import { NativeSelect, InputLabel, Box, TextField } from "@mui/material";
export const PropertyDescription = () => {
  const { register, cities, errors } = usePropertDescriptionController();

  return (
    <>
      <Box maxWidth="sm" margin="0 auto" textAlign="left">
        <br></br>
        <TextField
          {...register("description")}
          id="outlined-multiline-flexible"
          label="Description"
          multiline
          fullWidth
          rows={8}
        />
        <br></br>
        <br></br>
        <TextField
          fullWidth
          sx={{ margin: "10px 0px", textTransform: "capitalize" }}
          size="medium"
          id="outlined-basic"
          label="address"
          variant="outlined"
          {...register("address")}
          error={!!errors.item}
          helperText={errors.item?.message as string}
        />
        <br></br>
        <br></br>
        <InputLabel sx={{ textTransform: "capitalize" }} shrink htmlFor="city">
          City
        </InputLabel>
        <NativeSelect {...register("city")}>
          {cities.map((item) => {
            return <option value={item}>{item}</option>;
          })}
        </NativeSelect>
        <br></br>
        <br></br>
      </Box>
    </>
  );
};
