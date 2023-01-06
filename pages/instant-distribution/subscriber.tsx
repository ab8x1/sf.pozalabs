import { useState } from 'react';
import Head from 'next/head'
import OwnedSubscribtions from '../../src/components/Instant-Distribution/Subscribe';
import SnackBar from '../../modules/SnackBar/SnackBar';
import { SnackBarObj } from '../../src/components/Borrow-Against-Salary/Offers/offersTypes';

export default function CreateIDAPage() {
  const [snackBar, setSnackBar] = useState<SnackBarObj>({isOpened: false, status: "success", message: ""});
  return (
    <>
      <Head>
        <title>Deploy new Index</title>
      </Head>

      <main className='container' style={{alignItems: 'flex-start', marginTop: '40px', maxWidth: '1100px'}}>
        <OwnedSubscribtions setSnackBar={setSnackBar}/>
      </main>
      {snackBar.isOpened &&
        <SnackBar
            status={snackBar.status}
            message={snackBar.message}
            closeSnackBar={() => setSnackBar(st => ({...st, isOpened: false}))}
        />
      }
      <footer>

      </footer>
    </>
  )
}
