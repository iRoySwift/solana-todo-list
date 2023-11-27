"use client";
import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Box } from "@mui/material";
import useMounted from "@/hooks/useMounted";

interface Props {}
const Wallets: React.FC<Props> = () => {
    const hasMounted = useMounted();
    if (!hasMounted) return null;
    return (
        <WalletMultiButton style={{ width: 180, justifyContent: "center" }} />
    );
};
export default Wallets;
