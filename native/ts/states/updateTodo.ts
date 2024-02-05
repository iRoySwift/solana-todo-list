import { serialize } from "borsh";

type iUpdateTodo = {
    instruction: number;
    idx: number;
    content: string;
};

export class UpdateTodo {
    instruction: number;
    idx: number;
    content: string;
    constructor(props: iUpdateTodo) {
        this.instruction = props.instruction;
        this.idx = props.idx;
        this.content = props.content;
    }
    toBuffer() {
        return Buffer.from(serialize(UpdateTodoSchema, this));
    }
}

const UpdateTodoSchema = new Map([
    [
        UpdateTodo,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["idx", "u8"],
                ["content", "String"],
            ],
        },
    ],
]);
