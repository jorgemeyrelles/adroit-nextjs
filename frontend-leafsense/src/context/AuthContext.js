import { createContext, useEffect, useState } from 'react'
import { useCookies } from "react-cookie";
import { login } from '../service/api';

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [err, setErr] = useState(false);
  const [fromLogin, setFromLogin] = useState({ username: '', password: ''});
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  // function handleSetCookie() {
  //   setCookie("user", "obydul", { path: '/' });
  // }

  // function handleRemoveCookie() {
  //   removeCookie("user");
  // }
  // https://shouts.dev/articles/how-to-set-remove-cookie-in-react

  const value = {
    err,
    setErr,
    fromLogin,
    setFromLogin,
  };

  // useEffect(() => {
  //   const getToken = async ({ username, password }) => {
  //     try {
  //       const response = await login({ username, password });
  //       console.log('context', response);
  //       return response; 
  //     } catch (error) {
  //       console.error('auth', error);
  //       setErr(error)
  //     }
  //   };
  //   getToken(fromLogin);
  // }, [fromLogin]);

  return (
    <AuthContext.Provider value={ value }>
      {children}
    </AuthContext.Provider>
  )
}
