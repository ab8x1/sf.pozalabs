import {ethers} from "ethers";
import BetOffer from "../../../../artifacts/contracts/PerpetualBets/BetOffer.json";
const BetOfferABI = BetOffer.abi;
const BetOfferAddress = "0x001B9D5e98301e8D81441aB893Ded450d18ACB7a";
import getDefaultProvider from "../../../../utils/getDefaultProvider";
import BetFactory from "../../../../artifacts/contracts/PerpetualBets/BetFactory.json";
const BetFactoryAbi = BetFactory.abi;
const BetFactoryAddress = process.env.NEXT_PUBLIC_BET_FACTORY_ADDRESS;

export default async function cancelBet(wallet, bet){
    const {sfSigner} = wallet;
    console.log(bet);
    const betOffer = new ethers.Contract(
        bet,
        BetOfferABI,
        sfSigner
    );
    await betOffer.connect(sfSigner).cancelBet();
}