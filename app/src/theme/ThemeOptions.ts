"use client";

import { deepmerge } from "@mui/utils";
import palette from "./palette";
import spacing from "./spacing";
import shadows from "./shadows";
// import breakpoints from "./breakpoints";
import typography from "./typography";

import { PaletteMode, ThemeOptions } from "@mui/material";

const themeOptions = (): ThemeOptions => {
    let mode: PaletteMode = "light";

    const themeConfig = {
        palette: palette(mode),
        direction: "ltr",
        // breakpoints: breakpoints(),
        ...spacing,
        shadows: shadows(mode),
        typography: typography(`'Public Sans', sans-serif`),
        mixins: {
            toolbar: {
                minHeight: 60,
                paddingTop: 8,
                paddingBottom: 8,
            },
        },
    };
    return deepmerge({}, themeConfig);
};

export default themeOptions;
