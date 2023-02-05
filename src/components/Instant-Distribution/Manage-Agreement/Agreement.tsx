import { useEffect, useState } from "react";
import { AgreementButton, Info, TopInfoContainer, TopInfo, AgreementContainer, InfoCol, Assets } from "./AgreementStyles";
import { AgreementProps, PopUpType, Subscriber } from "./AgreementTypes";
import { SnackBarObj } from "../../Borrow-Against-Salary/Offers/offersTypes";
import { shortenAdress } from "../../Navbar/TopNavbar";
import { ethers } from "ethers";
import PopUp from "./PopUps/PopUp";
import SnackBar from "../../../../modules/SnackBar";
import {LoadingSpinner} from './LoadingSpinner'
import Image from "next/image";


function Agreement({index, data, wallet}: AgreementProps){
    const {id, subscribers} = data;
    const [snackBar, setSnackBar] = useState<SnackBarObj>({isOpened: false, status: "success", message: ""});
    const [assets, setAssets] = useState<number | undefined>();
    const [agreementSubscribers, setAgreementSubscribers] = useState<Subscriber[] | undefined>(subscribers);
    const [popUp, setPopUp] = useState<PopUpType>({status: false, data: {id, assets: 0, subscribers: agreementSubscribers, setAgreementSubscribers, setAssets}, setSnackBar});

    useEffect(() => {
        const getAssets = async () => {
            const {daix, sfSigner} = wallet || {};
            if(daix && sfSigner){
                const balance = await daix.balanceOf({
                    account: id,
                    providerOrSigner: sfSigner
                });
                const dai = Number(ethers.utils.formatEther(balance)).toFixed(2);
                setAssets(Number(dai));
            }
        }
        getAssets();
    }, []);

    const showPopUp = (val: string) => {
        setPopUp({status: val, data: {...data, assets: assets || 0, subscribers: agreementSubscribers, setAgreementSubscribers, setAssets}, setSnackBar});
    }

    const closePopUp = () => {
        setPopUp(st => ({...st, status: false}));
    }

    return(
        <>
            <AgreementContainer>
                <TopInfoContainer>
                    <TopInfo>
                        <label>Id:</label>
                        <span>
                            <a href={`https://goerli.etherscan.io/address/${id}`}  rel="noreferrer" target="_blank">
                                {shortenAdress(id)}
                                <Image src="/external-link.svg" width={18} height={18} alt="external-link" style={{marginLeft: '10px'}}/>
                            </a>
                        </span>
                    </TopInfo>
                    <Image style={!agreementSubscribers ? {opacity: '0.5', pointerEvents: 'none'} : {cursor: 'pointer'}} src="/edit.svg" width={20} height={20} alt="edit" onClick={() => showPopUp("edit")} />
                </TopInfoContainer>
                <InfoCol>
                    <Info>
                        <Image src="/dai.svg" width={35} height={35} alt="dai"/>
                        <span style={{display: 'block', maxWidth: '140px', minWidth: '120px'}}>{assets} fDAIx</span>
                    </Info>
                    <Info style={{marginLeft: '20px'}}>
                        <Image src="/subscribers.svg" width={35} height={35} alt="dai"/>
                        <InfoCol>{agreementSubscribers?.length || <>Editing... <LoadingSpinner size={"20px"}/></>}</InfoCol>
                    </Info>
                </InfoCol>
                <InfoCol>
                    <AgreementButton $disabled={assets===undefined} onClick={assets ? () => showPopUp("transfer") : undefined}>Top up</AgreementButton>
                    <AgreementButton  $disabled={assets===undefined} style={{backgroundColor: "#BC6E5A", color: 'white', marginLeft: '20px'}} onClick={assets ? () => showPopUp("distribute") : undefined}>Distribute <span>assets</span></AgreementButton>
                </InfoCol>
            </AgreementContainer>
            {popUp.status !== false && <PopUp popUpData={popUp} closePopUp={closePopUp} wallet={wallet}/>}
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
export default Agreement;
