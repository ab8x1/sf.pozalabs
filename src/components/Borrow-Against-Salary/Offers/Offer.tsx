import { useEffect, useState } from "react"
import { ethers } from "ethers"
import {OfferContainer, Adresses, Info, LendButton, ExternalLink, IsActive, OfferInfo, ActualFlowRate, LoanActive, ContractStatus, Expand} from './offersStyles'
import {OfferProps, SnackBarObj} from './offersTypes'
import {shortenAdress} from '../../Navbar/TopNavbar'
import FlowRate from "./FlowRate"
import {getFlow} from './helpers/asyncInfo'
import lend from './helpers/lend'
import closeLoan from './helpers/closeLoan'
import SnackBar from '../../../../modules/SnackBar'
import Image from "next/image"


function OfferComponent({loading, data, type, wallet}: OfferProps){
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

    return(
        <>
            <OfferContainer $loading={loading} $active={active}>
                {/* <OfferInfo>
                    <IsActive active={active}>
                        {active ? 'active' : 'inactive'}
                    </IsActive>
                    <ActualFlowRate $rate={actualFlowRate}>{actualFlowRate} fDAIx/m</ActualFlowRate>
                </OfferInfo> */}
                <Expand src="/arrow.svg" width={16} height={16} alt="arrow"/>
                <Info style={{maxWidth: '120px'}}>
                    APR: {Math.round(Number((interestRate * (12/paybackMonths))))}%
                    <Image src="/apr.svg" width={20} height={20} alt="apr"/>
                </Info>
                {/* <Info>
                    Profit: {Number(profit.toFixed(2))} {borrowToken}
                </Info> */}
                <Info>
                    {Number(initialBorrowAmount.toFixed(2))} {borrowToken}
                </Info>
                {/* <Amount>
                    <p>Payback period:</p>
                    <p><span>{paybackMonths} months</span></p>
                </Amount> */}
                {/* <Adresses>
                    <p>Borrower: <a href={`https://goerli.etherscan.io/address/${borrower}`} target="_blank" rel="noopener noreferrer">{shortenAdress(borrower)}</a></p>
                    <p>Employer: <a href={`https://goerli.etherscan.io/address/${employer}`} target="_blank" rel="noopener noreferrer">{shortenAdress(employer)}</a></p>
                </Adresses> */}
                <ContractStatus $funded={!!active}>
                    {
                        active ?
                        "Funded Loan" :
                        <span onClick={lendAction}>Fund Now</span>
                    }
                    {/* { active && type === "lender" ?
                        <>
                            <LoanActive>Your active loan as {userIs}</LoanActive>
                            {(userIs === "Borrower" || userIs === "Lender") &&
                                <LendButton $disabled={disableLendButton} style={{backgroundColor: "#F44336"}} onClick={() => lenderAction(true)}>{disableLendButton ? "Loading..." : "Close loan"}</LendButton>
                            }
                        </>
                        : !active && type === "lender" && userIs === "Borrower"
                        ? <p>Your borrow request</p>
                        : active !== null ? <LendButton $disabled={disableLendButton} onClick={lendAction}>{!lendButtonText ? "Loading..." : lendButtonText}</LendButton>
                        : null
                    }
                    <ExternalLink href={`https://goerli.etherscan.io/address/${loanAddress}`} target="_blank" rel="noopener noreferrer">
                        {shortenAdress(loanAddress)}
                    </ExternalLink> */}
                </ContractStatus>
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