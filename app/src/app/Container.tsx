"use client";
import React from "react";
import ThemeCustomization from "@/theme";
import withWalletContent from "@/content/withWalletContent";

interface Props {
    children: React.JSX.ElementType;
}
const Container: React.FC<Props> = withWalletContent(({ children }) => {
    return <ThemeCustomization>{children}</ThemeCustomization>;
});
export default Container;
