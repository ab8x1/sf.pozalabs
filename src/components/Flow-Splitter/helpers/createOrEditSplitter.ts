import { ethers } from "ethers";
import { WalletProps } from "../../App/appTypes";
import FlowSplitterJSON from "../../../artifacts/contracts/FlowSplitter.sol/FlowSplitter.json";
const FlowSplitterABI = FlowSplitterJSON.abi;
import { SplittersChanges } from "../SplitterTypes";
import { getFlows } from "./getSplitters";
const FlowSplitterFactoryABI =
  require("../../../artifacts/contracts/FlowSplitterFactory.sol/FlowSplitterFactory.json").abi;
const FlowSplitterFactoryAddress =
  process.env.NEXT_PUBLIC_SPLITTER_FACTORY_ADDRESS || "";

export default function createOrEditSplitter(
  wallet: WalletProps,
  type: "create" | "edit",
  units: number,
  mainReceiver: string,
  sideReceiver: string,
  SplitterAddress?: string
): Promise<string[]> {
  return new Promise(async (res, rej) => {
    try {
      if (wallet) {
        const { sf, sfSigner, provider, adress: adress } = wallet;
        const daix = await sf.loadSuperToken("fDAIx");
        let splitterAddress = SplitterAddress || "";
        if (type === "create") {
          const flowSplitterFactory = new ethers.Contract(
            FlowSplitterFactoryAddress,
            FlowSplitterFactoryABI,
            provider
          );

          const tx = await flowSplitterFactory
            .connect(sfSigner)
            .createNewSplitter(
              mainReceiver,
              sideReceiver,
              units,
              daix.address,
              sf.settings.config.hostAddress
          );
          console.log("tx registered! here is your tx hash: ", tx.hash);
          await tx.wait();
          const flowSplitterArraySender = await flowSplitterFactory.getSplittersByOwner(
            adress
          );
          splitterAddress = flowSplitterArraySender.at(-1);
          const {monthlyMainFlow, monthlySideFlow} = await getFlows(mainReceiver, sideReceiver, splitterAddress, wallet)
          console.log(`new splitter address:`)
          console.log(splitterAddress)
          res([splitterAddress, monthlyMainFlow, monthlySideFlow])
        } else {
          const flowSplitter = new ethers.Contract(
            splitterAddress || "",
            FlowSplitterABI,
            provider
          );
  
          const tx = await flowSplitter
            .connect(sfSigner)
            .updateSplit(units);
          console.log("tx registered! here is your tx hash: ", tx.hash);
          await tx.wait();
  
          const {monthlyMainFlow, monthlySideFlow} = await getFlows(mainReceiver, sideReceiver, splitterAddress, wallet)
  
          res([splitterAddress, monthlyMainFlow, monthlySideFlow]);
        }
      }
    } catch (e) {
      console.log(e);
      rej(false);
    }
  });
}
