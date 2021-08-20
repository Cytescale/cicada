import 'react-tabs/style/react-tabs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-spring-bottom-sheet/dist/style.css'
import '../styles/globals.css'
import '../styles/main.css';
import '../styles/main-respo.css';
import '../styles/land.css';
import '../styles/login.css';
import '../styles/link.css';
import '../styles/clusterAct.css';
import '../styles/profileAct.css'
import '../styles/designAct.css';

import { setWelToken } from '../comp/helpers/firebaseHelper';
import type { AppProps } from 'next/app'

setWelToken('true');

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
