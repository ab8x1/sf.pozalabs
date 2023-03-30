import { useState, useEffect } from "react";
import { BuyerOfferProps } from "./BuyerTypes";
import { OfferContainer, InfoContainer, ExpandDetails, ExpandArrow, Info, DetailsTitle, Addresses, ActionButton, OfferInfo, ActualFlowRate } from "../../Borrow-Against-Salary/Offers/offersStyles";
import { Info as AssetsInfo } from "../../Instant-Distribution/Manage-Agreement/AgreementStyles";
import Image from "next/image";
import { shortenAdress } from "../../Navbar/TopNavbar";
import timeTo from './helpers/timeTo';
import { getFlow, getAssets } from "../../Borrow-Against-Salary/Offers/helpers/asyncInfo";
import BuyerFlowRate from './BuyerFlowRate';
import employerFlow from "../../Borrow-Against-Salary/Offers/helpers/employerFlow";
import executeBet from './helpers/execute';

function BuyerOffer({data, wallet} : BuyerOfferProps){
    const {strikePrice, freezePeriod, freezePeriodEnd, buyer, owner, address, minPaymentFlowRate} = data;
    const walletAddress = wallet?.adress;
    const [showDetails, setShowDetails] = useState(false);
    const [newBuyer, setNewBuyer] = useState(buyer);
    const [actualFlowRate, setActualFlowRate] = useState<number | undefined>();
    const [assets, setAssets] = useState<number | undefined>();
    const [flowRatePopUp, setFlowRatePopUp] = useState(false);
    const myPurchasedOffer = newBuyer === walletAddress && actualFlowRate !== 0;

    useEffect(() => {
        getFlow(buyer, address, setActualFlowRate);
        getAssets(address, setAssets);
    }, []);

    const cancelFlow = async () => {
        setActualFlowRate(undefined);
        await employerFlow("deleteFlow", wallet, address, 0);
        setActualFlowRate(0);
        setNewBuyer("");
    }

    const execute = () => {
        executeBet(wallet, address);
    }

    return(
        <OfferContainer $active={true}>
            <InfoContainer onClick={() => setShowDetails(!showDetails)} style={{cursor: 'pointer'}}>
                <OfferInfo>
                    <ActualFlowRate $rate={actualFlowRate}>Inflow: <span>{actualFlowRate} fDAIx/m</span></ActualFlowRate>
                </OfferInfo>
                <ExpandArrow src="/arrow.svg" width={16} height={16} alt="arrow" opened={showDetails}/>
                <Info style={{maxWidth: '120px'}}>
                    Strike price: <br/>
                    ${Number(strikePrice).toFixed(2)} ETH
                </Info>
                <AssetsInfo>
                    <Image src="/dai.svg" width={35} height={35} alt="dai"/>
                    <span style={{display: 'block', maxWidth: '140px', minWidth: '120px'}}>{assets === undefined ? '...' : assets} fDAIx</span>
                </AssetsInfo>
                <ActionButton $disabled={actualFlowRate === undefined} style={myPurchasedOffer ? {backgroundColor: "#8BC34A"} : {}} onClick={myPurchasedOffer ? execute : () => setFlowRatePopUp(true)}>{myPurchasedOffer ? "Execute" : "Buy"}</ActionButton>
            </InfoContainer>
            {
                showDetails &&
                <ExpandDetails>
                    <DetailsTitle>
                        <label>Loan Details:</label>
                        <a href={`https://goerli.etherscan.io/address/${address}`} target="_blank" rel="noopener noreferrer"><Image src="/external-link.svg" width={18} height={18} alt="contract info"/></a>
                    </DetailsTitle>
                    <InfoContainer style={{alignItems: 'flex-start'}}>
                        <div>
                            <p>
                                Freeze period Duration:
                                <span style={{fontWeight: 'bold', marginLeft: '5px'}}>{timeTo(Number(freezePeriod)* 1000)}</span>
                            </p>
                            <p>
                                Expiry: {Number(freezePeriodEnd) > 0 ? new Date(Number(freezePeriodEnd)*10**21).toISOString().substring(0, 19).replace('T', ' ') : '-'}
                            </p>
                        </div>
                        <Addresses>
                            <p>Buyer:
                                { newBuyer ?
                                    <a href={`https://goerli.etherscan.io/address/${newBuyer}`} target="_blank" rel="noopener noreferrer">{shortenAdress(newBuyer)}</a>
                                    : ' None'
                                }
                            </p>
                            <p>Writer: <a href={`https://goerli.etherscan.io/address/${owner}`} target="_blank" rel="noopener noreferrer">{shortenAdress(owner)}</a></p>
                            {myPurchasedOffer && <ActionButton style={{backgroundColor: "#F44336"}} onClick={cancelFlow}>Cancel</ActionButton>}
                        </Addresses>
                    </InfoContainer>
                </ExpandDetails>
            }
            { flowRatePopUp &&
                <BuyerFlowRate setFlowRatePopUp={setFlowRatePopUp} wallet={wallet} address={address} setActualFlowRate={setActualFlowRate} actualFlowRate={actualFlowRate} setNewBuyer={setNewBuyer} minPaymentFlowRate={minPaymentFlowRate}/>
            }
        </OfferContainer>
    )
}
export default BuyerOffer;