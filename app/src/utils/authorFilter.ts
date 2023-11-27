import { PublicKey } from "@solana/web3.js";

export const authorFilter = (authorBase58PublicKey: string) => ({
    memcmp: {
        offset: 8, // Discriminator.
        bytes: authorBase58PublicKey,
    },
});
