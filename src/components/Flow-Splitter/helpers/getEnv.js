export function getFlowSplitterFactoryAddress(wallet) {
    switch(wallet.network.chainId) {
        case 80001: //mumbai
            return process.env.NEXT_PUBLIC_SPLITTER_FACTORY_ADDRESS_POLYGON || "";
        case 42220: //celo
            return process.env.NEXT_PUBLIC_SPLITTER_FACTORY_ADDRESS_CELO || "";
        default:
            return "";
    }
}

export function getblockExplorerUrl(wallet) {
    switch(wallet.network.chainId) {
        case 80001: //mumbai
            return "https://mumbai.polygonscan.com";
        case 42220: //celo
            return "https://celoscan.io";
        default:
            return "";
    }
}