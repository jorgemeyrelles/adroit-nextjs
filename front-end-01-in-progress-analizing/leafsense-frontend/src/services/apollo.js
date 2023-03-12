import { useMemo } from 'react'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

import { parseCookies } from 'nookies'

import { signOut } from '../contexts/AuthContext'

let apolloClient = null

function createApolloClient(session = null) {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}`
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((error) => {
        if (error.message === 'Request failed with status code 401') {
          signOut()
        }

        console.log(
          `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`
        )
      })
    }

    if (networkError) console.log(`[Network error]: ${networkError}`)
  })

  const authLink = setContext((ctx, { headers }) => {
    const cookies = parseCookies(ctx)

    const jwt = !session && cookies['leafsense.token']
    const authorization = jwt ? `Bearer ${jwt}` : ''

    return {
      headers: {
        ...headers,
        authorization
      }
    }
  })

  const link = authLink.concat(errorLink.concat(httpLink))

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined'
  })
}

export function initializeApollo(initialState = null, session = null) {
  const apolloClientGlobal = apolloClient ?? createApolloClient(session)

  if (initialState) {
    apolloClientGlobal.cache.restore(initialState)
  }

  if (typeof window === 'undefined') return apolloClientGlobal

  apolloClient = apolloClient ?? apolloClientGlobal

  return apolloClient
}

export function useApollo(initialState = null, session = null) {
  const store = useMemo(
    () => initializeApollo(initialState, session),
    [initialState, session]
  )
  return store
}
