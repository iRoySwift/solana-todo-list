import React, { useState } from "react";
import { TodoFooterContainer } from "./Home.styled";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { iState } from "./TodoList";

interface Props {
    leftItem: number;
    state: iState;
    showClearButton: boolean;
    handleStateChange: (v: iState) => void;
    clearAllCompleted: () => void;
}
const TodoFooter: React.FC<Props> = ({
    leftItem,
    state,
    showClearButton,
    handleStateChange,
    clearAllCompleted,
}) => {
    return (
        <TodoFooterContainer>
            <Box>{leftItem} item left</Box>
            <ul>
                <li
                    className={state == "all" ? "selected" : ""}
                    onClick={() => handleStateChange("all")}>
                    All
                </li>
                <li
                    className={state == "active" ? "selected" : ""}
                    onClick={() => handleStateChange("active")}>
                    Active
                </li>
                <li
                    className={state == "completed" ? "selected" : ""}
                    onClick={() => handleStateChange("completed")}>
                    Completed
                </li>
                {showClearButton && (
                    <li onClick={clearAllCompleted}>Clear All Completed</li>
                )}
            </ul>
        </TodoFooterContainer>
    );
};
export default TodoFooter;
