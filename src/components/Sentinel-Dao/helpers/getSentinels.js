import { ethers } from "ethers";
import TogaAbi from '../../../artifacts/contracts/Toga.sol/TOGA.json';
import PicAbi from '../../../artifacts/contracts/Pic.sol/PIC.json';
import getDefaultProvider from "../../../utils/getDefaultProvider";
import polygonData from '../polygon-stats.json';
const PICAddress = "0x644Db75f6ccFd5935C7d6dF9F0E0334cf49dd8a9" //for fDaix

const chains = {
  Goerli: {
    endpoint: 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-goerli',
    tokensAddresses: {
      "0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00": "DAIx",
      "0x5943f705abb6834cad767e6e4bb258bc48d9c947": "ETHx",
      "0x8ae68021f6170e5a766be613cea0d75236ecca9a": "USDCx",
    },
    togaAddress: '0xa54FC15FC75693447d70a57262F37a70B614721b'
  },
  Polygon: {
    endpoint: 'https://thegraph.com/hosted-service/subgraph/superfluid-finance/protocol-v1-matic',
    tokensAddresses: {
      "0x1305f6b6df9dc47159d12eb7ac2804d4a33173c2": "DAIx",
      "0x27e1e4e6bc79d93032abef01025811b7e4727e85": "ETHx",
      "0xcaa7349cea390f89641fe306d93591f87595dc1f": "USDCx",
    },
    togaAddress: "0x6AEAeE5Fd4D05A741723D752D30EE4D72690A8f7"
  }
}


export default function getSentinelsInfo(chain){
    return new Promise(async (res, rej) => {
          try{
            const tokensInfo = await sentinelsInfo(chain);
            res(tokensInfo);
          }
          catch(e){
            console.log(e);
            rej(null);
          }
    })
}

async function sentinelsInfo(chainName){
    return new Promise(async (res, rej) => {
      const chain = chains[chainName];
      const {endpoint, tokensAddresses, togaAddress} = chain;
      const tokens = Object.keys(tokensAddresses);
        let tokensInfo = {};
        let data;
        const {customHttpProvider} = await getDefaultProvider();
        const toga = new ethers.Contract(
          togaAddress,
          TogaAbi.abi,
          customHttpProvider
        );
        const pIC = new ethers.Contract(
          PICAddress,
          PicAbi.abi,
          customHttpProvider
      )

      if(chainName === "Goerli"){
        for(const token of tokens){
          const {bond, pic} = await toga.getCurrentPICInfo(token) || {};
          tokensInfo[token] = {
            stake: Number(ethers.utils.formatEther(bond?._hex)).toFixed(2),
            sentinel: pic,
            daoControlled: pic === PICAddress
          }
          const daoFunds = Number(Number(ethers.utils.formatEther(await pIC.stakeAndBalance())).toFixed(2));
          tokensInfo[token]['daoFunds'] = daoFunds;
        }
        tokensInfo["0x5943f705abb6834cad767e6e4bb258bc48d9c947"]['daoFunds'] = 0;
        tokensInfo["0x8ae68021f6170e5a766be613cea0d75236ecca9a"]['daoFunds'] = 0;

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

        const headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        };

        const body = JSON.stringify({ query });

        const response = await fetch(endpoint, { method: 'POST', headers, body });

        data = await response.json();
      }
      else{
        data = polygonData;
      }

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
        console.log(graphInfo);
        if(chainName === "Polygon"){
          tokensInfo = {
            ...tokensInfo, ...polygonData.tokensInfo
          }
        }
        for(const token of tokens){
          tokensInfo[token]['apr'] = {
            '7d': Math.ceil(((graphInfo[token]['rewards']['7d'] * (10 ** -18) * 52 )/ (tokensInfo[token]['stake'])) * 100),
            '30d': Math.ceil(((graphInfo[token]['rewards']['7d'] * (10 ** -18) * 12) / (tokensInfo[token]['stake'])) * 100)
          }
          tokensInfo[token]['transactions'] = graphInfo[token]['transactions']
          tokensInfo[token]['name'] = chain['tokensAddresses'][token];
        }

        res(tokensInfo);
    })
  }