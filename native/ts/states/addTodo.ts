import { serialize } from "borsh";

type iAddTodo = {
    instruction: number;
    content: string;
};

export class AddTodo {
    instruction: number;
    content: string;
    constructor(props: iAddTodo) {
        this.instruction = props.instruction;
        this.content = props.content;
    }
    toBuffer(): Buffer {
        return Buffer.from(serialize(AddTodoSchema, this));
    }
}

const AddTodoSchema = new Map([
    [
        AddTodo,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["content", "String"],
            ],
        },
    ],
]);
