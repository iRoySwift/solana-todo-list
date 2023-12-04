"use client";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { TodoBox } from "./Home.styled";
import {
    Box,
    Checkbox,
    IconButton,
    OutlinedInput,
    Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

interface Props {
    content: string;
    idx: number;
    marked: boolean;
    removeTodo: (idx: number) => void;
    markTodo: (idx: number, checked: boolean) => void;
    updateTodo: (idx: number, content: string) => Promise<void> | undefined;
}

const Todo: React.FC<Props> = props => {
    let { content, idx, marked, removeTodo, markTodo, updateTodo } = props;
    const [isEdit, setIsEdit] = useState(false);
    const [lineKey, setLineKey] = useState(content);
    const [] = useState("");

    const handleKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLineKey(e.target.value);
    };
    const handleKeyOnBlur = () => {
        setIsEdit(false);
        setLineKey(content);
    };
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter" || !lineKey.trim().length) return;
        updateTodo(idx, lineKey)
            ?.then(() => {
                setIsEdit(false);
            })
            .finally(() => {
                setLineKey(content);
            });
    };

    return (
        <TodoBox>
            <Box className="left">
                <Checkbox
                    checked={marked}
                    onChange={(_event, checked) => markTodo(idx, checked)}
                />
                {isEdit ? (
                    <OutlinedInput
                        value={lineKey}
                        onBlur={handleKeyOnBlur}
                        onChange={handleKeyChange}
                        onKeyDown={handleKeyDown}
                    />
                ) : (
                    <Typography
                        className={marked ? "checked" : ""}
                        variant="h3"
                        onClick={() => setIsEdit(true)}>
                        {content}
                    </Typography>
                )}
            </Box>
            {!isEdit && (
                <IconButton
                    className="close"
                    color="error"
                    aria-label="delete"
                    onClick={() => removeTodo(idx)}>
                    <CloseIcon />
                </IconButton>
            )}
        </TodoBox>
    );
};
export default Todo;
