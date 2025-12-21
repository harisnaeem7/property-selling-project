import { Box, Typography, Button } from "@mui/material";
import heroImage from "../../../public/hero-banner.jpg";
import { TypeAnimation } from "react-type-animation";

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
        <Typography variant="h3" fontWeight={700}>
          Everythin you need to
        </Typography>

        <TypeAnimation
          preRenderFirstString={true}
          sequence={[
            500,
            "Find Your Dream Home", // initially rendered starting point
            1000,
            "Sell At The Right Price",
            1000,
            "Rent Without Stress",
            1000,
          ]}
          speed={50}
          style={{ fontSize: "2em" }}
          repeat={Infinity}
        />
      </Box>
      <br></br>
      <Box>
        <Button variant="contained" sx={{ mt: 4 }} size="large">
          Explore
        </Button>
      </Box>
    </Box>
  );
};
