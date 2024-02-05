import { PublicKey } from "@solana/web3.js";
import { serialize } from "borsh";

type iUserAccount = {
    authority: string;
    lastTodo: number;
    todoTotal: number;
};

export class UserAccount {
    authority: string;
    lastTodo: number;
    todoTotal: number;
    constructor(props: iUserAccount) {
        this.authority = props.authority;
        this.lastTodo = props.lastTodo;
        this.todoTotal = props.todoTotal;
    }
    toBuffer(): Buffer {
        return Buffer.from(serialize(UserAccountSchema, this));
    }
}

const UserAccountSchema = new Map([
    [
        UserAccount,
        {
            kind: "struct",
            fields: [
                ["authority", "string"],
                ["lastTodo", "u8"],
                ["todoTotal", "u8"],
            ],
        },
    ],
]);
