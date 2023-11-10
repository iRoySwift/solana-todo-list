import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaTodoList } from "../target/types/solana_todo_list";
import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils";
import { authorFilter } from "./authorFilter";

describe("solana-todo-list", () => {
    // Configure the client to use the local cluster.
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);
    const payer = provider.wallet as anchor.Wallet;
    const program = anchor.workspace.SolanaTodoList as Program<SolanaTodoList>;

    // it("Is initialized!", async () => {
    //     // Add your test here.
    //     const tx = await program.methods.initialize().rpc();
    //     console.log("Your transaction signature", tx);
    // });

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
    function derivePageVisitsPda(seed: string) {
        return anchor.web3.PublicKey.findProgramAddressSync(
            [Buffer.from(seed), payer.publicKey.toBuffer()],
            program.programId
        );
    }
    let [userProfilePda] = derivePageVisitsPda("USER_ACCOUNT8");
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

    function deriveTodoPda(seed: string) {
        return anchor.web3.PublicKey.findProgramAddressSync(
            [Buffer.from(seed), payer.publicKey.toBuffer(), Buffer.from([0])],
            program.programId
        );
    }
    let [todoAccountPda] = deriveTodoPda("TODO_ACCOUNT8");
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

    it("update todo", async () => {
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
