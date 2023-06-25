import { ethers } from "ethers"
import { WalletProps } from "../../../App/appTypes"
const SpreaderFactoryABI = require("../../../../artifacts/contracts/SpreaderFactory.sol/SpreaderFactory.json").abi;
const SpreaderFactoryAddress = process.env.NEXT_PUBLIC_SPREADER_FACTORY_ADDRESS || "";
import { AgreementTypes } from "../AgreementTypes";

export default function getAgreements(wallet: WalletProps): Promise<null | AgreementTypes[]>{
    return new Promise(async (res, rej) => {
        if(wallet){
            try{
                const {provider, adress: adress} = wallet;

                const spreaderFactory = new ethers.Contract(
                    SpreaderFactoryAddress,
                    SpreaderFactoryABI,
                    provider
                );
                const spreaderArraySender = await spreaderFactory.getOwnerSpreaders(adress);
                if(spreaderArraySender. length > 0){
                  const agreements = await agreementsInfo(spreaderArraySender);
                  res(agreements);
                }
                else
                  res(null);
            }
            catch(e){
              console.log(e);
              rej(null);
            }
        }
    })
}

async function agreementsInfo(agreements: string[]): Promise<AgreementTypes[]>{
    return new Promise(async (res, rej) => {
        const query = `
          {
            accounts(
              where: {
                id_in:["${agreements.join('","').toLocaleLowerCase()}"]
              }
              orderBy: createdAtTimestamp
              orderDirection: desc
            )
            {
              id
              publishedIndexes {
                totalUnits
                subscriptions(
	        	orderBy: createdAtTimestamp
			where:{
				units_not: "0"
			}
                ) {
                  subscriber {
                    id
                  }
                  units
                  approved
                }
              }
            }
          }
        `
        const endpoint = `https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-goerli?timeStamp=${Date.now()}`;

        const headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        };

        const body = JSON.stringify({ query });

        const response = await fetch(endpoint, { method: 'POST', headers, body });

        if (response.ok) {
          const data = await response.json();
          const agreements: AgreementTypes[] = data.data.accounts.map((agreement: any) => ({
            id: agreement.id,
            subscribers: agreement.publishedIndexes[0].subscriptions.map((sub: any) => ({
              address: sub.subscriber.id,
              units: sub.units,
              approved: sub.approved

            }))
          }))
          res(agreements);
        }
        else {
          rej(`Failed to execute GraphQL query: ${response.statusText}`);
        }
    })
  }
