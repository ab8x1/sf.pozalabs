import { WalletType } from "../../../App/appTypes";
import { ethers } from "ethers";

export default async function transferAssets(wallet: WalletType, amount: number, id: string){
    return new Promise(async (res, rej) => {
        try{
            const {daix, sfSigner} = wallet;
            const decimals = 18;
            const amountFormatted = ethers.utils.parseUnits(amount.toString(), decimals);
            const transfer = daix.transfer({
                receiver: id,
                amount: amountFormatted
            });
        
            const tx = await transfer.exec(sfSigner);
            await tx.wait();
            res(true);
        }
        catch(e){
            rej(e);
        }
    })
}