"use client";
import React, {
    ChangeEvent,
    KeyboardEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    useAnchorWallet,
    useConnection,
    useWallet,
} from "@solana/wallet-adapter-react";
import { SystemProgram } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { utf8 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import toast from "react-hot-toast";
// import todoIdl from "../../../target/idl/solana_todo_list.json";
import todoIdl from "../constants/idl.json";
import { TODO_PROGRAM_PUBKEY } from "@/constants";
import { authorFilter } from "@/utils/authorFilter";

export type iState = "all" | "active" | "completed";

type iTodo = {
    account: {
        idx: number; //生成key
        content: string;
        marked: boolean; //判断li是否被勾选
    };
};

const staticTodos = [
    {
        account: {
            idx: 0,
            content: "learn solana",
            marked: false,
        },
    },
    {
        account: {
            idx: 1,
            content: "learn solana",
            marked: false,
        },
    },
    {
        account: {
            idx: 2,
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
    const [loading, setLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const [transactionPending, setTransactionPending] = useState(false);
    const [lastTodo, setLastTodo] = useState(0);

    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const anchorWallet = useAnchorWallet();

    const program = useMemo(() => {
        // Configure the client to use the local cluster.
        // const provider = anchor.AnchorProvider.env();
        // anchor.setProvider(provider);
        // const payer = provider.wallet as anchor.Wallet;
        // const program = anchor.workspace.SolanaTodoList as Program<SolanaTodoList>;
        if (anchorWallet) {
            const provider = new anchor.AnchorProvider(
                connection,
                anchorWallet,
                anchor.AnchorProvider.defaultOptions()
            );
            return new anchor.Program(
                todoIdl as any,
                TODO_PROGRAM_PUBKEY,
                provider
            );
        }
    }, [connection, anchorWallet]);

    /** derive use pda */
    const deriveUserPda = useCallback(() => {
        if (!(publicKey && program)) return;
        const [userPda, userBump] =
            anchor.web3.PublicKey.findProgramAddressSync(
                [utf8.encode("USER_ACCOUNT1"), publicKey.toBuffer()],
                program?.programId
            );
        return userPda;
    }, [publicKey, program]);

    /** derive todo pda */
    const deriveTodoPda = useCallback(
        (lastTodo: number) => {
            if (!(publicKey && program)) return;
            const [todoPda, todoBump] =
                anchor.web3.PublicKey.findProgramAddressSync(
                    [
                        utf8.encode("TODO_ACCOUNT1"),
                        publicKey.toBuffer(),
                        Buffer.from([lastTodo]),
                    ],
                    program?.programId
                );
            return todoPda;
        },
        [publicKey, program]
    );

    const handleKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const addStaticTodo = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter" || !input.trim().length) return;
        const idx =
            (todoList.length > 0
                ? todoList[todoList.length - 1].account.idx
                : 0) + 1;
        setTodoList(pre => [
            ...pre,
            {
                account: {
                    idx,
                    content: input,
                    marked: false,
                },
            },
        ]);
        setInput("");
    };

    const addTodo = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter" || !input.trim().length) return;
        if (!(publicKey && program)) return;
        let userPda = deriveUserPda();
        let todoPda = deriveTodoPda(lastTodo);
        if (!userPda || !todoPda) return;
        setTransactionPending(true);
        const ts = await program.methods
            .addTodo(input)
            .accounts({
                todoAccount: todoPda,
                userAccount: userPda,
                authority: publicKey,
                systemProgram: SystemProgram.programId,
            })
            .rpc()
            .then(tx => {
                toast.success("Successfully added todo!");
                setTransactionPending(false);
            })
            .catch(error => {
                console.log(error);
                toast.error(error.toString());
            })
            .finally(() => {
                setInput("");
            });
    };

    const markStaticTodo = (idx: number, checked: boolean) => {
        setTodoList(preTodoList =>
            preTodoList.map(todo => {
                if (todo.account.idx === idx) {
                    todo.account.marked = checked;
                }
                return todo;
            })
        );
    };

    const markTodo = (idx: number, checked: boolean) => {
        if (!(publicKey && program)) return;
        let userPda = deriveUserPda();
        let todoPda = deriveTodoPda(idx);
        if (!userPda || !todoPda) return;
        setTransactionPending(true);
        program.methods
            .markTodo(idx)
            .accounts({
                todoAccount: todoPda,
                userAccount: userPda,
                authority: publicKey,
                systemProgram: SystemProgram.programId,
            })
            .rpc()
            .then(tx => {
                toast.success("Successfully mark todo!");
                setTransactionPending(false);
            })
            .catch(error => {
                console.log(error);
                toast.error(error.toString());
            });
    };

    const updateStaticTodo = (idx: number, content: string) => {
        setTodoList(preTodoList =>
            preTodoList.map(todo => {
                if (todo.account.idx === idx) {
                    todo.account.content = content;
                }
                return todo;
            })
        );
    };

    const updateTodo = (idx: number, content: string) => {
        if (!(publicKey && program)) return;
        let userPda = deriveUserPda();
        let todoPda = deriveTodoPda(idx);
        if (!userPda || !todoPda) return;
        setTransactionPending(true);
        return program.methods
            .updateTodo(idx, content)
            .accounts({
                todoAccount: todoPda,
                userAccount: userPda,
                authority: publicKey,
                systemProgram: SystemProgram.programId,
            })
            .rpc()
            .then(tx => {
                toast.success("Successfully update todo!");
                setTransactionPending(false);
            })
            .catch(error => {
                console.log(error);
                let message = error.error.message || error.error.errorMessage;
                toast.error(message);
            });
    };

    const removeStaticTodo = (idx: number) => {
        setTodoList(preTodoList =>
            preTodoList.filter(todo => todo.account.idx !== idx)
        );
    };

    const removeTodo = (idx: number) => {
        if (!(publicKey && program)) return;
        let userPda = deriveUserPda();
        let todoPda = deriveTodoPda(idx);
        if (!userPda || !todoPda) return;
        setTransactionPending(true);
        program.methods
            .removeTodo(idx)
            .accounts({
                todoAccount: todoPda,
                userAccount: userPda,
                authority: publicKey,
                systemProgram: SystemProgram.programId,
            })
            .rpc()
            .then(tx => {
                toast.success("Successfully mark todo!");
                setTransactionPending(false);
            })
            .catch(error => {
                console.log(error);
                toast.error(error.toString());
            });
        // .finally(() => {
        //     setInput("");
        // });
    };

    const toggleStaticAll = () => {
        setSelected(pre => !selected);
    };

    const handleStateChange = (v: iState) => {
        setState(v);
    };

    const clearStaticCompleted = () => {
        setTodoList(preTodoList =>
            preTodoList.filter(todo => !todo.account.marked)
        );
    };

    /** initialize User PDA*/
    const initializeUser = useCallback(async () => {
        if (!(publicKey && program) && initialized) return;
        try {
            setTransactionPending(true);
            let userPda = deriveUserPda();
            if (!userPda) return;
            const tx = await program?.methods
                .initializeUser()
                .accounts({
                    userAccount: userPda,
                    authority: publicKey,
                    systemProgram: SystemProgram.programId,
                })
                .rpc();
            toast.success("Successfully initialized user.");
            setTransactionPending(false);
        } catch (error) {
            console.log(error);
            toast.error(error!.toString());
        }
    }, [deriveUserPda, initialized, program, publicKey]);

    /** 获取todo数据 */
    const getTodoAccount = useCallback(async () => {
        if (!(publicKey && program)) return;
        const todoAccount: any = await program?.account.todoAccount.all([
            authorFilter(publicKey!.toString()) as any,
        ]);
        setTodoList(todoAccount);
    }, [publicKey, program]);

    /** 初始化 */
    const init = useCallback(async () => {
        if (!(publicKey && program && !transactionPending)) return;
        setLoading(true);
        let userPda = deriveUserPda();
        if (!userPda) return;
        program?.account.userAccount
            .fetch(await userPda)
            .then((res: any) => {
                setLastTodo(res.lastTodo);
                getTodoAccount();
            })
            .catch(() => {
                initializeUser();
            })
            .finally(() => {
                setLoading(false);
            });
    }, [
        getTodoAccount,
        deriveUserPda,
        initializeUser,
        program,
        publicKey,
        transactionPending,
    ]);

    useEffect(() => {
        init();
    }, [init]);

    // useEffect(() => {
    //     initializeUser();
    // }, [initializeUser]);

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
        init,
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
        addStaticTodo,
        markTodo,
        markStaticTodo,
        updateTodo,
        updateStaticTodo,
        removeTodo,
        removeStaticTodo,
        toggleStaticAll,
        clearStaticCompleted,
        handleStateChange,
        activeTodo,
        completeTodo,
        leftItem,
        showData,
    };
};
