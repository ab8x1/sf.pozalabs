import Head from 'next/head'
import {useContext} from 'react'
import Offers from '../../src/components/Borrow-Against-Salary/Offers'
import {GlobalCTX} from '../../src/components/App'
import {GlobalContextProps} from '../../src/components/App/appTypes'
import {OfferData} from '../../src/components/Borrow-Against-Salary/Offers/offersTypes'

export default function LendPage() {
  const {wallet, connectWallet} = useContext(GlobalCTX) as GlobalContextProps;

  const lenderFilters = (data: OfferData): boolean =>{
    if(data?.[8] === true || data?.[5] === true) return false; //dont show closed and active contracts
    else return true;
  }

  return (
    <>
      <Head>
        <title>Lend offers</title>
      </Head>

      <div className='container'>
        <Offers type="lender" wallet={wallet} filter={lenderFilters} connectWallet={connectWallet}/>
      </div>

      <footer>

      </footer>
    </>
  )
}
