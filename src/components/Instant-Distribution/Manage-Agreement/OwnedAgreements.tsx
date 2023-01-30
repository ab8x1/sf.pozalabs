import { memo } from "react";
import { LoadingContainer } from "../../Borrow-Against-Salary/Offers/offersStyles";
import {OwnedAgreementsProps, AgreementTypes} from './AgreementTypes'
import {OwnedAgreementsContainer} from './AgreementStyles'
import {ConnectMetamask} from '../../Navbar/navbarStyles'
import { ConnectInfoBlock } from "../../Dashboard/userDataStyles";
import Agreement from "./Agreement";

function OwnedAgreements({globalCTX, agreements}: OwnedAgreementsProps){
    const {wallet, connectWallet} = globalCTX;

    return(
        <OwnedAgreementsContainer>
            <h2>Owned Agreements</h2>
            {
                wallet ?
                    agreements === undefined ?
                        <LoadingContainer/>
                    : agreements === null ?
                        <ConnectInfoBlock>
                            <h2>No agreements found</h2>
                        </ConnectInfoBlock>
                    :
                        <>
                            {
                                agreements?.map((data, i) =>
                                    <Agreement key={`${data.id}`} index={i} data={data} wallet={wallet}/>
                                )
                            }
                        </>
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