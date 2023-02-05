import { useContext, useState, useEffect, memo } from "react"
import { GlobalCTX } from '../../App'
import { GlobalContextProps } from '../../App/appTypes'
import { ConnectInfoBlock, ConnectToWalletInfo } from "../../Dashboard/userDataStyles"
import {ConnectMetamask} from '../../Navbar/navbarStyles'
import { SubscriptionType, OwnedSubscriptionsType } from "./SubscriptionTypes"
import getSubscriptions from "./helpers/getSubscriptions"
import { LoadingContainer, DisplayContainer } from "../../Borrow-Against-Salary/Offers/offersStyles"
import Subscription from "./Subscription"
import { shortenAdress } from "../../Navbar/TopNavbar"
import { FormHeader, HeaderText } from "../../Borrow-Against-Salary/Borrow/borrowStyles"

function OwnedSubscriptions({setSnackBar}: OwnedSubscriptionsType){ console.log('OwnedSubscriptions');
    const [subscriptions, setSubscriptions] = useState<undefined | null | SubscriptionType[]>();
    const {wallet, connectWallet} = useContext(GlobalCTX) as GlobalContextProps;
    const user = shortenAdress(wallet?.adress || "......");

    useEffect(() => {
        if(wallet){
            setSubscriptions(undefined);
            const fetchSubscriptions = async() => {
                const subscriptions = await getSubscriptions(wallet);
                console.log(subscriptions);
                setSubscriptions(subscriptions);
            }
            fetchSubscriptions();
        }
    }, [wallet])

    return(
        <div className='container centerFlex' style={{alignItems: wallet ? 'flex-start' : 'center', marginTop: '40px', maxWidth: '1100px'}}>
            {
                wallet
                ?
                <DisplayContainer style={{maxWidth: '100%', borderRadius: '17px'}}>
                    <FormHeader style={{background: 'linear-gradient(90deg, rgba(252,211,140,1) 0%, rgba(242,195,113,1) 50%, rgba(244,170,42,1) 100%)'}}>
                        <div>
                            <HeaderText>Subscriptions</HeaderText>
                            <HeaderText>Your Subscriptions are listed below</HeaderText>
                        </div>
                    </FormHeader>
                    {
                        subscriptions === undefined ?
                            <LoadingContainer/>
                        : subscriptions === null ?
                            <h2 style={{padding: '40px 20px', textAlign: 'center'}}>No subscriptions found</h2>
                        :
                            subscriptions.map(sub =>
                                <Subscription key={`${sub.id}-${user}`} {...sub} setSnackBar={setSnackBar} wallet={wallet}/>
                            )
                    }
                </DisplayContainer>
                :
                    <ConnectInfoBlock>
                        <ConnectToWalletInfo>Connect to <span>Metamask <img src="/metamask.png" width={30} height={30} alt="metamask"/></span> to unlock all features</ConnectToWalletInfo>
                        <ConnectMetamask onClick={() => connectWallet(false)}>Connect <span>Wallet</span><img src="/wallet.png"/></ConnectMetamask>
                    </ConnectInfoBlock>
            }
        </div>

    )
}
export default memo(OwnedSubscriptions);
