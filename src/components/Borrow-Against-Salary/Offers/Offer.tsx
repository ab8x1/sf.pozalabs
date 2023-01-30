import { useEffect, useState } from "react"
import { ethers } from "ethers"
import {OfferContainer, Addresses, Info, ActionButton, ExternalLink, OfferInfo, ActualFlowRate, LoanActive, ContractStatus, Status, ExpandArrow, Loading, ExpandDetails, InfoContainer, DetailsTitle, IsActive} from './offersStyles'
import {OfferProps, SnackBarObj} from './offersTypes'
import {shortenAdress} from '../../Navbar/TopNavbar'
import FlowRate from "./FlowRate"
import {getFlow} from './helpers/asyncInfo'
import lend from './helpers/lend'
import closeLoan from './helpers/closeLoan'
import SnackBar from '../../../../modules/SnackBar'
import Image from "next/image"
import OfferStatus from "./OfferStatus"


function OfferComponent({data, type, wallet, connectWallet}: OfferProps){
    const [showDetails, setShowDetails] = useState(false);
    const [snackBar, setSnackBar] = useState<SnackBarObj>({isOpened: false, status: "success", message: ""});
    const [showFlowRatePopUp, setShowFlowRatePopUp] = useState(false);
    const [actualFlowRate, setActualFlowRate] = useState<number | undefined>();
    const [asyncDataLoading, setAsyncDataLoading] = useState<boolean>(false);
    let [rawBorrowAmount, interestRate, paybackMonths, employer, borrower, initialActive, defaultFlowRate, lenderAdress, isClosed, loanAddress] = data || [];
    const [active, setActive] = useState<boolean | null>(initialActive);
    const borrowToken = "fDAIx";
    let initialBorrowAmount = rawBorrowAmount && Number(ethers?.utils.formatEther(rawBorrowAmount));
    const profit = initialBorrowAmount * (interestRate / 100);
    paybackMonths = paybackMonths && paybackMonths?.toNumber();
    defaultFlowRate = defaultFlowRate.toNumber();
    const userAddress = wallet?.adress;
    const lendButtonText = ((type === "employer" && actualFlowRate === undefined) || asyncDataLoading) ? null : type === "employer" ? !actualFlowRate ? 'Create flow' : 'Change flow' : 'Lend';
    const disableLendButton = !wallet || !lendButtonText || asyncDataLoading || (type === "lender" && !actualFlowRate);
    const userIs = userAddress === borrower ? "Borrower" : userAddress === employer ? "Employer" : "Lender";

    useEffect(() => {
        getFlow(employer, loanAddress, setActualFlowRate);
    }, []);

    const lendAction = type === "employer" ? () => {
        setShowFlowRatePopUp(prev => !prev);
        document.body.style.overflowY = "hidden";
    } : () => lenderAction();

    const lenderAction = async (close?: boolean) => {
        setAsyncDataLoading(true);
        try{
            if(close)
                await closeLoan(wallet, loanAddress, userIs);
            else
                await lend(wallet, loanAddress, rawBorrowAmount);
            setSnackBar({
                isOpened: true,
                message:  `Success! Your ${close ? 'close' : 'lend'} request has succeeded`,
                status: "success"
            });
            if(close) setActive(null); //closed offer indicator
            else setActive(true); //active offer indicator
        }
        catch(e){
            setSnackBar({isOpened: true, status: "error", message: "Sorry, something went wrong. Please try again soon"});
        }
        setAsyncDataLoading(false);
    }

    const toogleDetails = (e: React.MouseEvent<HTMLDivElement>) => {
        if(window.getSelection){
            window.getSelection()?.removeAllRanges();
        }
        setShowDetails(st => (!st));
    }

    const fundOffer = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if(wallet) lendAction();
        else{
            setSnackBar({
                isOpened: true,
                message:  `Connect to Metamask first`,
                status: "warning"
            });
            if(connectWallet) connectWallet(false);
        }
    }

    return(
        <>
            <OfferContainer $active={active}>
                <InfoContainer onClick={toogleDetails} style={{cursor: 'pointer'}}>
                    <OfferInfo>
                        <ActualFlowRate $rate={actualFlowRate}>Inflow: <span>{actualFlowRate} fDAIx/m</span></ActualFlowRate>
                    </OfferInfo>
                    <ExpandArrow src="/arrow.svg" width={16} height={16} alt="arrow" opened={showDetails}/>
                    <Info style={{maxWidth: '120px'}}>
                        APR: {Math.round(Number((interestRate * (12/paybackMonths))))}%
                        <Image src="/apr.svg" width={20} height={20} alt="apr"/>
                    </Info>
                    <Info>
                        {Number(initialBorrowAmount.toFixed(2))} {borrowToken}
                    </Info>
                    <OfferStatus
                        asyncDataLoading={asyncDataLoading}
                        active={active}
                        type={type}
                        connectWallet={connectWallet}
                        fundOffer={fundOffer}
                        setSnackBar={setSnackBar}
                        userIs={userIs}
                        actualFlowRate={actualFlowRate}
                    />
                </InfoContainer>
                {
                    showDetails &&
                    <ExpandDetails>
                        <DetailsTitle>Loan Details:</DetailsTitle>
                        <InfoContainer style={{alignItems: 'flex-start'}}>
                            <div>
                                <p>
                                    Profit: <span style={{color: "#A8E085", fontWeight: 'bold'}}>{Number(profit.toFixed(2))} {borrowToken}</span>
                                </p>
                                <p>
                                    Payback period: {paybackMonths} months
                                </p>
                                {
                                    type === "employer" &&
                                    <p>
                                        Status: <IsActive active={active}>{active ? "Active" : "Inactive"}</IsActive>
                                    </p>
                                }
                            </div>
                            <Addresses>
                                <p>Borrower address: <a href={`https://goerli.etherscan.io/address/${borrower}`} target="_blank" rel="noopener noreferrer">{shortenAdress(borrower)}</a></p>
                                <p>Employer address: <a href={`https://goerli.etherscan.io/address/${employer}`} target="_blank" rel="noopener noreferrer">{shortenAdress(employer)}</a></p>
                                {/* <p>Contract address: <a href={`https://goerli.etherscan.io/address/${loanAddress}`} target="_blank" rel="noopener noreferrer">{shortenAdress(loanAddress)}</a></p> */}
                            </Addresses>
                        </InfoContainer>
                        { active && type === "lender" && (userIs === "Borrower" || userIs === "Lender") &&
                            <ActionButton $disabled={disableLendButton} style={{backgroundColor: "#F0564C"}} onClick={() => lenderAction(true)}>{disableLendButton ? "Loading..." : `Close loan`}</ActionButton>
                        }
                    </ExpandDetails>
                }
            </OfferContainer>
            { showFlowRatePopUp &&
                    <FlowRate active={showFlowRatePopUp} setShowFlowRate={setShowFlowRatePopUp} wallet={wallet}
                    loanAdress={loanAddress} defaultFlowRate={defaultFlowRate} actualFlowRate={actualFlowRate} setSnackBar={setSnackBar} setActualFlowRate={setActualFlowRate}/>
            }
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
export default OfferComponent;