import { useState, useEffect } from "react";
import { WriterProps } from "./WriterTypes";
import { OwnedAgreementsContainer, CreateAgreementContainer, NewAgreementInfo, PageContainer } from "../../Instant-Distribution/Manage-Agreement/AgreementStyles";
import { ConnectInfoBlock, ConnectToWalletInfo } from "../../Dashboard/userDataStyles";
import { ConnectMetamask } from "../../Navbar/navbarStyles";
import { DisplayContainer } from "../../Borrow-Against-Salary/Offers/offersStyles";
import { FormHeader, HeaderText } from "../../Borrow-Against-Salary/Borrow/borrowStyles";
import { AddButton } from "../../Instant-Distribution/Manage-Agreement/AgreementStyles";
import { LoadingSpinner } from "../../Instant-Distribution/Manage-Agreement/LoadingSpinner";
import Image from "next/image";
import WriterPopUp from "./PopUp";
import WriterOffer from "./WriterOffer";
import { LoadingContainer } from "../../Sentinel-Dao/SentinelDaoStyles";
import getOffers from './helpers/getMyAgreements';
import { OfferTypes } from "../Buyer/BuyerTypes";

function Writer({wallet, connectWallet} : WriterProps){
    const [popUp, setPopUp] = useState(false);
    const [offers, setOffers] = useState<OfferTypes>();

    useEffect(() => {
        const getMyOffers = async () => {
            const myOffers = await getOffers(wallet);
            setOffers(myOffers);
        }
        if(wallet) getMyOffers();
    }, [wallet])

    return(
        <PageContainer className='container' style={{maxWidth: '1100px'}}>
            <CreateAgreementContainer>
                <NewAgreementInfo>
                    <h1>Your Offers</h1>
                    <p>Create and manage your existing bets</p>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <AddButton $disabled={false} onClick={() => setPopUp(true)}>
                            <span style={{marginRight: '10px'}}>Create Offer</span>
                            <Image width={20} height={20} src="/add.svg" alt='add button' priority/>
                            {/* <LoadingSpinner size="20px"/> */}
                        </AddButton>
                    </div>
                </NewAgreementInfo>
                <Image src="/agreement.png" width={400} height={400} alt="agreement"/>
            </CreateAgreementContainer>
            {
                wallet ?
                <>
                    <OwnedAgreementsContainer>
                        <DisplayContainer style={{maxWidth: '100%', borderRadius: '17px'}}>
                            <FormHeader style={{background: 'linear-gradient(90deg, rgba(252,211,140,1) 0%, rgba(242,195,113,1) 50%, rgba(244,170,42,1) 100%)'}}>
                                <Image src="/navbar/ida.svg" width={35} height={35} alt="ida"/>
                                <div>
                                    <HeaderText>Owned Offers</HeaderText>
                                    <HeaderText>Your Offers are listed below</HeaderText>
                                </div>
                            </FormHeader>
                            {
                                offers === undefined ?  <LoadingContainer/>
                                : offers === null ? <h2 style={{textAlign: 'center', padding:'40px 20px'}}>No agreements found</h2>
                                : offers?.map((data, i) =>
                                    <WriterOffer key={i} data={data} wallet={wallet}/>
                                )
                            }
                        </DisplayContainer>
                    </OwnedAgreementsContainer>
                    {popUp && <WriterPopUp setPopUp={setPopUp} wallet={wallet}/>}
                </> :
                <ConnectInfoBlock style={{margin: '80px 0 20px 0'}}>
                    <ConnectToWalletInfo>Connect to <span>Metamask <img src="/metamask.png" width={30} height={30} alt="metamask"/></span> to unlock all features</ConnectToWalletInfo>
                    <ConnectMetamask onClick={() => connectWallet(false)}>Connect <span>Wallet</span><img src="/wallet.png"/></ConnectMetamask>
                </ConnectInfoBlock>
}
        </PageContainer>
    )
}
export default Writer;