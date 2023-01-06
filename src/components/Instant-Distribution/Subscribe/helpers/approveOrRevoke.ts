import { WalletProps } from "../../../App/appTypes";

export default function approveOrRevoke(wallet: WalletProps, id: string, type: string){
    return new Promise(async (res, rej) => {
        try{
            if(wallet){
                const {daix, sfSigner} = wallet;
                const operation = type === "revoke" ? "revokeSubscription" : "approveSubscription";
                const subscribeOperation = daix?.[operation]({
                    indexId: 0,
                    publisher: id
                })
                const tx = await subscribeOperation.exec(sfSigner);
                await tx.wait();
                res(true);
            }
        }
        catch(e){
            console.log(e);
            rej(false);
        }
    })
}