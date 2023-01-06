const TokenSpreaderJSON = require("../../../../artifacts/contracts/TokenSpreader.sol/TokenSpreader.json")
const TokenSpreaderABI = TokenSpreaderJSON.abi
const deployedTokenSpreaderAddress = "0xF4013E48dB685925E5Dda6aB412d008aE7EBE4d4"
import { ethers } from "ethers"

export async function gainShare(wallet) {
    return new Promise(async (res, rej) => {
        const {sf, provider} = wallet;
        const signer = wallet.sfSigner;
        let shareGainer = signer;
        const adress = {wallet};
        const daix = await sf.loadSuperToken("fDAIx") //get fDAIx on goerli

        const tokenSpreader = new ethers.Contract(
            deployedTokenSpreaderAddress,
            TokenSpreaderABI,
            provider
        );

        try {
            // shareGainer will subscribe to tokenSpreader's index so that tokens will successfully go through to them
            // NOTE: if an account is not subscribed, but receives a distribution, its tokens will essentially “hang in limbo” until the account subscribes, after which they will go through
            const subscribeOperation = sf.idaV1.approveSubscription({
                indexId: await tokenSpreader.INDEX_ID(),
                superToken: daix.address,
                publisher: tokenSpreader.address
            })
            await subscribeOperation.exec(shareGainer);
        }
        catch (err) {
            if (err.errorObject.errorObject.error.reason ==  "execution reverted: IDA: E_SUBS_APPROVED") {
                console.log("shareGainer already approved subscription. moving on ->")
            }
        }

        try{
            // const gainShareTx = await tokenSpreader
            // .connect(signer)
            // .gainShare("0xc9Af52479073A30101f3F18Ce11f6e6571b5a64C")
            // await gainShareTx.wait();
            // console.log(
            //     `New ${adress} units held:`,
            //     (
            //         await sf.idaV1.getSubscription({
            //             superToken: daix.address,
            //             publisher: tokenSpreader.address,
            //             indexId: await tokenSpreader.INDEX_ID(),
            //             subscriber: "0xc9Af52479073A30101f3F18Ce11f6e6571b5a64C",
            //             providerOrSigner: signer
            //         })
            //     ).units
            // )
            res(true);
        }
        catch(e){
            // rej(e);
        }
    })
}