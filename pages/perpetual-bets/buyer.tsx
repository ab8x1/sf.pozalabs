import Head from "next/head";
import Buyer from "../../src/components/Perpetual-Bets/Buyer";
import { useContext } from 'react';
import { GlobalCTX } from '../../src/components/App';
import { GlobalContextProps } from '../../src/components/App/appTypes'

function BuyerPage(){
    const globalCTX = useContext(GlobalCTX) as GlobalContextProps;
    const {wallet, connectWallet} = globalCTX;

    return(
        <>
            <Head>
                <title>Buyer</title>
            </Head>
            <Buyer wallet={wallet}/>
        </>
    )
}
export default BuyerPage;