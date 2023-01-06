import { useContext, memo } from 'react'
import {TopMenu, ConnectMetamask, UserAdress} from './navbarStyles'
import Toggler from './Toggler'
import {TopMenuProps} from './navbarTypes'
import {GlobalContextProps} from '../App/appTypes'
import {GlobalCTX} from '../App'

export const shortenAdress = (adress: string): string => {
    return adress?.length > 12 ? `${adress.slice(0,5)}...${adress.slice(-4)}` : adress;
}

function TopMenuComponent({open, setOpen}: TopMenuProps){
    const {wallet, connectWallet} = useContext(GlobalCTX) as GlobalContextProps;

    return(
        <TopMenu>
            <Toggler open={open} setOpen={setOpen}/>
            {wallet
            ? <UserAdress>{shortenAdress(wallet.adress)}<span>Connected</span></UserAdress>
            : <ConnectMetamask onClick={() => connectWallet(false)}>Connect <span>Wallet</span><img src="/wallet.png"/></ConnectMetamask>
            }
        </TopMenu>
    )
}
export default memo(TopMenuComponent); //to avoid rernder during page switching