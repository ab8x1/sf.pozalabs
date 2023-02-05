import Head from 'next/head'
import UserData from '../src/components/Dashboard'

export default function Home() {
  return (
    <>
      <Head>
        <title>Salary stream</title>
      </Head>
      <UserData/>
    </>
  )
}
