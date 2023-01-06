import { ethers } from "ethers"
import { WalletProps } from "../../../App/appTypes"
import TokenSpreaderJSON  from '../../../../artifacts/contracts/TokenSpreader.sol/TokenSpreader.json'
const TokenSpreaderABI = TokenSpreaderJSON.abi
import {AgreementsChanges} from '../AgreementTypes'
const SpreaderFactoryABI = require("../../../../artifacts/contracts/SpreaderFactory.sol/SpreaderFactory.json").abi;
const SpreaderFactoryAddress = process.env.NEXT_PUBLIC_SPREADER_FACTORY_ADDRESS || "";

export default function createOrEditAgreement(wallet: WalletProps, type: "create" | "edit", changes: AgreementsChanges[], agreementId?: string): Promise<string>{
    return new Promise(async (res, rej) => {
        try{
            if(wallet){
                const {sf, sfSigner, provider, adress} = wallet;
                const daix = await sf.loadSuperToken("fDAIx");
                let userAgreement = agreementId || "";
                if(type === "create"){
                    const spreaderFactory = new ethers.Contract(
                        SpreaderFactoryAddress,
                        SpreaderFactoryABI,
                        provider
                    );
                    const tx = await spreaderFactory.connect(sfSigner).createNewSpreader(
                        sf.settings.config.hostAddress,
                        daix.address
                    )
                    console.log( "deployment successful! here is your tx hash: ", tx.hash)
                    await tx.wait();
                    const spreaderArraySender = await spreaderFactory.getOwnerSpreaders(adress);
                    userAgreement = spreaderArraySender[spreaderArraySender.length - 1];
                    console.log(`New user agreement: ${userAgreement}`);
                }
                // Token spreader is created with a user agreement: new or existing
                const tokenSpreader = new ethers.Contract(
                    userAgreement || "",
                    TokenSpreaderABI,
                    provider
                )
                for(const change of changes){
                    const {address, units, type} = change;
                    console.log(type);
                    let tx;
                    switch(type){
                        case "new":
                        case "gain":
                            tx = await tokenSpreader.connect(sfSigner).gainShares(address, units);
                        break;
                        case "lose":
                            tx = await tokenSpreader.connect(sfSigner).loseShares(address, units);
                        break;
                        case "delete":
                            tx = await tokenSpreader.connect(sfSigner).deleteShares(address);
                        break;
                    }
                    if(tx)
                        await tx.wait();
                }
                res(userAgreement);
            }
        }
        catch(e){
            console.log(e);
            rej(false);
        }
    })
}