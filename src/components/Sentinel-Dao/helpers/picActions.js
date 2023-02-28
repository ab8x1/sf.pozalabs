import { ethers } from 'ethers';
import PIC from '../../../artifacts/contracts/Pic.sol/PIC.json';
import ERC777ABI from '../../../artifacts/contracts/ERC777.json'
const DaixPic = process.env.NEXT_PUBLIC_DAIX_PIC;
import { picsAddresses } from './getSentinels';

export const getMaxFctn = (wallet, tokenData) => {
    return new Promise(async (res, rej) => {
        try{
            const {name} = tokenData;
            const {provider, adress} = wallet;
            const pIC = new ethers.Contract(
                picsAddresses[name],
                PIC.abi,
                provider
            );
            const daoTokenaddress = await pIC.sentinelDaoToken();
            const sent = new ethers.Contract(
                daoTokenaddress,
                ERC777ABI.abi,
                provider
            )
            const userBalance = ethers.utils.formatEther(await sent.balanceOf(adress));
            const ratio = ethers.utils.formatEther(await pIC.calculateSdtWorth());
            res(userBalance * ratio);
        }
        catch(e){
            rej(e)
        }
    })
}

export default function picActions(wallet, amount, state, tokenData){ console.log(tokenData);
    return new Promise(async (res, rej) => {
        try{
            const {name, address} = tokenData;
            const {sfSigner, provider} = wallet;
            const pIC = new ethers.Contract(
                picsAddresses[name],
                PIC.abi,
                provider
            );
            const tokenContract = new ethers.Contract(
                address,
                ERC777ABI.abi,
                provider
            )
            let tx;
            if(state === "fund")
                {
                    tx = await tokenContract.connect(sfSigner).approve(picsAddresses[name], ethers.utils.parseEther(amount.toString()));
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