import {ethers} from "ethers";
import BetFactory from "../../../../artifacts/contracts/PerpetualBets/BetFactory.json";
const BetFactoryAbi = BetFactory.abi;
const BetFactoryAddress = process.env.NEXT_PUBLIC_BET_FACTORY_ADDRESS;
import { fetchBet } from "../../Buyer/helpers/getOffers";

export default async function getMyAgreements(wallet){
    const {provider, adress} = wallet;
    const betFactory = new ethers.Contract(
        BetFactoryAddress,
        BetFactoryAbi,
        provider
    );
    const bets = await betFactory.getOffers(adress);
    console.log(bets);
    let offers = [];
    for(const bet of bets){
        const offer = await fetchBet(bet, provider);
        offers.push(offer);
    }
    return offers;
}