"use client";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import React, { useMemo } from "react";

// const WalletModalProviderStyled = styled(WalletModalProvider)(() => ({
//     zIndex: 2000,
// }));

interface Props {
    children: React.JSX.ElementType;
}
const withWalletContent: (
    Component: React.JSX.ElementType
) => React.FC<Props> =
    Component =>
    // eslint-disable-next-line react/display-name
    props => {
        const network = WalletAdapterNetwork.Devnet;
        const endpoint = clusterApiUrl(network);
        const wallets = useMemo(
            () => [
                new PhantomWalletAdapter(),
                new SolflareWalletAdapter({ network }),
            ],
            [network]
        );
        return (
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    <WalletModalProvider>
                        <Component {...props} />
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        );
    };
export default withWalletContent;
