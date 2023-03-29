import {ethers} from "ethers";
import BetOffer from "../../../../artifacts/contracts/PerpetualBets/BetOffer.json";
const BetOfferABI = BetOffer.abi;
const BetOfferAddress = "0x001B9D5e98301e8D81441aB893Ded450d18ACB7a";

export default async function(wallet){
    const {provider, daix} = wallet;
    const betOffer = new ethers.Contract(
        BetOfferAddress,
        BetOfferABI,
        provider
    );
    const price = ethers.utils.formatEther(await betOffer.getLatestPrice())

    const owner = await betOffer.owner()

    let buyer = await betOffer.buyer() //if buyer = 0x0000 = button = buy else outbid, if freezperdioend > currentTimstep grey out outbid
    if(buyer === "0x0000000000000000000000000000000000000000") buyer = null;

    let freezePeriod = ethers.utils.formatEther(await betOffer.freezePeriod()) // 10*18 = s -> convert to dd / hh
    freezePeriod = freezePeriod * 10 ** 18;

    const freezePeriodEnd = ethers.utils.formatEther(await betOffer.freezePeriodEnd()) // expiry utc date

    let strikePrice = ethers.utils.formatEther(await betOffer.strikePrice());
    strikePrice = strikePrice * 10 ** 10;

    const minPaymentFlowRate = ethers.utils.formatEther(await betOffer.minPaymentFlowRate())

    const isCall = await betOffer.isCall()

    return [
        {price, owner, buyer, freezePeriod, freezePeriodEnd, strikePrice, minPaymentFlowRate, isCall, address: BetOfferAddress}
    ]
}