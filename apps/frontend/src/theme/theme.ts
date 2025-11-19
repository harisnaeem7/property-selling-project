import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins/400.css"; // Regular
import "@fontsource/poppins/500.css"; // Medium
import "@fontsource/poppins/700.css"; // Bold

const theme = createTheme({
  palette: {
    primary: {
      main: "#1d1d1b", // your custom primary color
    },
    secondary: {
      main: "#4F7C5B",
    },
    background: {
      default: "#1d1d1b",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

export default theme;
