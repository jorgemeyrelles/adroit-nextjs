/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useContext } from 'react'
import Head from 'next/head'

import { Form } from '@unform/web'
import * as Yup from 'yup'

import { Typography, Container, InputAdornment } from '@material-ui/core'
import { LockOutlined, AlternateEmailOutlined } from '@material-ui/icons'

import { getValidationErrors } from '../utils/getValidationErrors'

import { AuthContext } from '../contexts/AuthContext'
import { withSSRGuest } from '../utils/withSSRGuest'

import { Input } from '../components/Form/Input'
import { Button } from '../components/Touchables/Button'

import { useStyles } from '../styles/pages/sign-in'

export default function SignIn() {
  const formRef = useRef(null)
  const styles = useStyles()

  const [loading, setLoading] = useState(false)

  const { signIn, error } = useContext(AuthContext)

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({})

      setLoading(true)

      const schema = Yup.object().shape({
        username: Yup.string().required('O username é obrigatório'),
        password: Yup.string().required('A senha é obrigatória')
      })

      await schema.validate(data, { abortEarly: false })

      await signIn({
        variables: data
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = getValidationErrors(err)

        formRef.current.setErrors(validationErrors)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Login | Leafsense</title>
      </Head>

      <Container component="main" maxWidth="xs">
        <picture>
          <img className={styles.logo} src="/assets/leafsense.png" alt="logo" />
        </picture>

        <Container className={styles.container} maxWidth={false}>
          <div className={styles.paper}>
            <Typography className={styles.title} variant="h5">
              Bem vindo
            </Typography>

            <Typography className={styles.subtitle} variant="body1">
              Insira as credenciais para continuar
            </Typography>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="username"
                className={styles.input}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailOutlined className={styles.root} />
                    </InputAdornment>
                  )
                }}
              />

              <Input
                type="password"
                name="password"
                className={styles.input}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined className={styles.root} />
                    </InputAdornment>
                  )
                }}
              />

              <Button
                type="submit"
                className={styles.submit}
                color="primary"
                loading={loading}
                disabled={loading}
              >
                Entrar
              </Button>

              {error && (
                <Typography variant="caption" className={styles.errorMessage}>
                  {error}
                </Typography>
              )}
            </Form>
          </div>
        </Container>
      </Container>
    </>
  )
}

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {}
  }
})
