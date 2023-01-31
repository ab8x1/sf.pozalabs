import { useEffect, useState } from "react"
import {LendOffers, LoadingContainer} from './offersStyles'
import { ConnectInfoBlock, ConnectToWalletInfo } from "../../Dashboard/userDataStyles"
import { FormHeader, HeaderText} from "../Borrow/borrowStyles"
import Offer from './Offer'
import {OffersStateProps, OfferData} from './offersTypes'
import Loader from './Loader'
import {ConnectMetamask} from '../../Navbar/navbarStyles'
import getOffers from './helpers/getOffers'
import Image from "next/image"

function LendComponent({type, filter, wallet, connectWallet}: OffersStateProps){
    const [offers, setOffers] = useState<OfferData[] | null | undefined>(undefined);
    const [lastRequestedId, setLastRequestdId] = useState<number>(0); //load 5 offers at the beginning
    const [loading, setLoading] = useState<boolean>(false);
    const walletAdress: string | undefined = wallet?.adress;

    useEffect(() => { //load initial offers at the beginning and when the user connects wallet as employer
        if((((type ==="employer" || type === "activeLoans") && wallet) || (type=="lender" && !offers?.length)) && !loading){
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
            {
                type === "lender" || wallet ?
                <LendOffers>
                    <FormHeader style={{background: 'linear-gradient(90deg, rgba(246,203,206,1) 0%, rgba(225,194,206,1) 50%, rgba(215,190,203,1) 100%'}}>
                        <Image src="/navbar/bag.svg" width={35} height={35} alt="ida"/>
                        <div>
                            <HeaderText>Lend & Earn</HeaderText>
                            <HeaderText>Fund a loan against one’s salary and earn interest</HeaderText>
                        </div>
                    </FormHeader>
                    {
                        offers ?
                        <>
                            {
                                offers?.map((offerData, i)=>
                                    <Offer key={i} type={type} data={offerData} wallet={wallet} connectWallet={connectWallet}/>
                                )
                            }
                            <Loader setOffers={setOffers} lastRequestedId={lastRequestedId} setLastRequestdId={setLastRequestdId} filter={filter}/>
                        </>
                        : offers === undefined ? <LoadingContainer/>
                        : offers === null ? <h1 style={{color: 'red'}}>Fetching offers error</h1>
                        : lastRequestedId < 0 ? <h2>No offers found</h2>
                        : null
                    }
                </LendOffers>
                : connectWallet &&
                <ConnectInfoBlock>
                    <ConnectToWalletInfo>Connect to <span>Metamask <img src="/metamask.png" width={30} height={30} alt="metamask"/></span> to unlock all features</ConnectToWalletInfo>
                    <ConnectMetamask onClick={() => connectWallet(false)}>Connect <span>Wallet</span><img src="/wallet.png"/></ConnectMetamask>
                </ConnectInfoBlock>
            }
        </>
    )
}
export default LendComponent;