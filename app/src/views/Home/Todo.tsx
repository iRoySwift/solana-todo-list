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
    id: number;
    hasComplete: boolean;
    deleteTodo: (id: number) => void;
    updateTodo: (id: number, checked: boolean) => void;
    updateTodoContent: (id: number, content: string) => void;
}
const Todo: React.FC<Props> = props => {
    let {
        content,
        id,
        hasComplete,
        deleteTodo,
        updateTodo,
        updateTodoContent,
    } = props;
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
        updateTodoContent(id, lineKey);
        setIsEdit(false);
    };

    return (
        <TodoBox>
            <Box className="left">
                <Checkbox
                    checked={hasComplete}
                    onChange={(_event, checked) => updateTodo(id, checked)}
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
                        className={hasComplete ? "checked" : ""}
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
                    onClick={() => deleteTodo(id)}>
                    <CloseIcon />
                </IconButton>
            )}
        </TodoBox>
    );
};
export default Todo;
