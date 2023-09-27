import { PaletteMode, PaletteOptions } from "@mui/material";
import themeColors from "./themeColors";

const Palette = (mode: PaletteMode): PaletteOptions => {
    const paletteColor = themeColors();

    return {
        mode,
        common: {
            black: "#000",
            white: "#FFF",
        },
        ...paletteColor,
        text: {
            primary: paletteColor.grey[900],
            secondary: paletteColor.grey[500],
            disabled: paletteColor.grey[400],
        },
        action: {
            disabled: paletteColor.grey[300],
        },
        divider: paletteColor.grey[200],
        background: {
            paper: "#fff",
            default: paletteColor.grey[50],
        },
    };
};

export default Palette;
