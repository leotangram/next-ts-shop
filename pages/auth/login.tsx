import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  LiteralUnion,
  signIn
} from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'
import { ErrorOutline } from '@mui/icons-material'
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils'

type FormData = {
  email: string
  password: string
}

const LoginPage = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const [showError, setShowError] = useState(false)
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null)

  useEffect(() => {
    getProviders().then(prov => {
      setProviders(prov)
    })
  }, [])

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false)

    // const isValidLogin = await loginUser(email, password)

    // if (!isValidLogin) {
    //   setShowError(true)
    //   setTimeout(() => setShowError(false), 3000)

    //   return
    // }

    // const destination = router.query.p?.toString() || '/'
    // router.replace(destination)

    await signIn('credentials', { email, password })
  }

  return (
    <AuthLayout title="Ingresar">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, paddin: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Iniciar Sesión
              </Typography>
              <Chip
                label="No reconocemos ese usuario / contraseña"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo"
                variant="filled"
                fullWidth
                type="email"
                {...register('email', {
                  required: 'Este campo es requerido',
                  validate: validations.isEmail
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                type="submit"
              >
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={
                  router.query.p
                    ? `/auth/register?p=${router.query.p}`
                    : '/auth/register'
                }
                passHref
              >
                <Link underline="always">¿No tienes cuenta?</Link>
              </NextLink>
            </Grid>
            {providers && (
              <Grid
                item
                xs={12}
                display="flex"
                justifyContent="end"
                flexDirection="column"
              >
                <Divider sx={{ width: '100%', marginBottom: 2 }} />
                {Object.values(providers).map(({ id, name }) => {
                  if (id === 'credentials') return null

                  return (
                    <Button
                      key={id}
                      variant="outlined"
                      fullWidth
                      color="primary"
                      sx={{ marginBottom: 1 }}
                      onClick={() => signIn(id)}
                    >
                      {name}
                    </Button>
                  )
                })}
              </Grid>
            )}
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query
}) => {
  const session = await getSession({ req })

  const { p = '/' } = query

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default LoginPage
