import {
    PublicKey,
    SystemProgram,
    TransactionInstruction,
} from "@solana/web3.js";
import { InitializeUser } from "../states";
import { MyInstruction } from ".";

/**
 * init user pda
 * @param target
 * @param payer
 * @param programId
 * @returns TransactionInstruction
 */
export const initializeUser = (
    target: PublicKey,
    payer: PublicKey,
    programId: PublicKey
): TransactionInstruction => {
    const data = new InitializeUser({
        instruction: MyInstruction.InitializeUser,
    }).toBuffer();
    const ix = new TransactionInstruction({
        keys: [
            { pubkey: target, isSigner: false, isWritable: true },
            { pubkey: payer, isSigner: true, isWritable: true },
            {
                pubkey: SystemProgram.programId,
                isSigner: false,
                isWritable: false,
            },
        ],
        programId,
        data,
    });
    return ix;
};
