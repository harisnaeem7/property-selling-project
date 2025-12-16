import { Box, Typography, Button } from "@mui/material";
import heroImage from "../../../public/hero-banner.jpg";

type HeroProps = {
  image: string;
  title: string;
  subtitle?: string;
};

export const Hero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "30vh", md: "50vh" },
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.10)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          px: 2,
        }}
      >
        {/* <Typography variant="h3" fontWeight={700}>
          {title}
        </Typography>

        {subtitle && (
          <Typography variant="h6" sx={{ mt: 2, opacity: 0.9 }}>
            {subtitle}
          </Typography>
        )} */}

        <Button variant="contained" sx={{ mt: 4 }} size="large">
          Explore
        </Button>
      </Box>
    </Box>
  );
};
