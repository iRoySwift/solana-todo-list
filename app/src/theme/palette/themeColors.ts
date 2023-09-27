import { colors } from "@mui/material";

const themeColors = () => {
    const { blue, red, amber, cyan, green, grey } = colors;
    const contrastText = "#fff";
    return {
        primary: {
            lighter: blue[50],
            100: blue[100],
            200: blue[200],
            light: blue[300],
            400: blue[400],
            main: blue[500],
            dark: blue[600],
            700: blue[700],
            darker: blue[800],
            900: blue[900],
            contrastText,
        },
        secondary: {
            lighter: grey[50],
            100: grey[100],
            200: grey[200],
            light: grey[300],
            400: grey[400],
            main: grey[500],
            600: grey[600],
            dark: grey[700],
            800: grey[800],
            darker: grey[900],
            contrastText: grey[50],
        },
        error: {
            lighter: red[50],
            light: red[200],
            main: red[400],
            dark: red[700],
            darker: red[900],
            contrastText,
        },
        warning: {
            lighter: amber[50],
            light: amber[300],
            main: amber[500],
            dark: amber[700],
            darker: amber[900],
            contrastText: grey[100],
        },
        info: {
            lighter: cyan[50],
            light: cyan[300],
            main: cyan[500],
            dark: cyan[700],
            darker: cyan[900],
            contrastText,
        },
        success: {
            lighter: green[50],
            light: green[300],
            main: green[500],
            dark: green[700],
            darker: green[900],
            contrastText,
        },
        grey,
    };
};

export default themeColors;
