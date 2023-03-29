const ethers = require("ethers")
const { Framework } = require("@superfluid-finance/sdk-core")
const url = process.env.NEXT_PUBLIC_GOERLI_URL
const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
let network, sf, daix;

export default async function getDefaultProvider(){
    return(new Promise(async (res, rej) => {
        try{
            if(!sf || !network || !daix){
                network = await customHttpProvider.getNetwork();
                sf = await Framework.create({
                    chainId: network.chainId,
                    provider: customHttpProvider
                });
                daix = await sf.loadSuperToken("fDAIx");
            }
            res({
                customHttpProvider: customHttpProvider,
                network,
                sf,
                daix
            })
        } catch(e){
            console.log(e);
            rej(false);
        }
    }))
}
