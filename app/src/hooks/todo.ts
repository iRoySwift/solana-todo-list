"use client";
import React, {
    ChangeEvent,
    KeyboardEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
export type iState = "all" | "active" | "completed";

type iTodo = {
    account: {
        idx: string; //生成key
        content: string;
        marked: boolean; //判断li是否被勾选
    };
};

const staticTodos = [
    {
        account: {
            idx: "0",
            content: "learn solana",
            marked: false,
        },
    },
    {
        account: {
            idx: "1",
            content: "learn solana",
            marked: false,
        },
    },
    {
        account: {
            idx: "2",
            content: "learn solana",
            marked: false,
        },
    },
];

export const useTodo = () => {
    const [input, setInput] = useState("");
    const [selected, setSelected] = useState(false);
    const [todoList, setTodoList] = useState<iTodo[]>([]);
    const [state, setState] = useState<iState>("all");
    const [initialized, setInitialized] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };
    const initializedStaticUser = () => {
        setInitialized(true);
    };

    const addTodo = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter" || !input.trim().length) return;
        setTodoList(pre => [
            ...pre,
            {
                account: {
                    idx: `${parseInt(
                        todoList[todoList.length - 1].account.idx
                    )} + 1`,
                    content: input,
                    marked: false,
                },
            },
        ]);
        setInput("");
    };

    const markTodo = (idx: string, checked: boolean) => {
        setTodoList(preTodoList =>
            preTodoList.map(todo => {
                if (todo.account.idx === idx) {
                    todo.account.marked = checked;
                }
                return todo;
            })
        );
    };

    const updateTodoContent = (idx: string, content: string) => {
        setTodoList(preTodoList =>
            preTodoList.map(todo => {
                if (todo.account.idx === idx) {
                    todo.account.content = content;
                }
                return todo;
            })
        );
    };

    const deleteTodo = (idx: string) => {
        setTodoList(preTodoList =>
            preTodoList.filter(todo => todo.account.idx !== idx)
        );
    };

    const toggleAll = () => {
        setSelected(pre => !selected);
    };

    const handleStateChange = (v: iState) => {
        setState(v);
    };

    const clearAllCompleted = () => {
        setTodoList(preTodoList =>
            preTodoList.filter(todo => !todo.account.marked)
        );
    };

    useEffect(() => {
        if (initialized) setTodoList(staticTodos);
    }, [initialized]);

    useEffect(() => {
        setTodoList(preTodoList =>
            preTodoList.map(todo => {
                todo.account.marked = selected;
                return todo;
            })
        );
    }, [selected]);

    //判断todoList中是否全勾选状态
    let activeTodo = useMemo(
        () => todoList.find(elt => !elt.account.marked),
        [todoList]
    );

    //判断todoList中是否有勾选状态
    let completeTodo = useMemo(
        () => todoList.find(elt => elt.account.marked),
        [todoList]
    );

    let leftItem = useMemo(
        () => todoList.filter(elt => !elt.account.marked),
        [todoList]
    );

    let showData = useMemo(
        () =>
            todoList.filter(todo => {
                if (state == "all") {
                    return true;
                } else if (state == "completed") {
                    return todo.account.marked;
                } else {
                    return !todo.account.marked;
                }
            }),
        [todoList, state]
    );

    return {
        input,
        // setInput,
        // selected,
        // setSelected,
        todoList,
        // setTodoList,
        state,
        // setState,
        loading,
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
    };
};
