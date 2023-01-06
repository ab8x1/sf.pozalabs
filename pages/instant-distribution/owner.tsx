import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { GlobalCTX } from '../../src/components/App'
import { GlobalContextProps } from '../../src/components/App/appTypes'
import {PageContainer} from '../../src/components/Instant-Distribution/Manage-Agreement/AgreementStyles'
import OwnedAgreements from '../../src/components/Instant-Distribution/Manage-Agreement/OwnedAgreements'
import CreateAgreement from '../../src/components/Instant-Distribution/Manage-Agreement/CreateAgreement'
import { AgreementTypes } from '../../src/components/Instant-Distribution/Manage-Agreement/AgreementTypes'
import getAgreements from '../../src/components/Instant-Distribution/Manage-Agreement/helpers/getAgreements'

export default function CreateIDAPage() {
  const globalCTX = useContext(GlobalCTX) as GlobalContextProps;
  const {wallet, connectWallet} = globalCTX;
  const [agreements, setAgreements] = useState<undefined | null | AgreementTypes[]>(undefined);

  useEffect(() => {
      if(wallet){
          try{
            setAgreements(undefined)
              const fetchAgreements = async ()=> {
                  const data = await getAgreements(wallet);
                  setAgreements(data);
              }
              fetchAgreements();
          }
          catch(e){
              setAgreements(null);
          }
      }
  }, [wallet]);

  return (
    <>
      <Head>
        <title>Create share request</title>
      </Head>

      <PageContainer className='container' style={{maxWidth: '1100px'}}>
        <CreateAgreement wallet={wallet} connectWallet={connectWallet} setAgreements={setAgreements}/>
        <OwnedAgreements globalCTX={globalCTX} agreements={agreements}/>
      </PageContainer>

      <footer>

      </footer>
    </>
  )
}
