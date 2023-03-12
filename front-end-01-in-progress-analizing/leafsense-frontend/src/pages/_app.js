import { useEffect } from 'react'
import NextNprogress from 'nextjs-progressbar'

import { ApolloProvider } from '@apollo/client'

import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import DateFnsUtils from '@date-io/date-fns'

import { AppProvider } from '../contexts/AppContext'
import { useApollo } from '../services/apollo'
import { theme } from '../styles/theme'

export default function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState)

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <CssBaseline />

            <NextNprogress
              color="#2B4976"
              startPosition={0.3}
              stopDelayMs={200}
              height={5}
            />

            <Component {...pageProps} />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </AppProvider>
    </ApolloProvider>
  )
}
