const ethers = require("ethers")
const { Framework } = require("@superfluid-finance/sdk-core")
const url = process.env.NEXT_PUBLIC_GOERLI_URL
const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
let network, sf;

export default async function getDefaultProvider(){
    return(new Promise(async (res, rej) => {
        try{
            if(!sf || !network){
                network = await customHttpProvider.getNetwork()
                sf = await Framework.create({
                    chainId: network.chainId,
                    provider: customHttpProvider
                })
            }
            res({
                customHttpProvider: customHttpProvider,
                network,
                sf
            })
        } catch(e){
            console.log(e);
            rej(false);
        }
    }))
}
