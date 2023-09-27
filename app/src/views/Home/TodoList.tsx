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

export type iState = "all" | "active" | "completed";

type iTodoList = {
    id: number; //生成key
    content: string;
    hasComplete: boolean; //判断li是否被勾选
};

interface Props {}
const TodoList: React.FC<Props> = () => {
    const [key, setKey] = useState("");
    const [selected, setSelected] = useState(false);
    const [todoList, setTodoList] = useState<iTodoList[]>([]);
    const [state, setState] = useState<iState>("all");

    const handleKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
        setKey(e.target.value);
    };

    const addTodo = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter" || !key.trim().length) return;
        setTodoList(pre => [
            ...pre,
            {
                id: Math.random(),
                content: key,
                hasComplete: false,
            },
        ]);
        setKey("");
    };

    const updateTodo = (id: number, checked: boolean) => {
        setTodoList(preTodoList =>
            preTodoList.map(todo => {
                if (todo.id === id) {
                    todo.hasComplete = checked;
                }
                return todo;
            })
        );
    };

    const updateTodoContent = (id: number, content: string) => {
        setTodoList(preTodoList =>
            preTodoList.map(todo => {
                if (todo.id === id) {
                    todo.content = content;
                }
                return todo;
            })
        );
    };

    const deleteTodo = (id: number) => {
        setTodoList(preTodoList => preTodoList.filter(todo => todo.id !== id));
    };

    const toggleAll = () => {
        setSelected(pre => !selected);
    };

    const handleStateChange = (v: iState) => {
        setState(v);
    };

    const clearAllCompleted = () => {
        setTodoList(preTodoList =>
            preTodoList.filter(todo => !todo.hasComplete)
        );
    };

    useEffect(() => {
        setTodoList(preTodoList =>
            preTodoList.map(todo => {
                todo.hasComplete = selected;
                return todo;
            })
        );
    }, [selected]);

    //判断todoList中是否全勾选状态
    let activeTodo = useMemo(
        () => todoList.find(elt => !elt.hasComplete),
        [todoList]
    );

    //判断todoList中是否有勾选状态
    let completeTodo = useMemo(
        () => todoList.find(elt => elt.hasComplete),
        [todoList]
    );

    let leftItem = useMemo(
        () => todoList.filter(elt => !elt.hasComplete),
        [todoList]
    );

    let showData = useMemo(
        () =>
            todoList.filter(todo => {
                if (state == "all") {
                    return true;
                } else if (state == "completed") {
                    return todo.hasComplete;
                } else {
                    return !todo.hasComplete;
                }
            }),
        [todoList, state]
    );

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
                        value={key}
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
                                key={todo.id}
                                id={todo.id}
                                content={todo.content}
                                hasComplete={todo.hasComplete}
                                deleteTodo={deleteTodo}
                                updateTodo={updateTodo}
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
