import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e31be",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {},
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {},
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px transparent inset", // Transparent autofill background
            WebkitTextFillColor: "inherit", // Keep text color as is during autofill
          },
          "&::selection": {
            backgroundColor: "transparent", // Transparent selection background
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "10px", // Adjust padding here
        },
      },
    },
  },
});

export default theme;
