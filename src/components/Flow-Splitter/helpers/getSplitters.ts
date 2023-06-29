import { ethers } from "ethers";
import { WalletProps, WalletType } from "../../App/appTypes";
const FlowSplitterFactoryABI =
  require("../../../artifacts/contracts/FlowSplitterFactory.sol/FlowSplitterFactory.json").abi;
  const FlowSplitterABI =
  require("../../../artifacts/contracts/FlowSplitter.sol/FlowSplitter.json").abi;
const FlowSplitterFactoryAddress =
  process.env.NEXT_PUBLIC_SPLITTER_FACTORY_ADDRESS || "";
import { SplitterTypes, SplitterTypesNew } from "../SplitterTypes";

export default function getSplitters(
  wallet: WalletProps
): Promise<null | SplitterTypes[]> {
  return new Promise(async (res, rej) => {
    if (wallet) {
      try {
        const { provider, adress: adress } = wallet;

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

    const monthlySplitterFlow = monthlyAmount(flowToSplitter)

    return monthlySplitterFlow
  }
}

export async function getFlows(mainReceiver:string, sideReceiver:string, flowSplitterAddress:string, wallet: WalletProps) {
  if (wallet) {
    const { provider, daix } = wallet;
    const mainReceiverFlow = await daix.getFlow({
      sender: flowSplitterAddress,
      receiver: mainReceiver,
      providerOrSigner: provider
    })

    const sideReceiverFlow = await daix.getFlow({
      sender: flowSplitterAddress,
      receiver: sideReceiver,
      providerOrSigner: provider
    })

    const monthlyMainFlow = monthlyAmount(mainReceiverFlow)
    const monthlySideFlow = monthlyAmount(sideReceiverFlow)

    return {monthlyMainFlow, monthlySideFlow}
  }

  // default return in case wallet is not defined
  return {monthlyMainFlow: 0, monthlySideFlow: 0}
}

export async function fetchSplitterSingle(flowSplitterAddress:any, wallet: WalletProps){
  return new Promise(async (res, rej) => {
    if(wallet) {
      const { provider, daix, adress: adress } = wallet;
      const flowSplitter = new ethers.Contract(
        flowSplitterAddress,
          FlowSplitterABI,
          provider
      );
      
      const [mainReceiver, sideReceiver, sideReceiverPortion] = await Promise.all([flowSplitter.mainReceiver(),flowSplitter.sideReceiver(), flowSplitter.sideReceiverPortion()]);
      
      const {monthlyMainFlow, monthlySideFlow} = await getFlows(mainReceiver, sideReceiver, flowSplitterAddress, wallet)
      
      const SplittersNew: SplitterTypesNew = {
        address: flowSplitterAddress,
        sideReceiver: {
          address: sideReceiver,
          units: sideReceiverPortion,
          flow: monthlySideFlow
        },
        mainReceiver: {
          address: mainReceiver,
          units: 1000 - sideReceiverPortion,
          flow: monthlyMainFlow
        }      
      }

      res(SplittersNew);
    }
    rej("Wallet not connected")
  })
  }

const monthlyAmount = (flow: { flowRate: ethers.BigNumberish }) => Number((Number(ethers.utils.formatEther(flow.flowRate)) * 3600 * 24 * 30).toFixed(2));