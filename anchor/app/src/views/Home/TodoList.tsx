"use client";
import React, { useEffect } from "react";
import TodoFooter from "./TodoFooter";
import { Header, HomeContainer, SearchBox, Section } from "./Home.styled";
import { Box, InputBase, Typography } from "@mui/material";
import { KeyboardArrowDown as KeyboardArrowDownIcon } from "@mui/icons-material";
import Todo from "./Todo";
import { useTodo } from "@/hooks/todo";
import { Toaster } from "react-hot-toast";
import Loading from "@/components/Loading";

export type iState = "all" | "active" | "completed";

interface Props {}
const TodoList: React.FC<Props> = () => {
    const {
        init,
        input,
        loading,
        // setInput,
        // selected,
        // setSelected,
        todoList,
        // setTodoList,
        state,
        // setState,
        handleKeyChange,
        addTodo,
        // addStaticTodo: addTodo,
        markTodo,
        // markStaticTodo: markTodo,
        updateTodo,
        // updateStaticTodo: updateTodo,
        removeTodo,
        // removeStaticTodo: removeTodo,
        toggleStaticAll: toggleAll,
        clearStaticCompleted: clearCompleted,
        handleStateChange,
        activeTodo,
        completeTodo,
        leftItem,
        showData,
    } = useTodo();

    return (
        <Loading loading={loading}>
            <HomeContainer>
                <Toaster />
                <Header>
                    <Typography variant="h1">todos</Typography>
                    <SearchBox>
                        {
                            // todoList.length > 0 && (
                            // <KeyboardArrowDownIcon
                            //     className="toggle-all"
                            //     fontSize="large"
                            //     color={activeTodo ? "disabled" : "primary"}
                            //     onClick={toggleAll}
                            // />
                            // )
                        }
                        <InputBase
                            value={input}
                            className="input-base"
                            placeholder="What needs to be done?"
                            inputProps={{
                                "aria-label": "What needs to be done?",
                            }}
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
                                    removeTodo={removeTodo}
                                    markTodo={markTodo}
                                    updateTodo={updateTodo}
                                />
                            ))}
                        </Section>
                        <TodoFooter
                            leftItem={leftItem.length}
                            state={state}
                            showClearButton={!!completeTodo}
                            handleStateChange={handleStateChange}
                            clearCompleted={clearCompleted}
                        />
                    </>
                )}
            </HomeContainer>
        </Loading>
    );
};
export default TodoList;
