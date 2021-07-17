import 'react-tabs/style/react-tabs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-spring-bottom-sheet/dist/style.css'


import '../styles/globals.css'
import '../styles/main.css';
import '../styles/land.css';
import '../styles/login.css';
import '../styles/link.css';
import '../styles/cluster.css';
import '../styles/clusterAct.css';



import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
