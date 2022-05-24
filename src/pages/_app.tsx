import { AppProvider } from '../context/context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider children={undefined}>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
