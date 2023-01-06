import { SubscriptionType } from "../SubscriptionTypes";
import { WalletProps } from "../../../App/appTypes";

export default function getSubscriptions(wallet: WalletProps): Promise<null | SubscriptionType[]>{
  return new Promise(async (res, rej) => {
      if(wallet){
          try{
              const subscriptions = await subscriptionsInfo(wallet.adress);
              if(subscriptions.length > 0)
                res(subscriptions)
              else
                res(null)
          }
          catch(e){
            console.log(e);
            rej(null);
          }
      }
  })
}

async function subscriptionsInfo(id: string): Promise<SubscriptionType[]>{
    return new Promise(async (res, rej) => {
        const query = `
            {
                accounts(where: {
                id: "${id.toLocaleLowerCase()}"
                }) {
                subscriptions(orderBy: createdAtTimestamp orderDirection:desc){
                    index {
                    publisher{
                        id
                    }
                    totalUnits
                    }
                    approved
                    units
                }
            }
            }
        `
        const endpoint = 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-goerli';

        const headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        };

        const body = JSON.stringify({ query });

        const response = await fetch(endpoint, { method: 'POST', headers, body });
        if (response.ok) {
          const data = await response.json();
          const subs: SubscriptionType[] = data.data.accounts[0].subscriptions.map((sub: any) => ({
            id: sub.index.publisher.id,
            shares: Number(((Number(sub.units) / Number(sub.index.totalUnits)) * 100).toFixed(2)),
            isApproved: sub.approved
          }))
          res(subs);
        }
        else {
          rej(`Failed to execute GraphQL query: ${response.statusText}`);
        }
    })
  }