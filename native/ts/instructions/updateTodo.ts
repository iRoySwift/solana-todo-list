import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { UpdateTodo } from "../states";
import { MyInstruction } from ".";

export const updateTodo = (
    target: PublicKey,
    payer: PublicKey,
    programId: PublicKey,
    idx: number,
    content: string
): TransactionInstruction => {
    const data = new UpdateTodo({
        instruction: MyInstruction.UpdateTodo,
        idx,
        content,
    }).toBuffer();
    const ix = new TransactionInstruction({
        keys: [
            { pubkey: target, isSigner: false, isWritable: true },
            { pubkey: payer, isSigner: true, isWritable: true },
            { pubkey: programId, isSigner: false, isWritable: false },
        ],
        programId,
        data,
    });
    return ix;
};
