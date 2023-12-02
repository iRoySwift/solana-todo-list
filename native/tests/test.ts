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
    testUser,
} from "../ts";

// Step 1 连接到Solana网络 devnet
const devnet = clusterApiUrl("devnet");
const connection = new Connection(process.env.DEVNET || devnet, "confirmed");

// Step 2 创建者账号信息（private key）
// const signer = Keypair.fromSecretKey(new Uint8Array(secretKeyArray));
const payer = createKeypairFromFile(
    require("os").homedir() + "/.config/solana/id.json"
);

const program = createKeypairFromFile(
    "./../target/deploy/native_dapp_todo-keypair.json"
);

function deriveUserPda() {
    return PublicKey.findProgramAddressSync(
        [Buffer.from("USER_ACCOUNT"), payer.publicKey.toBuffer()],
        program.publicKey
    );
}

function deriveTodoPda() {
    return PublicKey.findProgramAddressSync(
        [
            Buffer.from("TODO_ACCOUNT"),
            payer.publicKey.toBuffer(),
            Buffer.from([0]),
        ],
        program.publicKey
    );
}

describe("todo list", async () => {
    // !testUser
    // it("test user", async () => {
    //     const [userPda, bump] = deriveUserPda();
    //     const ix = testUser(userPda, payer.publicKey, program.publicKey);
    //     const tx = await sendAndConfirmTransaction(
    //         connection,
    //         new Transaction().add(ix),
    //         [payer]
    //     );
    //     console.log("🚀 ~ file: test.ts:58 ~ it ~ tx:", tx);
    // });
    it("init user", async () => {
        const [userPda, bump] = deriveUserPda();
        const ix = initializeUser(userPda, payer.publicKey, program.publicKey);
        const tx = await sendAndConfirmTransaction(
            connection,
            new Transaction().add(ix),
            [payer]
        );
        console.log("🚀 ~ file: test.ts:42 ~ it ~ tx:", tx);
    });
    it("add todo", async () => {
        const [todoPda, bump] = deriveTodoPda();
        const ix = addTodo(todoPda, payer.publicKey, program.publicKey, 1);
        const tx = await sendAndConfirmTransaction(
            connection,
            new Transaction().add(ix),
            [payer]
        );
        console.log("🚀 ~ file: test.ts:63 ~ it ~ tx:", tx);
    });
});
