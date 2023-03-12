import { gql } from '@apollo/client'

export const CREATE_SESSION = gql`
  mutation AuthenticateUser($username: String!, $password: String!) {
    authenticateUser(username: $username, password: $password) {
      user {
        id
        username
      }
      token
    }
  }
`
