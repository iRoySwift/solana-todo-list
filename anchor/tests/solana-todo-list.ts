import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorDappTodo } from "../target/types/anchor_dapp_todo";
import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils";
import { authorFilter } from "./authorFilter";

describe("solana-todo-list", () => {
    // Configure the client to use the local cluster.
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);
    const payer = provider.wallet as anchor.Wallet;
    const program = anchor.workspace.AnchorDappTodo as Program<AnchorDappTodo>;

    function deriveUserPda() {
        return anchor.web3.PublicKey.findProgramAddressSync(
            [Buffer.from("USER_ACCOUNT9"), payer.publicKey.toBuffer()],
            program.programId
        );
    }

    function deriveTodoPda(lastTodo) {
        return anchor.web3.PublicKey.findProgramAddressSync(
            [
                Buffer.from("TODO_ACCOUNT9"),
                payer.publicKey.toBuffer(),
                Buffer.from([lastTodo]),
            ],
            program.programId
        );
    }

    /**创建测试账号 */
    let testUser = anchor.web3.Keypair.generate();
    it("Create a test user", async () => {
        const ix = anchor.web3.SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: testUser.publicKey,
            lamports:
                await provider.connection.getMinimumBalanceForRentExemption(0),
            space: 0,
            programId: anchor.web3.SystemProgram.programId,
        });
        await anchor.web3.sendAndConfirmTransaction(
            provider.connection,
            new anchor.web3.Transaction().add(ix),
            [payer.payer, testUser]
        );
        console.log(`Local Wallet: ${payer.publicKey}`);
        console.log(`Created User: ${testUser.publicKey}`);
        const signature = await provider.connection.requestAirdrop(
            testUser.publicKey,
            anchor.web3.LAMPORTS_PER_SOL
        );
        console.log(`airdrop:${signature}`);
    });

    let [userProfilePda] = deriveUserPda();
    it("init a user profile pad", async () => {
        const tx = await program.methods
            .initializeUser()
            .accounts({
                userAccount: userProfilePda,
                // user: testUser.publicKey,
                authority: payer.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .rpc();
        console.log("create a user profile pad:", tx);
    });

    let [todoAccountPda] = deriveTodoPda(0);
    it("add todo to PDA", async () => {
        const tx = await program.methods
            .addTodo("test")
            .accounts({
                todoAccount: todoAccountPda,
                userAccount: userProfilePda,
                // user: testUser.publicKey,
                authority: payer.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .signers([payer.payer])
            .rpc();
        console.log("Create the todo tracking PDA:", tx);
    });

    it("mark todo", async () => {
        const tx = await program.methods
            .markTodo(0)
            .accounts({
                todoAccount: todoAccountPda,
                userAccount: userProfilePda,
                // user: testUser.publicKey,
                authority: payer.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .signers([payer.payer])
            .rpc();
        console.log("mark Todo:", tx);
    });

    it("look up todo list", async () => {
        const userAccount = await program.account.userAccount.fetch(
            await userProfilePda
        );
        console.log("userAccount: " + JSON.stringify(userAccount));

        const todoAccount = await program.account.todoAccount.all([
            authorFilter(payer.publicKey.toString()),
        ]);
        console.log(
            "todoAccount: " + todoAccount[0].account,
            JSON.stringify(todoAccount)
        );
    });

    it("remove todo", async () => {
        const tx = await program.methods
            .removeTodo(0)
            .accounts({
                todoAccount: todoAccountPda,
                userAccount: userProfilePda,
                authority: payer.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .signers([payer.payer])
            .rpc();
        console.log("remove todo:", tx);
    });

    it("look up todo list", async () => {
        const userAccount = await program.account.userAccount.fetch(
            await userProfilePda
        );
        console.log("userAccount: " + JSON.stringify(userAccount));

        const todoAccount = await program.account.todoAccount.all([
            authorFilter(payer.publicKey.toString()),
        ]);
        console.log(
            "todoAccount: " + todoAccount[0].account,
            JSON.stringify(todoAccount)
        );
    });
});
