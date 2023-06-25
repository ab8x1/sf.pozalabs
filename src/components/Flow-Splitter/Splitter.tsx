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
import deleteSplitterFlow from "./helpers/delete";
import { getFlowToSplitter } from "./helpers/getSplitters";


function Splitter({index, data, wallet, setSplitters}: SplitterProps){
    const {address, mainReceiver, sideReceiver} = data || {};
    const [snackBar, setSnackBar] = useState<SnackBarObj>({isOpened: false, status: "success", message: ""});
    //const [SplitterSubscribers, setSplitterSubscribers] = useState<Subscriber[] | undefined>(subscribers);
    const [popUp, setPopUp] = useState<PopUpType>({status: false, data: data, setSnackBar});
    const [sideReceiverFlow, setSideReceiverFlow] = useState(sideReceiver?.flow)
    const [mainReceiverFlow, setMainReceiverFlow] = useState(mainReceiver?.flow)
    const [actualFlowRate, setActualFlowRate] = useState<number | undefined>();
    const [showFlowRatePopUp, setShowFlowRatePopUp] = useState(false)

    const updateFlows = (sideReceiverFlow, mainReceiverFlow) => {
        setSideReceiverFlow(sideReceiverFlow)
        setMainReceiverFlow(mainReceiverFlow)
    }

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

    return(
        <>
            <SplitterContainer>
                <TopInfoContainer>
                    <TopInfo>
                        <label>Id:</label>
                        <span>
                            <a href={`https://mumbai.polygonscan.com/address/${address}`}  rel="noreferrer" target="_blank">
                                {shortenAdress(address)}
                                <Image src="/external-link.svg" width={18} height={18} alt="external-link" style={{marginLeft: '10px'}}/>
                            </a>
                        </span>
                    </TopInfo>
                    <Image style={!mainReceiver ? {opacity: '0.5', pointerEvents: 'none'} : {cursor: 'pointer'}} src="/edit.svg" width={20} height={20} alt="edit" onClick={() => showPopUp("edit")} 
                    />
                </TopInfoContainer>
                <InfoCol>
                    <Info style={{marginLeft: '20px'}}>
                        <Image src="/subscribers.svg" width={40} height={40} alt="dai"/>
                        <InfoCol>{"Main receiver:" || <>Editing... <LoadingSpinner size={"20px"}/></>}</InfoCol>
                    </Info>
                    <Info>
                        <Image src="/dai.svg" width={35} height={35} alt="dai"/>
                        <span style={{display: 'block', maxWidth: '140px', minWidth: '120px'}}>{mainReceiverFlow} fDAIx monthly</span>
                    </Info>
                </InfoCol>
                <InfoCol>
                    <Info style={{marginLeft: '20px'}}>
                        <Image src="/subscribers.svg" width={30} height={30} alt="dai"/>
                        <InfoCol>{"Side receiver:" || <>Editing... <LoadingSpinner size={"20px"}/></>}</InfoCol>
                    </Info>
                    <Info>
                        <Image src="/dai.svg" width={25} height={25} alt="dai"/>
                        <span style={{display: 'block', maxWidth: '140px', minWidth: '120px'}}>{sideReceiverFlow} fDAIx monthly</span>
                    </Info>
                </InfoCol>
                <InfoCol>
                    <SplitterButton  $disabled={mainReceiver===undefined} style={{backgroundColor: "#BC6E5A", color: 'white', marginLeft: '20px'}} onClick={mainReceiver!==undefined ? () => setShowFlowRatePopUp(true) : undefined}>Manage flow</SplitterButton>
                </InfoCol>
            </SplitterContainer>
            { showFlowRatePopUp &&
                    <FlowRate active={showFlowRatePopUp} setShowFlowRate={setShowFlowRatePopUp} wallet={wallet}
                    address={address} defaultFlowRate={0} actualFlowRate={actualFlowRate} setSnackBar={setSnackBar} setActualFlowRate={setActualFlowRate} flowSplitterAddress={address} updateFlows={updateFlows} mainReceiver={mainReceiver} sideReceiver={sideReceiver}/>
            }
            {popUp.status !== false && <PopUp popUpData={popUp} closePopUp={closePopUp} wallet={wallet} setSplitters={setSplitters} updateFlows={updateFlows}/>}
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
