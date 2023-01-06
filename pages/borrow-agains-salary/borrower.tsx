import Head from 'next/head'
import Borrow from '../../src/components/Borrow-Against-Salary/Borrow';

export default function BorrowPage() {
  return (
    <>
      <Head>
        <title>Create borrow request</title>
      </Head>

      <main className='centerFlex'>
        <Borrow/>
      </main>

      <footer>

      </footer>
    </>
  )
}
