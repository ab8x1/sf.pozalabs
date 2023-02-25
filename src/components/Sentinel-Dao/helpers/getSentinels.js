import { ethers } from "ethers";
import TogaAbi from '../../../artifacts/contracts/Toga.sol/TOGA.json';
import PicAbi from '../../../artifacts/contracts/Pic.sol/PIC.json';
import getDefaultProvider from "../../../utils/getDefaultProvider";
const PICAddress = "0x115CaF42FDA1C35fA2184b93b2561096416a23b3" //for fDaix

export const tokensNames = {
  "0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00": "DAIx",
  "0x5943f705abb6834cad767e6e4bb258bc48d9c947": "ETHx",
  "0x8ae68021f6170e5a766be613cea0d75236ecca9a": "USDCx",
  "0x95697ec24439e3eb7ba588c7b279b9b369236941": "TUSDx",
}

export const tokens = [
  "0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00", //"DAIx",
  "0x5943f705abb6834cad767e6e4bb258bc48d9c947", //"ETHx",
  "0x8ae68021f6170e5a766be613cea0d75236ecca9a", //"USDCx",
  "0x95697ec24439e3eb7ba588c7b279b9b369236941", //"TUSDx"
]

export default function getSentinelsInfo(){
    return new Promise(async (res, rej) => {
          try{
            const tokensInfo = await sentinelsInfo();
            res(tokensInfo);
          }
          catch(e){
            console.log(e);
            rej(null);
          }
    })
}

async function sentinelsInfo(){
    return new Promise(async (res, rej) => {
        let tokensInfo = {};
        const {customHttpProvider} = await getDefaultProvider();
        const toga = new ethers.Contract(
          "0xa54FC15FC75693447d70a57262F37a70B614721b",
          TogaAbi.abi,
          customHttpProvider
        );
        const pIC = new ethers.Contract(
          PICAddress,
          PicAbi.abi,
          customHttpProvider
      )
        for(const token of tokens){
          const {bond, pic} = await toga.getCurrentPICInfo(token) || {};
          tokensInfo[token] = {
            stake: Math.round(Number(ethers.utils.formatEther(bond?._hex))),
            sentinel: pic,
            daoControlled: pic === PICAddress
          }
          const daoFunds = ethers.utils.formatEther(await pIC.stakeAndBalance());
          tokensInfo[token]['daoFunds'] = daoFunds;
        }

      const query = `
        {
          agreementLiquidatedV2Events(
            where: {token_in: ["${tokens.join('","')}"],
            timestamp_gte: "${Math.ceil((Date.now() / 1000) - 60 * 60 * 24 * 30)}"}
            orderBy: timestamp
            orderDirection: desc
            first: 1000
          ) {
            rewardAmount
            token
            timestamp
            gasUsed
            gasPrice
          }
        }
      `
        const endpoint = `https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-goerli`;

        const headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        };

        const body = JSON.stringify({ query });

        const response = await fetch(endpoint, { method: 'POST', headers, body });

        if (response.ok) {
          const data = await response.json();
          const time7dAgo = Math.ceil((Date.now() / 1000) - 60 * 60 * 24 * 7);
          const graphInfo = data?.data?.agreementLiquidatedV2Events?.reduce((acc, {token, timestamp, rewardAmount, gasPrice, gasUsed}) => {
            let txFee = Number(gasPrice) * Number(gasUsed);
            if(token !== "0x5943f705abb6834cad767e6e4bb258bc48d9c947") txFee *= 10;
            const reward = Number(rewardAmount);
            const transactionsInfo = acc[token]?.transactions || {
              total: 0,
              jackPot: 0,
              unprofitable: 0
            };
            transactionsInfo['total'] = transactionsInfo['total'] + 1;
            if(txFee > reward) transactionsInfo['unprofitable'] = transactionsInfo['unprofitable'] + 1;
            if(token === "0x5943f705abb6834cad767e6e4bb258bc48d9c947"){
              if(reward > 10 ** 17) transactionsInfo['jackPot'] = transactionsInfo['jackPot'] + 1;
            }
            else{
              if(reward > 5 * 10 ** 18) transactionsInfo['jackPot'] = transactionsInfo['jackPot'] + 1;
            }
            const createdAt = Number(timestamp);
            let tokenRewards = acc[token]?.rewards || {
              ['7d']: 0,
              ['30d']: 0,
            };

            tokenRewards['30d'] = tokenRewards['30d'] + reward;
            if(createdAt > time7dAgo){
              tokenRewards['7d'] = tokenRewards['7d'] + reward;
            }
            return {
              ...acc, [token]: {
                rewards: tokenRewards,
                transactions: transactionsInfo
              }
            }
          }, {});
          for(const token of tokens){
            tokensInfo[token]['apr'] = {
              '7d': Math.ceil(((graphInfo[token]['rewards']['7d'] * (10 ** -18) * 52 )/ (tokensInfo[token]['stake'])) * 100),
              '30d': Math.ceil(((graphInfo[token]['rewards']['7d'] * (10 ** -18) * 12) / (tokensInfo[token]['stake'])) * 100)
            }
            tokensInfo[token]['transactions'] = graphInfo[token]['transactions']
          }
          res(tokensInfo);
        }
        else {
          rej(`Failed to execute GraphQL query: ${response.statusText}`);
        }
    })
  }