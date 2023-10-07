"use client";
import React, {
    ChangeEvent,
    KeyboardEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import TodoFooter from "./TodoFooter";
import { Header, HomeContainer, SearchBox, Section } from "./Home.styled";
import { Box, InputBase, Typography } from "@mui/material";
import { KeyboardArrowDown as KeyboardArrowDownIcon } from "@mui/icons-material";
import Todo from "./Todo";
import { useTodo } from "@/hooks/todo";

interface Props {}
const TodoList: React.FC<Props> = () => {
    const {
        input,
        // setInput,
        // selected,
        // setSelected,
        todoList,
        // setTodoList,
        state,
        // setState,
        handleKeyChange,
        addTodo,
        markTodo,
        updateTodoContent,
        deleteTodo,
        toggleAll,
        handleStateChange,
        clearAllCompleted,
        activeTodo,
        completeTodo,
        leftItem,
        showData,
    } = useTodo();
    return (
        <HomeContainer>
            <Header>
                <Typography variant="h1">todos</Typography>
                <SearchBox>
                    {todoList.length > 0 && (
                        <KeyboardArrowDownIcon
                            className="toggle-all"
                            fontSize="large"
                            color={activeTodo ? "disabled" : "primary"}
                            onClick={toggleAll}
                        />
                    )}
                    <InputBase
                        value={input}
                        className="input-base"
                        placeholder="What needs to be done?"
                        inputProps={{ "aria-label": "What needs to be done?" }}
                        onChange={handleKeyChange}
                        onKeyDown={addTodo}
                    />
                </SearchBox>
            </Header>

            {todoList.length > 0 && (
                <>
                    <Section>
                        {showData.map(todo => (
                            <Todo
                                key={todo.account.idx}
                                idx={todo.account.idx}
                                content={todo.account.content}
                                marked={todo.account.marked}
                                deleteTodo={deleteTodo}
                                markTodo={markTodo}
                                updateTodoContent={updateTodoContent}
                            />
                        ))}
                    </Section>
                    <TodoFooter
                        leftItem={leftItem.length}
                        state={state}
                        showClearButton={!!completeTodo}
                        handleStateChange={handleStateChange}
                        clearAllCompleted={clearAllCompleted}
                    />
                </>
            )}
        </HomeContainer>
    );
};
export default TodoList;
