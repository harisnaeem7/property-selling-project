import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormContext } from "react-hook-form";

const MAX_IMAGES = 5;

export const ImageUploader = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const images: File[] = watch("images") || [];
  const errorMessage = errors.images?.message;

  const handleFiles = (files: File[]) => {
    if (!files.length) return;

    const merged = [...images, ...files].slice(0, MAX_IMAGES);

    setValue("images", merged, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);

    setValue("images", updated, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <Box>
      <input
        id="image-upload-input"
        type="file"
        hidden
        multiple
        accept="image/*"
        onChange={(e) => handleFiles(Array.from(e.target.files || []))}
      />

      <Box
        onClick={() => document.getElementById("image-upload-input")?.click()}
        sx={{
          border: "2px dashed #c4c4c4",
          borderRadius: 2,
          padding: 4,
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.2s ease",
          "&:hover": {
            borderColor: "primary.main",
            backgroundColor: "rgba(0,0,0,0.03)",
          },
        }}
      >
        <Typography variant="body1" fontWeight={500}>
          Click to upload images
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {images.length} / {MAX_IMAGES} images selected
        </Typography>
      </Box>

      {typeof errorMessage === "string" && (
        <Typography color="error" variant="body2" mt={1}>
          {errorMessage}
        </Typography>
      )}

      {images.length > 0 && (
        <Box
          mt={3}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: 2,
          }}
        >
          {images.map((file, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                height: 120,
              }}
            >
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              <IconButton
                size="small"
                onClick={() => removeImage(index)}
                sx={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.85)",
                  },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
