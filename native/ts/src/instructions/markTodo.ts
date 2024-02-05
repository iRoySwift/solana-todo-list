import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import { MyInstruction } from ".";
import { MarkTodo } from "../states";

export const markTodo = (
  target: PublicKey,
  payer: PublicKey,
  programId: PublicKey,
  idx: number
): TransactionInstruction => {
  const data = new MarkTodo({
    instruction: MyInstruction.MarkTodo,
    idx,
  }).toBuffer();
  const ix = new TransactionInstruction({
    keys: [
      { pubkey: target, isSigner: false, isWritable: true },
      { pubkey: payer, isSigner: true, isWritable: true },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    programId,
    data,
  });
  return ix;
};
