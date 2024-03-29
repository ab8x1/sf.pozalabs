import { useState, useEffect, useRef } from "react";
import { AgreementContainer, TopInfoContainer, TopInfo, InfoCol, Info, AgreementButton } from "../../Instant-Distribution/Manage-Agreement/AgreementStyles";
import { shortenAdress } from "../../Navbar/TopNavbar";
import Image from "next/image";
import { LoadingSpinner } from "../../Instant-Distribution/Manage-Agreement/LoadingSpinner";
import { WriterOfferType } from "./WriterTypes";
import timeTo from '../../Perpetual-Bets/Buyer/helpers/timeTo';
import Fund from './Fund'
import { getAssets } from "../../Borrow-Against-Salary/Offers/helpers/asyncInfo";
import cancelBet from './helpers/cancelBet';

const tokens = {
    "0xA39434A63A52E749F02807ae27335515BA4b07F7": "BTC",
    "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e": "ETH",
    "0x48731cF7e84dc94C5f84577882c14Be11a5B7456": "Link",
}

function WriterOffer({data, wallet} : WriterOfferType){
    const {strikePrice, freezePeriod, freezePeriodEnd, buyer, owner, address, isCall, token} = data;
    const [fund, setFund] = useState(false);
    const [assets, setAssets] = useState<number | undefined>();

    useEffect(() => {
        getAssets(address, setAssets);
    }, []);

    const cancelBetAsOwner = () => {
        cancelBet(wallet, address);
    }

    return(
        <AgreementContainer>
            <TopInfoContainer>
                <TopInfo>
                    <label>Id:</label>
                    <span>
                        <a href={`https://goerli.etherscan.io/address/${address}`}  rel="noreferrer" target="_blank">
                            {shortenAdress(address)}
                            <Image src="/external-link.svg" width={18} height={18} alt="external-link" style={{marginLeft: '10px'}}/>
                        </a>
                    </span>
                </TopInfo>
            </TopInfoContainer>
            <InfoCol>
                <Info>
                    <Image src="/dai.svg" width={35} height={35} alt="dai"/>
                    <span style={{display: 'block', maxWidth: '140px', minWidth: '120px'}}>
                        {assets === undefined ? '...' : assets} fDAIx
                    </span>
                </Info>
                <Info style={{marginLeft: '20px', display: 'block'}}>
                    <InfoCol>Strike price:</InfoCol>
                    <InfoCol style={{paddingTop: '10px'}}>
                        {Number(strikePrice).toFixed(2)}
                        <Image src={`/tokens/${tokens[token]}.svg`} width={30} height={30} alt="token" style={{marginLeft: '5px'}}/>
                    </InfoCol>
                </Info>
                <Info style={{marginLeft: '20px', display: 'block'}}>
                    <InfoCol>{isCall ? "Call ⬆️" : "Put ⬇️"}</InfoCol>
                </Info>
                <Info style={{marginLeft: '20px', display: 'block'}}>
                    <InfoCol>{buyer ? "Active ✅" : "Not active ⭕"}</InfoCol>
                </Info>
                <Info style={{marginLeft: '20px', display: 'block'}}>
                    <InfoCol>Freeze period:</InfoCol>
                    <InfoCol style={{paddingTop: '10px'}}>{timeTo(Number(freezePeriod)* 1000)}</InfoCol>
                </Info>
            </InfoCol>
            <InfoCol>
                <AgreementButton $disabled={false} onClick={() => setFund(true)}>Fund</AgreementButton>
                <AgreementButton  $disabled={!buyer} style={{backgroundColor: "#BC6E5A", color: 'white', marginLeft: '20px'}} onClick={cancelBetAsOwner}>Cancel</AgreementButton>
            </InfoCol>
            {fund && <Fund wallet={wallet} setPopUp={setFund} assets={assets} setAssets={setAssets} address={address}/>}
        </AgreementContainer>
    )
}
export default WriterOffer;