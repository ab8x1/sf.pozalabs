import { ethers } from "ethers";
import { WalletProps, WalletType } from "../../App/appTypes";
const FlowSplitterFactoryABI =
  require("../../../artifacts/contracts/FlowSplitterFactory.sol/FlowSplitterFactory.json").abi;
  const FlowSplitterABI =
  require("../../../artifacts/contracts/FlowSplitter.sol/FlowSplitter.json").abi;
import { SplitterTypes, SplitterTypesNew, SubscriberNew } from "../SplitterTypes";
import { getFlowSplitterFactoryAddress } from "./getEnv";

export default function getSplitters(
  wallet: WalletProps
): Promise<null | SplitterTypes[]> {
  return new Promise(async (res, rej) => {
    if (wallet) {
      try {
        const { provider, adress: adress } = wallet;
        const FlowSplitterFactoryAddress = getFlowSplitterFactoryAddress(wallet);
        const splitterFactory = new ethers.Contract(
          FlowSplitterFactoryAddress,
          FlowSplitterFactoryABI,
          provider
        );
        const splittersAddressArray = await splitterFactory.getSplittersByOwner(
          adress
        );
        if (splittersAddressArray.length > 0) {
          const splitters = await splittersAddressArray.map(
            (splitterAddress: string) => {
              return fetchSplitterSingle(splitterAddress, wallet)
            }
          )
          const splittersData = await Promise.all(splitters)
          res(splittersData);
        } else res(null);
      } catch (e) {
        console.log(e);
        rej(null);
      }
    }
  });
}

export async function getFlowToSplitter(flowSplitterAddress:any, wallet: WalletProps) {
  if (wallet) {
    const { provider, daix, adress } = wallet;
    const flowToSplitter = await daix.getFlow({
      sender: adress,
      receiver: flowSplitterAddress,
      providerOrSigner: provider
    })

    const monthlySplitterFlow = monthlyAmount(flowToSplitter.flowRate)

    return monthlySplitterFlow
  }
}

async function getReceiverDetails(receiverAddrs:string, flowSplitter:any, wallet: WalletProps) {
  if (wallet) {
    const { provider, daix } = wallet;

    const flow = await daix.getFlow({
      sender: flowSplitter.address,
      receiver: receiverAddrs,
      providerOrSigner: provider
    });

    const units = await flowSplitter.getFlowByReceiver(receiverAddrs);
    const SubscriberNew:SubscriberNew = {
      address: receiverAddrs,
      units: Number(units),
      flow: monthlyAmount(flow.flowRate)
    }
    return SubscriberNew;
  }
  return {};
}

export async function fetchSplitterSingle(flowSplitterAddress:any, wallet: WalletProps){
  return new Promise(async (res, rej) => {
    if(wallet) {
      const { provider, daix, adress: adress } = wallet;
      const flowSplitter = getSplitterContract(flowSplitterAddress, provider);
      
      const [receiverAddrs, totalOutflow] = await fetchReceiversAndOutflow(flowSplitter);
      
      const receivers:SubscriberNew[] = await Promise.all(receiverAddrs.map(async (receiverAddr: string) => getReceiverDetails(receiverAddr, flowSplitter, wallet)))
      
      
      const SplittersNew: SplitterTypesNew = {
        address: flowSplitterAddress,
        receivers: receivers,
        totalOutflow: totalOutflow
      }

      res(SplittersNew);
    }
    rej("Wallet not connected")
  })
  }

const monthlyAmount = (totalFlow: ethers.BigNumberish) => +((+(ethers.utils.formatEther(totalFlow))* 3600 * 24 * 30).toFixed(2));

export async function fetchReceiversAndOutflow(flowSplitter: ethers.Contract) {
  const [receiverAddrs, totalOutflow] = await Promise.all([flowSplitter.getReceivers(),flowSplitter.calcTotalOutflow()]);
  return [receiverAddrs, monthlyAmount(totalOutflow)];
}

export function getSplitterContract(flowSplitterAddress:string, provider: ethers.providers.Provider) {
  return new ethers.Contract(
    flowSplitterAddress,
      FlowSplitterABI,
      provider
  );
}