import {useContext} from 'react'
import {DashBoardContainer, ServiceBox} from './userDataStyles'
import { Icon } from '../Navbar/navbarStyles'
import {GlobalCTX} from '../App'
import {GlobalContextProps} from '../App/appTypes'
import Image from 'next/image'
import Link from 'next/link'

function UserDataComponent(){
    const {wallet, connectWallet} = useContext(GlobalCTX) as GlobalContextProps;
    const name: string | undefined = wallet?.network?.name;

    return(
        <div className='container'>
            <h2>Apps built on top of <a style={{color: "#2196F3"}} href='https://www.superfluid.finance/' target="_blank" rel="noreferrer">Superfluid</a></h2>
            <DashBoardContainer>
                <Link href="/borrow-agains-salary/borrower">
                    <ServiceBox>
                        <label>Borrow Against Salary <Icon src="/navbar/bag.svg"/></label>
                        <Image src="/ida-box.png" width={272} height={348} alt='IDA'/>
                    </ServiceBox>
                </Link>
                <Link href="/instant-distribution/owner">
                    <ServiceBox>
                        <label>Instant Distribution Agreement <Icon src="/navbar/ida.svg"/></label>
                        <Image src="/bag-box.png" width={272} height={348} alt='IDA'/>
                    </ServiceBox>
                </Link>
                <Link href="/sentinel-dao">
                    <ServiceBox>
                        <label>Sentinel Dao <Icon src="/navbar/sentinel-dao.svg"/></label>
                        <Image src="/sentinel-box.png" width={272} height={348} alt='IDA'/>
                    </ServiceBox>
                </Link>
            </DashBoardContainer>
        </div>
    )
}
export default UserDataComponent;