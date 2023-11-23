"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React from "react";
import TodoList from "@/views/Home/TodoList";
import Wallets from "@/components/Wallets";
import { Box } from "@mui/material";

export default function Home() {
    return (
        <main className={styles.main}>
            <Box sx={{ position: "fixed", top: 10, right: 10 }}>
                <Wallets />
            </Box>
            <TodoList />
        </main>
    );
}
