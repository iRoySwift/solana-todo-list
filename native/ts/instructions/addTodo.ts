import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { AddTodo } from "../states/addTodo";
import { MyInstruction } from ".";

/**
 * add todo pda
 * @param target
 * @param payer
 * @param programId
 * @param content
 * @returns TransactionInstruction
 */
export const addTodo = (
    target: PublicKey,
    payer: PublicKey,
    programId: PublicKey,
    content: string
): TransactionInstruction => {
    const data = new AddTodo({
        instruction: MyInstruction.AddTodo,
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
