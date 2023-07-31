import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { GlobalCTX } from '../src/components/App'
import { GlobalContextProps } from '../src/components/App/appTypes'
import {PageContainer} from '../src/components/Flow-Splitter/SplitterStyles'
import OwnedSplitters from '../src/components/Flow-Splitter/OwnedSplitters'
import CreateSplitter from '../src/components/Flow-Splitter/CreateSplitter'
import { SplitterTypes, SplitterTypesNew } from '../src/components/Flow-Splitter/SplitterTypes'
import getSplitters, {fetchSplitter} from '../src/components/Flow-Splitter/helpers/getSplitters'

export default function CreateIDAPage() {
  const globalCTX = useContext(GlobalCTX) as GlobalContextProps;
  const {wallet, connectWallet} = globalCTX;
  const [splitters, setSplitters] = useState<undefined | null | SplitterTypesNew[]>(undefined);

  useEffect(() => {
      if(wallet){
          try{
            setSplitters(undefined)
              const fetchSplitters = async ()=> {
                  const dataSplitters = await getSplitters(wallet);
                  setSplitters(dataSplitters);
              }
              fetchSplitters();
          }
          catch(e){
              setSplitters(null);
          }
      }
  }, [wallet]);

  return (
    <>
      <Head>
        <title>Manage super splitter</title>
      </Head>

      <PageContainer className='container' style={{maxWidth: '1100px'}}>
        <CreateSplitter wallet={wallet} connectWallet={connectWallet} setSplitters={setSplitters}/>
        <OwnedSplitters globalCTX={globalCTX} splitters={splitters} setSplitters={setSplitters}/>
      </PageContainer>
    </>
  )
}
