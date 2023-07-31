import { ethers } from "ethers";
import { WalletProps } from "../../App/appTypes";
import FlowSplitterJSON from "../../../artifacts/contracts/FlowSplitter.sol/FlowSplitter.json";
const FlowSplitterABI = FlowSplitterJSON.abi;
import { getSplitterContract } from "./getSplitters";
import { SplittersChanges } from "../SplitterTypes";
import { getFlowSplitterFactoryAddress } from "./getEnv";
const FlowSplitterFactoryABI =
  require("../../../artifacts/contracts/FlowSplitterFactory.sol/FlowSplitterFactory.json").abi;

export default function createOrEditSplitter(
  wallet: WalletProps,
  type: "create" | "edit",
  changes: SplittersChanges[],
  SplitterAddress?: string
): Promise<string> {
  return new Promise(async (res, rej) => {
    try {
      if (wallet) {
        const { sf, sfSigner, provider, adress: adress, daix } = wallet;
        const FlowSplitterFactoryAddress = getFlowSplitterFactoryAddress(wallet);
        let splitterAddress = SplitterAddress || "";
        if (type === "create") {
          const flowSplitterFactory = new ethers.Contract(
            FlowSplitterFactoryAddress,
            FlowSplitterFactoryABI,
            provider
          );
          const newReceivers = changes.map(c => c.address);
          const newUnits = changes.map(c => c.units);
          const tx = await flowSplitterFactory
            .connect(sfSigner)
            .createNewSplitter(
              newReceivers,
              newUnits,
              daix.address,
              sf.settings.config.hostAddress
            );
          console.log("tx registered! here is your tx hash: ", tx.hash);
          await tx.wait();
          const flowSplitterArraySender =
            await flowSplitterFactory.getSplittersByOwner(adress);
          splitterAddress = flowSplitterArraySender.at(-1);
          console.log(`new splitter address: ${splitterAddress}`);
        } else {
          console.log(`current splitter address: ${splitterAddress}`);
          const flowSplitter = getSplitterContract(splitterAddress, wallet.provider);

          let tx;
          for (const change of changes) {
            const {address, units, type} = change;
            if(type !== "noChange") {
              tx = await flowSplitter.connect(sfSigner).updateSplit(units, address);
            }
          }
          if(tx) {
            console.log("tx registered! here is your tx hash: ", tx.hash);
            await tx.wait();
          }

        }
        res(splitterAddress);
      }
    } catch (e) {
      console.log(e);
      rej(false);
    }
  });
}
