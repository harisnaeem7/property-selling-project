import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const PropertyImagesUpload = () => {
  const { watch, setValue } = useFormContext();
  const files = (watch("images") as File[]) || [];

  const [previews, setPreviews] = useState<string[]>([]);

  // Generate previews whenever files change
  useEffect(() => {
    if (!files || files.length === 0) {
      setPreviews([]);
      return;
    }

    const objectUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);

    // Cleanup on unmount or files change
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    const updated = [...files, ...selectedFiles];
    setValue("images", updated, { shouldValidate: true });
  };

  const removeImage = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setValue("images", updatedFiles, { shouldValidate: true });
  };

  return (
    <Box>
      <Button variant="outlined" component="label">
        Upload Images
        <input
          hidden
          type="file"
          multiple
          accept="image/*"
          onChange={handleUpload}
        />
      </Button>

      {/* Preview Grid */}
      <Box display="flex" gap={2} flexWrap="wrap" mt={2}>
        {previews.map((src, index) => (
          <Box key={index} position="relative">
            <img
              src={src}
              alt={`preview-${index}`}
              style={{
                width: 120,
                height: 120,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
            <IconButton
              size="small"
              onClick={() => removeImage(index)}
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "white",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
