import { useContext, useState, useEffect, memo } from "react"
import { GlobalCTX } from '../../App'
import { GlobalContextProps } from '../../App/appTypes'
import {ConnectFirstInfo} from "../../Borrow-Against-Salary/Offers/offersStyles"
import {ConnectMetamask} from '../../Navbar/navbarStyles'
import { SubscriptionType, OwnedSubscriptionsType } from "./SubscriptionTypes"
import getSubscriptions from "./helpers/getSubscriptions"
import LoadingContainers from "../../Borrow-Against-Salary/Offers/helpers/LoadingContainers"
import Subscription from "./Subscription"
import { shortenAdress } from "../../Navbar/TopNavbar"

function OwnedSubscriptions({setSnackBar}: OwnedSubscriptionsType){ console.log('OwnedSubscriptions');
    const [subscriptions, setSubscriptions] = useState<undefined | null | SubscriptionType[]>();
    const {wallet, connectWallet} = useContext(GlobalCTX) as GlobalContextProps;
    const user = shortenAdress(wallet?.adress || "......");

    useEffect(() => {
        if(wallet){
            setSubscriptions(undefined);
            const fetchSubscriptions = async() => {
                const subscriptions = await getSubscriptions(wallet);
                console.table(subscriptions);
                setSubscriptions(subscriptions);
            }
            fetchSubscriptions();
        }
    }, [wallet])

    return(
        <>
        <h2>Subscriptions</h2>
            {
                wallet
                ? subscriptions === undefined ?
                    <LoadingContainers amount={5}/>
                : subscriptions === null ?
                    <h3>No subscriptions found</h3>
                : subscriptions.map(sub =>
                    <Subscription key={`${sub.id}-${user}`} {...sub} setSnackBar={setSnackBar} wallet={wallet}/>
                )
                :
                    <ConnectFirstInfo style={{width: '100%'}}>
                        <ConnectMetamask style={{padding: '15px 30px'}} onClick={() => connectWallet(false)}>
                            Connect to metamask <img src="/metamask.png"/>
                        </ConnectMetamask>
                    </ConnectFirstInfo>
            }
        </>

    )
}
export default memo(OwnedSubscriptions);
