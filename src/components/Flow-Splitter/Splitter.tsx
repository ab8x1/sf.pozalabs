import { useEffect, useState } from "react";
import { SplitterButton, Info, TopInfoContainer, TopInfo, SplitterContainer, InfoCol, Assets } from "./SplitterStyles";
import { SplitterProps, PopUpType, Subscriber } from "./SplitterTypes";
import { SnackBarObj } from "../Borrow-Against-Salary/Offers/offersTypes";
import { shortenAdress } from "../Navbar/TopNavbar";
import { ethers } from "ethers";
import PopUp from "./PopUps/PopUp";
import FlowRate from "./PopUps/FlowRate";
import SnackBar from "../../../modules/SnackBar";
import {LoadingSpinner} from './LoadingSpinner'
import Image from "next/image";
import { getFlowToSplitter } from "./helpers/getSplitters";
import { getblockExplorerUrl } from "./helpers/getEnv";


function Splitter({index, data, wallet, setSplitters}: SplitterProps){
    const {address, receivers} = data || {};
    const [snackBar, setSnackBar] = useState<SnackBarObj>({isOpened: false, status: "success", message: ""});
    const [totalOutflow, setTotalOutflow] = useState(data.totalOutflow)
    const [agreementReceivers, setAgreementReceivers] = useState(receivers)
    const [actualFlowRate, setActualFlowRate] = useState<number | undefined>();
    const [showFlowRatePopUp, setShowFlowRatePopUp] = useState(false)
    const [popUp, setPopUp] = useState<PopUpType>({status: false, data: {address, receivers: agreementReceivers, totalOutflow}, setSnackBar});



    useEffect(() => {
        const getInflow = async () => {
            const inflow = await getFlowToSplitter(address, wallet)
            setActualFlowRate(inflow)
        }
        getInflow()
    }, [])

    const showPopUp = (val: string) => {
        setPopUp({status: val, data: data, setSnackBar});
    }

    const closePopUp = () => {
        setPopUp(st => ({...st, status: false}));
    }

    const blockExplorer = getblockExplorerUrl(wallet);
    const tokenSymbol = wallet?.network.chainId === 42220 ? "G$" : "fDAIx";
    const tokenSvg = wallet?.network.chainId === 42220 ? "g$" : "dai";

    return(
        <>
            <SplitterContainer>
                <TopInfoContainer>
                    <TopInfo>
                        <label>Id:</label>
                        <span>
                            <a href={`${blockExplorer}/address/${address}`}  rel="noreferrer" target="_blank">
                                {shortenAdress(address)}
                                <Image src="/external-link.svg" width={18} height={18} alt="external-link" style={{marginLeft: '10px'}}/>
                            </a>
                        </span>
                    </TopInfo>
                    <Image style={!receivers ? {opacity: '0.5', pointerEvents: 'none'} : {cursor: 'pointer'}} src="/edit.svg" width={20} height={20} alt="edit" onClick={() => showPopUp("edit")} 
                    />
                </TopInfoContainer>
                <InfoCol>
                    <Info>
                        <Image src={`/${tokenSvg}.svg`} width={35} height={35} alt={`${tokenSvg}`}/>
                        <span style={{display: 'block', maxWidth: '140px', minWidth: '120px'}}>{totalOutflow} {tokenSymbol} monthly</span>
                    </Info>
                    <Info style={{marginLeft: '20px'}}>
                        <Image src="/subscribers.svg" width={35} height={35} alt="dai"/>
                        <InfoCol>{agreementReceivers?.length || <>Editing... <LoadingSpinner size={"20px"}/></>}</InfoCol>
                    </Info>
                </InfoCol>
                <InfoCol>
                    <SplitterButton  $disabled={receivers===undefined} style={{backgroundColor: "#BC6E5A", color: 'white', marginLeft: '20px'}} onClick={receivers!==undefined ? () => setShowFlowRatePopUp(true) : undefined}>Manage flow</SplitterButton>
                </InfoCol>
            </SplitterContainer>
            { showFlowRatePopUp &&
                    <FlowRate active={showFlowRatePopUp} setShowFlowRate={setShowFlowRatePopUp} wallet={wallet}
                    address={address} defaultFlowRate={0} actualFlowRate={actualFlowRate} setSnackBar={setSnackBar} setActualFlowRate={setActualFlowRate} flowSplitterAddress={address} setTotalOutflow={setTotalOutflow} setReceivers={setAgreementReceivers}/>
            }
            {popUp.status !== false && <PopUp popUpData={popUp} closePopUp={closePopUp} wallet={wallet} setSplitters={setSplitters} setReceivers={setAgreementReceivers} receivers={agreementReceivers} totalOutflow={totalOutflow}/>}
            {snackBar.isOpened &&
                <SnackBar
                    status={snackBar.status}
                    message={snackBar.message}
                    closeSnackBar={() => setSnackBar(st => ({...st, isOpened: false}))}
                />
            }
        </>
    )
}
export default Splitter;
