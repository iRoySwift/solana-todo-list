import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { describe, it } from "node:test";
import {
  addTodo,
  createKeypairFromFile,
  initializeUser,
  removeTodo,
  testUser,
  updateTodo,
  markTodo,
} from "..";

// Step 1 连接到Solana网络 devnet
const devnet = clusterApiUrl("devnet");
const connection = new Connection(process.env.DEVNET || devnet, "confirmed");

// Step 2 创建者账号信息（private key）
// const signer = Keypair.fromSecretKey(new Uint8Array(secretKeyArray));
const signer = createKeypairFromFile(
  require("os").homedir() + "/.config/solana/id.json"
);

const program = createKeypairFromFile(
  "./../../target/deploy/native_dapp_todo-keypair.json"
);

function deriveUserPda() {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("USER_ACCOUNT"), signer.publicKey.toBuffer()],
    program.publicKey
  );
}

function deriveTodoPda(idx) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("TODO_ACCOUNT"),
      signer.publicKey.toBuffer(),
      Buffer.from([idx]),
    ],
    program.publicKey
  );
}

describe("todo list", async () => {
  // !testUser
  it("test user", { skip: true }, async () => {
    const [userPda, bump] = deriveUserPda();
    const ix = testUser(userPda, signer.publicKey, program.publicKey);
    const tx = await sendAndConfirmTransaction(
      connection,
      new Transaction().add(ix),
      [signer]
    );
    console.log("🚀 ~ file: test.ts:58 ~ it ~ tx:", tx);
  });

  it("init user", { skip: true }, async () => {
    const [userPda] = deriveUserPda();
    const ix = initializeUser(userPda, signer.publicKey, program.publicKey);
    const tx = await sendAndConfirmTransaction(
      connection,
      new Transaction().add(ix),
      [signer]
    );
    console.log("🚀 ~ file: test.ts:42 ~ it ~ tx:", tx);
    //  wAK3sJFzYohTAFFSdnpMCyoqwR1z7NGjWBPhzSFLoUSPREjgmeuvgNeNQLcfSqcELQZpRbiJxLWaYzZYcApcD5k
  });
  it("add todo", { skip: true }, async () => {
    let idx = 0;
    const [userPda] = deriveUserPda();
    const [todoPda] = deriveTodoPda(idx);
    const ix = addTodo(
      userPda,
      todoPda,
      signer.publicKey,
      program.publicKey,
      "test"
    );
    const tx = await sendAndConfirmTransaction(
      connection,
      new Transaction().add(ix),
      [signer]
    );
    console.log("🚀 ~ file: test.ts:63 ~ it ~ tx:", tx);
    // 4uMh9SdzUvPMGyqs7ZtA4NSJDYjET2exX2QQcungKjg3UVtsiUtgQYMXqfDidcFVfhjm61TRdKzEcRb8BdJYZrGn
  });
  it("update todo content", { skip: false }, async () => {
    let idx = 0;
    const [todoPda] = deriveTodoPda(idx);
    const ix = updateTodo(
      todoPda,
      signer.publicKey,
      program.publicKey,
      idx,
      "tes2"
    );
    const tx = await sendAndConfirmTransaction(
      connection,
      new Transaction().add(ix),
      [signer]
    );
    console.log("🚀 ~ file: test.ts:84 ~ it ~ tx:", tx);
  });
  it("mark todo", { skip: true }, async () => {
    let idx = 0;
    const [todoPda, bump] = deriveTodoPda(idx);
    const ix = markTodo(todoPda, signer.publicKey, program.publicKey, idx);
    const tx = await sendAndConfirmTransaction(
      connection,
      new Transaction().add(ix),
      [signer]
    );
    console.log("🚀 ~ file: test.ts:106 ~ it ~ tx:", tx);
  });
  it("remove todo", { skip: true }, async () => {
    let idx = 0;
    const [todoPda, bump] = deriveTodoPda(idx);
    const [userPda] = deriveUserPda();
    const ix = removeTodo(
      userPda,
      todoPda,
      signer.publicKey,
      program.publicKey,
      idx
    );
    const tx = await sendAndConfirmTransaction(
      connection,
      new Transaction().add(ix),
      [signer]
    );
    console.log("🚀 ~ file: test.ts:119 ~ it ~ tx:", tx);
  });
});
