import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import { RemoveTodo } from "../states";
import { MyInstruction } from ".";

export const removeTodo = (
  userAccount: PublicKey,
  target: PublicKey,
  payer: PublicKey,
  programId: PublicKey,
  idx: number
): TransactionInstruction => {
  const data = new RemoveTodo({
    instruction: MyInstruction.RemoveTodo,
    idx,
  }).toBuffer();
  const ix = new TransactionInstruction({
    keys: [
      { pubkey: userAccount, isSigner: false, isWritable: true },
      { pubkey: target, isSigner: false, isWritable: true },
      { pubkey: payer, isSigner: true, isWritable: true },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    programId,
    data,
  });
  return ix;
};
