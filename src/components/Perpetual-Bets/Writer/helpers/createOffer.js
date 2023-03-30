import { ethers } from "ethers";
import BetFactory from "../../../../artifacts/contracts/PerpetualBets/BetFactory.json";
const BetFactoryAbi = BetFactory.abi;
const chainLinkOracleAddress = process.env.NEXT_PUBLIC_CHAINLINK_ORACLE_ADDRESS;
const BetFactoryAddress = process.env.NEXT_PUBLIC_BET_FACTORY_ADDRESS;

export default async function createOffer(wallet, data){
    return new Promise(async(res, rej) => {
        try{
            let {flowRate, call, strikePrice, period} = data;
            flowRate = ethers.utils.parseEther(flowRate.toString());
            flowRate = Math.floor(Number(flowRate) / 3600).toString();
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
                    chainLinkOracleAddress //chainlink oracle
                );

            await createTx.wait();

        }
        catch(e){
            console.log(e);
        }
    })
}