import { NextPage } from 'next'
import { AppProps } from 'next/app'
import '../utils/global.css'

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <>
    <Component {...pageProps} />
  </>
)

export default App
