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
    function derivePageVisitsPda(
        seed: string,
        userPubkey: anchor.web3.PublicKey
    ) {
        return anchor.web3.PublicKey.findProgramAddressSync(
            [
                Buffer.from(seed),
                userPubkey.toBuffer(),
                payer.publicKey.toBuffer(),
            ],
            program.programId
        );
    }
    let [userProfilePda] = derivePageVisitsPda(
        "USER_STATE",
        testUser.publicKey
    );
    it("create a user profile pad", async () => {
        const tx = await program.methods
            .initializeUser()
            .accounts({
                userProfile: userProfilePda,
                user: testUser.publicKey,
                authority: payer.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .rpc();
        console.log("create a user profile pad:", tx);
    });

    let [todoAccountPda] = derivePageVisitsPda(
        "TODO_STATE",
        testUser.publicKey
    );
    it("Create the todo tracking PDA", async () => {
        const tx = await program.methods
            .addTodo("test")
            .accounts({
                todoAccount: todoAccountPda,
                userProfile: userProfilePda,
                user: testUser.publicKey,
                authority: payer.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .signers([payer.payer])
            .rpc();
        console.log("Create the todo tracking PDA:", tx);
    });
    it("look up todo list", async () => {
        const userProfile = await program.account.userProfile.fetch(
            await userProfilePda
        );
        console.log("userProfile: " + userProfile.todoAccount);

        const todoAccount = await program.account.todoAccount.all([
            authorFilter(payer.publicKey.toString()),
        ]);
        console.log("todoAccount: " + todoAccount[0].account);
    });
});
