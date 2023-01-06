import TokenSpreaderJSON  from '../../../../artifacts/contracts/TokenSpreader.sol/TokenSpreader.json'
const TokenSpreaderABI = TokenSpreaderJSON.abi
import { WalletType } from '../../../App/appTypes';
import { ethers } from 'ethers';

export default function distribute(wallet: WalletType, agreementId: string, amount: number): Promise<boolean>{
    return new Promise(async (res, rej) => {
        try{
            const {sfSigner} = wallet;
            const tokenSpreader = new ethers.Contract(
                agreementId,
                TokenSpreaderABI,
                sfSigner
            );
            const decimals = 18;
            const amountFormatted = ethers.utils.parseUnits(amount.toString(), decimals);
            const distributeTx = await tokenSpreader.connect(sfSigner).distribute(amountFormatted);
            await distributeTx.wait()
            res(true);
        }
        catch(e){
            console.log(e);
            rej(e);
        }
    })
}