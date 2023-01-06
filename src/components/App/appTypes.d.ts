import { Dispatch, SetStateAction } from "react";
import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import { SuperToken } from "@superfluid-finance/sdk-core/dist/module/typechain";

export type ChildrenProps = {
    children?: React.ReactNode;
};

export type WalletType = {
    adress: string,
    balanceInEth: string,
    network: {
        chainId: number,
        name: string
    },
    provider: ethers.providers.Provider,
    sf: Framework,
    sfSigner: ethers.Signer,
    daix: any
}

export type WalletProps = undefined | null | WalletType;

export type GlobalContextProps = {
    wallet?: WalletProps,
    connectWallet: (initialization: boolean) => void
}