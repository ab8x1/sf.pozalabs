import { useEffect, useState } from "react"
import {LendOffers, ConnectFirstInfo} from './offersStyles'
import Offer from './Offer'
import {OffersStateProps, OfferData} from './offersTypes'
import LoadingContainers from './helpers/LoadingContainers'
import Loader from './Loader'
import {ConnectMetamask} from '../../Navbar/navbarStyles'
import getOffers from './helpers/getOffers'

function LendComponent({type, filter, wallet, connectWallet}: OffersStateProps){
    const [offers, setOffers] = useState<OfferData[] | null | undefined>(undefined);
    const [lastRequestedId, setLastRequestdId] = useState<number>(0); //load 5 offers at the beginning
    const [loading, setLoading] = useState<boolean>(false);
    const walletAdress: string | undefined = wallet?.adress;

    useEffect(() => { //load initial offers at the beginning and when the user connects wallet as employer
        if(((type ==="employer" && wallet) || (type=="lender" && wallet !== undefined)) && !loading){
            setOffers(undefined);
            setLastRequestdId(0);
            const getLendOffers = async () => {
                setLoading(true);
                const [results] = await getOffers(0, setLastRequestdId, filter);
                setOffers(results);
                setLoading(false)
            }
            getLendOffers();
        }
    }, [wallet])

    return(
        <>
            <h1>{type === "lender" ? "Lend" : "Employee"} offers</h1>
            {
                type === "lender" || wallet ?
                <LendOffers>
                    {
                        offers ?
                        <>
                            {
                                offers?.map((offerData, i)=>
                                    <Offer key={i} type={type} loading={false} data={offerData} wallet={wallet}/>
                                )
                            }
                            <Loader setOffers={setOffers} lastRequestedId={lastRequestedId} setLastRequestdId={setLastRequestdId} filter={filter}/>
                        </>
                        : offers === undefined ? <LoadingContainers amount={5}/>
                        : offers === null ? <h1 style={{color: 'red'}}>Fetching offers error</h1>
                        : lastRequestedId < 0 ? <h2>No offers found</h2>
                        : null
                    }
                </LendOffers>
                : connectWallet &&
                <ConnectFirstInfo>
                    <ConnectMetamask style={{padding: '15px 30px'}} onClick={() => connectWallet(false)}>Connect to metamask <img src="/metamask.png"/></ConnectMetamask>
                </ConnectFirstInfo>
            }
        </>
    )
}
export default LendComponent;