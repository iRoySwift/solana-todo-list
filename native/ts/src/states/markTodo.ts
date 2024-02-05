import { serialize } from "borsh";

type iMarkTodo = {
    instruction: number;
    idx: number;
};

export class MarkTodo {
    instruction: number;
    idx: number;
    constructor(props: iMarkTodo) {
        this.instruction = props.instruction;
        this.idx = props.idx;
    }
    toBuffer(): Buffer {
        return Buffer.from(serialize(MarkTodoSchema, this));
    }
}

const MarkTodoSchema = new Map([
    [
        MarkTodo,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["idx", "u8"],
            ],
        },
    ],
]);
