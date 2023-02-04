import { memo } from "react";
import { DisplayContainer, LoadingContainer } from "../../Borrow-Against-Salary/Offers/offersStyles";
import { FormHeader, HeaderText } from "../../Borrow-Against-Salary/Borrow/borrowStyles";
import {OwnedAgreementsProps, AgreementTypes} from './AgreementTypes'
import {OwnedAgreementsContainer} from './AgreementStyles'
import {ConnectMetamask} from '../../Navbar/navbarStyles'
import { ConnectInfoBlock } from "../../Dashboard/userDataStyles";
import Agreement from "./Agreement";
import Image from "next/image";

function OwnedAgreements({globalCTX, agreements}: OwnedAgreementsProps){
    const {wallet, connectWallet} = globalCTX;

    return(
        <OwnedAgreementsContainer>
            {
                wallet ?
                    agreements === undefined ?
                        <LoadingContainer/>
                    : agreements === null ?
                        <ConnectInfoBlock>
                            <h2>No agreements found</h2>
                        </ConnectInfoBlock>
                    :
                        <DisplayContainer style={{maxWidth: '100%', borderRadius: '17px'}}>
                            <FormHeader style={{background: 'linear-gradient(90deg, rgba(252,211,140,1) 0%, rgba(242,195,113,1) 50%, rgba(244,170,42,1) 100%)'}}>
                                <Image src="/navbar/ida.svg" width={35} height={35} alt="ida"/>
                                <div>
                                    <HeaderText>Owned Agreements</HeaderText>
                                    <HeaderText>Your Agreements are listed below</HeaderText>
                                </div>
                            </FormHeader>
                            {
                                agreements?.map((data, i) =>
                                    <Agreement key={`${data.id}`} index={i} data={data} wallet={wallet}/>
                                )
                            }
                        </DisplayContainer>
                :
                    <ConnectInfoBlock>
                        <ConnectMetamask style={{padding: '15px 30px'}} onClick={() => connectWallet(false)}>
                            Connect to metamask <img src="/metamask.png"/>
                        </ConnectMetamask>
                    </ConnectInfoBlock>
            }
        </OwnedAgreementsContainer>
    )
}
export default memo(OwnedAgreements);