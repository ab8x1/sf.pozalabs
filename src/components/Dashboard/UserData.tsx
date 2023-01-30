import {useContext, useEffect} from 'react'
import {ConnectInfoBlock, ConnectToWalletInfo} from './userDataStyles'
import {GlobalCTX} from '../App'
import {GlobalContextProps} from '../App/appTypes'
import {ConnectMetamask} from '../Navbar/navbarStyles'

function UserDataComponent(){
    const {wallet, connectWallet} = useContext(GlobalCTX) as GlobalContextProps;
    const name: string | undefined = wallet?.network?.name;

    return(
        <>
        {
            wallet ?
            <div>
                <ConnectInfoBlock>
                    {wallet && `Welcome: ${wallet?.adress.slice(0,5)}...${wallet?.adress.slice(-4)}`}
                </ConnectInfoBlock>
                <ConnectInfoBlock>
                    {name && <>Current network: {name[0].toUpperCase()+name.slice(1)}</>}
                </ConnectInfoBlock>
            </div>
            :
            <ConnectInfoBlock>
                <ConnectToWalletInfo>Connect to <span>Metamask <img src="/metamask.png" width={30} height={30} alt="metamask"/></span> to unlock all features</ConnectToWalletInfo>
                <ConnectMetamask onClick={() => connectWallet(false)}>Connect <span>Wallet</span><img src="/wallet.png"/></ConnectMetamask>
            </ConnectInfoBlock>
        }
        </>
    )
}
export default UserDataComponent;