"use client";
import {
    createTheme,
    CssBaseline,
    StyledEngineProvider,
    ThemeProvider,
} from "@mui/material";
// ** Theme Override Imports
import overrides from "./overrides";

// ** Theme
import themeOptions from "./ThemeOptions";
import * as locales from "@mui/material/locale";
// import { useLayoutState } from "@/content/withLayoutContent";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import { useMemo } from "react";

interface Props {
    children: React.ReactNode;
}

const ThemeCustomization: React.FC<Props> = ({ children }) => {
    // const { language } = useLayoutState();

    // ** Merged ThemeOptions of Core and User
    const coreThemeConfig = themeOptions();
    // const theme = useTheme();

    const themeWithLocale = useMemo(() => {
        // ** Pass ThemeOptions to CreateTheme Function to create partial theme without component overrides
        let theme = createTheme(coreThemeConfig);
        // themes.components = componentsOverride(themes);
        // ** Continue theme creation and pass merged component overrides to CreateTheme function
        theme = createTheme(theme, {
            components: { ...overrides(theme) },
        });
        return theme;
    }, [coreThemeConfig]);

    return (
        <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
            <ThemeProvider theme={themeWithLocale}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
    );
};

export default ThemeCustomization;
