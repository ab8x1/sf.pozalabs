import Head from 'next/head'
import {useContext} from 'react'
import Offers from '../../src/components/Borrow-Against-Salary/Offers'
import {GlobalCTX} from '../../src/components/App'
import {GlobalContextProps} from '../../src/components/App/appTypes'
import {OfferData} from '../../src/components/Borrow-Against-Salary/Offers/offersTypes'

export default function LendPage() {
  const {wallet, connectWallet} = useContext(GlobalCTX) as GlobalContextProps;
  //show active loans only owners
  const lenderFilters = (data: OfferData): boolean =>{
    if(data?.[8] === true) return false; //dont show closed contracts
    else{
      if(data?.[5] === true){ //if loan is active
        if(data?.[3] === wallet?.adress || data?.[4] === wallet?.adress || data?.[7] === wallet?.adress) //if user is lender / borrower / employer
          return true
        else
          return false
      }
      else return true;
    }
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
