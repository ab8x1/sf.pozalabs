import { ethers } from "ethers";
import BetFactory from "../../../../artifacts/contracts/PerpetualBets/BetFactory.json";
const BetFactoryAbi = BetFactory.abi;
const chainLinkOracleAddress = process.env.NEXT_PUBLIC_CHAINLINK_ORACLE_ADDRESS;
const BetFactoryAddress = process.env.NEXT_PUBLIC_BET_FACTORY_ADDRESS;

export const tokens = {
    "BTC": "0xA39434A63A52E749F02807ae27335515BA4b07F7",
    "ETH": "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    "Link": "0x48731cF7e84dc94C5f84577882c14Be11a5B7456",
}

export default async function createOffer(wallet, data){
    return new Promise(async(res, rej) => {
        try{
            let {flowRate, call, strikePrice, period, token} = data;
            flowRate = ethers.utils.parseEther(flowRate.toString());
            flowRate = Math.floor(Number(flowRate) / 3600 / 24 / 30).toString();
            strikePrice = (strikePrice * 10 ** -10).toFixed(20);

            const periodInSeconds = ((period?.freezeDays * 24 * 60 * 60) || 0) + ((period?.freezeHours * 60 * 60) || 0) + ((period?.freezeMinutes * 60) || 0);
            console.log(periodInSeconds);
            const {sfSigner, adress, provider, sf} = wallet;

            const betFactory = new ethers.Contract(
                BetFactoryAddress,
                BetFactoryAbi,
                sfSigner
            );

            const createTx = await betFactory
                .connect(sfSigner)
                .createNewOffer(
                    flowRate, //minPaymentFlowRate
                    call, //isCall (checkbox)
                    periodInSeconds, //freezePeriod
                    ethers.utils.parseEther(strikePrice), //strikePrice
                    sf.settings.config.hostAddress, //address of host
                    tokens[token],
                );

            await createTx.wait();

        }
        catch(e){
            console.log(e);
        }
    })
}