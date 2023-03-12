import { createContext, useState } from 'react'
import { setCookie, destroyCookie } from 'nookies'
import Router from 'next/router'

import { useMutation } from '@apollo/client'
import { CREATE_SESSION } from '../graphql/mutations/session'

export const AuthContext = createContext({})

export function signOut() {
  destroyCookie(undefined, 'leafsense.token')

  Router.push('/')
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState()
  const [error, setError] = useState(null)

  const isAuthenticated = !!user

  const [createSession] = useMutation(CREATE_SESSION, {
    onCompleted: (data) => {
      if (data.authenticateUser) {
        const { token, user } = data.authenticateUser

        setCookie(undefined, 'leafsense.token', token, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/'
        })

        setUser(user)

        Router.push('/dashboard')
      }
    },

    onError: (error) => {
      const [err] = error.graphQLErrors

      setError(err?.message || 'Autenticação inválida')
    }
  })

  return (
    <AuthContext.Provider
      value={{ signIn: createSession, signOut, isAuthenticated, error, user }}
    >
      {children}
    </AuthContext.Provider>
  )
}
