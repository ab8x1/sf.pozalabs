import '../src/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../src/components/Navbar'
import App from '../src/components/App'

export default function MainApp({ Component, pageProps }: AppProps) {
  return(
    <App>
      <Navbar/>
      <Component {...pageProps} />
    </App>
  )
}
