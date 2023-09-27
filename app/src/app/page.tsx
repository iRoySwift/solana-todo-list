import Image from "next/image";
import styles from "./page.module.css";
import React from "react";
import TodoList from "@/views/Home/TodoList";

export default function Home() {
  return (
    <main className={styles.main}>
      <TodoList />
    </main>
  );
}
