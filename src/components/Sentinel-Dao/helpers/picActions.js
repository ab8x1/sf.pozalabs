import { ethers } from 'ethers';
import PIC from '../../../artifacts/contracts/Pic.sol/PIC.json';
import ERC777ABI from '../../../artifacts/contracts/ERC777.json'
const PICAddress = "0x644Db75f6ccFd5935C7d6dF9F0E0334cf49dd8a9"
const DAIxAddress = "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00"

export const getMaxFctn = (wallet) => {
    return new Promise(async (res, rej) => {
        const {sfSigner, provider, adress} = wallet;
        const pIC = new ethers.Contract(
            PICAddress,
            PIC.abi,
            provider
        );
        const address = await pIC.sentinelDaoToken();
        const sent = new ethers.Contract(
            address,
            ERC777ABI.abi,
            provider
        )
        const userBalance = ethers.utils.formatEther(await sent.balanceOf(adress));
        const ratio = ethers.utils.formatEther(await pIC.calculateSdtWorth());
        res(userBalance * ratio);
    })
}

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
            const daix = new ethers.Contract(
                DAIxAddress,
                ERC777ABI.abi,
                provider
            )
            let tx;
            if(state === "fund")
                {
                    tx = await daix.connect(sfSigner).approve(PICAddress, ethers.utils.parseEther(amount.toString()));
                    await tx.wait();
                    tx = await pIC.connect(sfSigner).fundPIC(ethers.utils.parseEther(amount.toString()));
                }
            else if (state === "become")
                tx = await pIC.connect(sfSigner).becomePIC(ethers.utils.parseEther(amount.toString()), "0x0000000000000000000000000000000000000000000000000000000000000000");
            else if (state === "redeemStake")
                tx = await pIC.connect(sfSigner).redeemPICStake();
            else if (state === "redeemFunds")
                tx = await pIC.connect(sfSigner).redeemFunds(ethers.utils.parseEther(amount.toString()));
            else if (state === "simulate")
                tx = await pIC.connect(sfSigner).simulateLiquidationsRewards(ethers.utils.parseEther(amount.toString()));

            await tx.wait();
            res(true);
        }
        catch(e){
            rej(e);
        }

    })
}