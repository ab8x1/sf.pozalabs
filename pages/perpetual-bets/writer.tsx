import Head from "next/head";
import Writer from "../../src/components/Perpetual-Bets/Writer";
import { useContext } from 'react';
import { GlobalCTX } from '../../src/components/App';
import { GlobalContextProps } from '../../src/components/App/appTypes'

function WriterPage(){
    const globalCTX = useContext(GlobalCTX) as GlobalContextProps;
    const {wallet, connectWallet} = globalCTX;

    return(
        <>
            <Head>
                <title>Writer</title>
            </Head>
            <Writer wallet={wallet}/>
        </>
    )
}
export default WriterPage;