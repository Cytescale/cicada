import 'react-tabs/style/react-tabs.css';
import '../styles/globals.css'
import '../styles/main.css';
import '../styles/land.css';
import '../styles/login.css';

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
