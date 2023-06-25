import { memo } from "react";
import { DisplayContainer, LoadingContainer } from "../Borrow-Against-Salary/Offers/offersStyles";
import { FormHeader, HeaderText } from "../Borrow-Against-Salary/Borrow/borrowStyles";
import {OwnedSplittersProps, SplitterTypes} from './SplitterTypes'
import {OwnedSplittersContainer} from './SplitterStyles'
import {ConnectMetamask} from '../Navbar/navbarStyles'
import { ConnectInfoBlock, ConnectToWalletInfo } from "../Dashboard/userDataStyles"
import Splitter from "./Splitter";
import Image from "next/image";

function OwnedSplitters({globalCTX, splitters, setSplitters}: OwnedSplittersProps){
    const {wallet, connectWallet} = globalCTX;

    //Prompt to switch to Mumbai
    if (typeof window !== "undefined") {
        window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
                chainId: "0x13881",
                rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
                chainName: "Mumbai Testnet",
                nativeCurrency: {
                    name: "MATIC",
                    symbol: "MATIC",
                    decimals: 18
                },
                blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
            }]
        })
    };

    return(
        <OwnedSplittersContainer>
            {
                wallet ?
                    <DisplayContainer style={{maxWidth: '100%', borderRadius: '17px'}}>
                        <FormHeader style={{background: 'linear-gradient(90deg, rgba(252,211,140,1) 0%, rgba(242,195,113,1) 50%, rgba(244,170,42,1) 100%)'}}>
                            <Image src="/navbar/flow-splitter.svg" width={35} height={35} alt="ida"/>
                            <div>
                                <HeaderText>Owned Splitters</HeaderText>
                                <HeaderText>Your Flow Splitters are listed below</HeaderText>
                            </div>
                        </FormHeader>
                        {
                            splitters === undefined ?  <LoadingContainer/>
                            : splitters === null ? <h2 style={{textAlign: 'center', padding:'40px 20px'}}>No Splitters found</h2>
                            : splitters?.map((data, i) =>
                                <Splitter key={`${data.id}`} index={i} data={data} wallet={wallet} setSplitters={setSplitters}/>
                            )
                        }
                    </DisplayContainer>

                :
                <ConnectInfoBlock>
                    <ConnectToWalletInfo>Connect your <span>Metamask <img src="/metamask.png" width={30} height={30} alt="metamask"/></span> to the Mumbai test network to unlock all features</ConnectToWalletInfo>
                    <ConnectMetamask onClick={() => connectWallet(false)}>Connect <span>Wallet</span><img src="/wallet.png"/></ConnectMetamask>
                </ConnectInfoBlock>
            }
        </OwnedSplittersContainer>
    )
}
export default memo(OwnedSplitters);