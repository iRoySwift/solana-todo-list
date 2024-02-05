import { serialize } from "borsh";

type iRemoveTodo = {
    instruction: number;
    idx: number;
};

export class RemoveTodo {
    instruction: number;
    idx: number;
    constructor(props: iRemoveTodo) {
        this.instruction = props.instruction;
        this.idx = props.idx;
    }
    toBuffer(): Buffer {
        return Buffer.from(serialize(removeTodoSchema, this));
    }
}

const removeTodoSchema = new Map([
    [
        RemoveTodo,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["idx", "u8"],
            ],
        },
    ],
]);
