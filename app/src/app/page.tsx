"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React from "react";
import TodoList from "@/views/Home/TodoList";
import Loading from "@/components/Loading";
import { useTodo } from "@/hooks/todo";

export default function Home() {
    const { loading } = useTodo();
    return (
        <main className={styles.main}>
            <Loading loading={loading}>
                <TodoList />
            </Loading>
        </main>
    );
}
