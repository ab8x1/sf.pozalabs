import '../src/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../src/components/Navbar'
import App from '../src/components/App'
import {Lato} from '@next/font/google'

const font = Lato({
  subsets: ['latin'],
  weight: "400"
})

export default function MainApp({ Component, pageProps }: AppProps) {
  return(
    <div id="mainContainer" className={font.className}>
      <App>
        <Navbar/>
        <Component {...pageProps} />
      </App>
    </div>
  )
}
