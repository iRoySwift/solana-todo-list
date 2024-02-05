import { Keypair } from "@solana/web3.js";

/**
 * 读取JSON文件转成Keypair
 * @param path
 * @returns Keypair
 */
export function createKeypairFromFile(path: string): Keypair {
    return Keypair.fromSecretKey(
        Buffer.from(JSON.parse(require("fs").readFileSync(path, "utf-8")))
    );
}
