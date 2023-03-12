import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Button,
  Container,
  Input,
  InputAdornment,
  Snackbar,
  Stack,
  Typography
} from '@mui/material';
import HelmetHead from './HelmetHead';
import { useStyles } from '../styles/pages/sign-in.js';
import { AlternateEmailOutlined, LockOutlined } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import { login as loginApi } from '../service/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ToLogin({ token }) {
  const formRef = useRef(null);
  const styles = useStyles();
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState({ username: '', password: '' })
  const navigate = useNavigate();

  const { err, setErr } = useContext(AuthContext);

  // const mapStateToProps = useSelector((state) => ({
  //   token: state.user.token,
  // }));
  const dispatch = useDispatch();

  function handleChange({ target: { value, name } }) {
    // modifica status do error
    setErr(false);
    // coleta valores do input
    setLogin({
      ...login,
      [name]: value,
    });
  }

  useEffect(() => {
    const { username, password } = login;
    const minPass = 6;
    const emailValid = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    // valida formato do e-mail e tamanho da senha
    if (emailValid.test(username) && password.length >= minPass && password.length !== 0) {
      setLoading(false);
    } else {
      // alerta de erro
      setLoading(true);
    }
  }, [login]);

  async function handleSubmit(e) {
    e.preventDefault();
    const { username, password } = login;
    try {
      const response = await loginApi({ username, password });
      setErr(false)
      // enviando para o redux
      dispatch({type: 'USER', token: response});
      // console.log('context', response);
      navigate("/dashboard");
      return response; 
    } catch (error) {
      console.error('auth', error);
      setErr(true);
    }
  }

  const handleClose = (event, reason) => {
    setErr(false);
    if (reason === 'clickaway') {
      return;
    }
  };

  return (
    <>
      <HelmetHead title={"Login | Leafsense"} />
      <Container component="main" maxWidth="xs">
        <picture>
          <img className={styles.logo} src="/assets/leafsense.png" alt="logo" />
        </picture>
        <Container className={styles.container} maxWidth={false}>
          <div className={styles.paper}>
            <Typography className={styles.title} variant="h5">
              Bem vindo(a)
            </Typography>
            <Typography>
              Insira as credenciais para continuar
            </Typography>
            <form className={styles.form} ref={formRef} onSubmit={ (e) => handleSubmit(e) }>
              <Input
                name="username"
                className={styles.input}
                onChange={handleChange}
                // inputProps={{
                // }}
                startAdornment={
                  <InputAdornment position="start">
                    <AlternateEmailOutlined className={styles.root} />
                  </InputAdornment>
                }
              />
              <Input
                type="password"
                name="password"
                className={styles.input}
                onChange={handleChange}
                // inputProps={{
                // }}
                startAdornment = {
                  <InputAdornment position="start">
                    <LockOutlined className={styles.root} />
                  </InputAdornment>
                }
              />
              <Button
                type="submit"
                className={styles.submit}
                color="primary"
                loading={`${loading}`}
                disabled={loading}
              >
                Entrar
              </Button>
              <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar
                  open={err}
                  autoHideDuration={6000}
                  onClose={() => handleClose()}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                  <Alert
                    variant="filled"
                    onClose={() => handleClose()}
                    severity="error"
                    sx={{ width: '100%' }}
                  >
                    E-mail / senha inválido(s)!
                  </Alert>
                </Snackbar>
              </Stack>
            </form>
          </div>
        </Container>
      </Container>
    </>
  );
}

export default ToLogin;
