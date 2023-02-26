import { ethers } from 'ethers';
import PIC from '../../../artifacts/contracts/Pic.sol/PIC.json';
const PICAddress = "0x115CaF42FDA1C35fA2184b93b2561096416a23b3"

export default function picActions(wallet, amount, state, tokenData){ console.log(state);
    return new Promise(async (res, rej) => {

        try{
            const {stake} = tokenData;
            const {sfSigner, provider} = wallet;
            const pIC = new ethers.Contract(
                PICAddress,
                PIC.abi,
                provider
            );
            let tx;
            if(state === "fund")
                tx = await pIC.connect(sfSigner).fundPIC(ethers.utils.parseEther(amount.toString()));
            else if (state === "become")
                tx = await pIC.connect(sfSigner).becomePIC(stake, "0x0000000000000000000000000000000000000000000000000000000000000000");
            else if (state === "redeemStake")
                tx = await pIC.connect(sfSigner).redeemPICStake();
            else if (state === "redeemFunds")
                tx = await pIC.connect(sfSigner).redeemFunds(amount);

            await tx.wait();
            res(true);
        }
        catch(e){
            rej(e);
        }

    })
}