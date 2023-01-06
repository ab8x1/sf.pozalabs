import { memo } from "react";
import LoadingContainers from "../../Borrow-Against-Salary/Offers/helpers/LoadingContainers";
import {OwnedAgreementsProps, AgreementTypes} from './AgreementTypes'
import {OwnedAgreementsContainer} from './AgreementStyles'
import {ConnectMetamask} from '../../Navbar/navbarStyles'
import {ConnectFirstInfo as NoOffersToDisplay} from "../../Borrow-Against-Salary/Offers/offersStyles"
import Agreement from "./Agreement";

function OwnedAgreements({globalCTX, agreements}: OwnedAgreementsProps){
    const {wallet, connectWallet} = globalCTX;

    return(
        <OwnedAgreementsContainer>
            <h2>Owned Agreements</h2>
            {
                wallet ?
                    agreements === undefined ?
                        <LoadingContainers amount={5}/>
                    : agreements === null ?
                        <NoOffersToDisplay>
                            <h2>No agreements found</h2>
                        </NoOffersToDisplay>
                    :
                        <>
                            {
                                agreements?.map((data, i) =>
                                    <Agreement key={`${data.id}`} index={i} data={data} wallet={wallet}/>
                                )
                            }
                        </>
                :
                    <NoOffersToDisplay>
                        <ConnectMetamask style={{padding: '15px 30px'}} onClick={() => connectWallet(false)}>
                            Connect to metamask <img src="/metamask.png"/>
                        </ConnectMetamask>
                    </NoOffersToDisplay>
            }
        </OwnedAgreementsContainer>
    )
}
export default memo(OwnedAgreements);