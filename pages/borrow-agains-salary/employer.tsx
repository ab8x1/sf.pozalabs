import Head from 'next/head'
import {useContext} from 'react'
import Offers from '../../src/components/Borrow-Against-Salary/Offers'
import {GlobalCTX} from '../../src/components/App'
import {GlobalContextProps} from '../../src/components/App/appTypes'
import {OfferData} from '../../src/components/Borrow-Against-Salary/Offers/offersTypes'

export default function LendPage() {
  const {wallet, connectWallet} = useContext(GlobalCTX) as GlobalContextProps;
  const employerFilters = (data: OfferData): boolean =>{
      if(data?.[8] === true) return false; //dont show closed contracts
      if(data?.[3] === wallet?.adress) return true; //if employer address equals wallet address
      else return false;
  }
  return (
    <>
      <Head>
        <title>Employer</title>
      </Head>

      <div className='container' style={!wallet ? {display: 'flex', alignItems: 'center', justifyContent: 'center'} : {}}>
        <Offers type="employer" filter={employerFilters} wallet={wallet}
        connectWallet={connectWallet}/>
      </div>

      <footer>

      </footer>
    </>
  )
}
