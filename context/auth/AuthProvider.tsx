import { FC, useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { nextTSShop } from '../../api'
import { IUser } from '../../interfaces'
import { AuthContext, authReducer } from './'

export interface AuthState {
  isLoggedIn: boolean
  user?: IUser
}

const Auth_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined
}

interface AuthProviderProps {
  children: JSX.Element | JSX.Element[]
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter()
  const { data, status } = useSession()
  const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE)

  useEffect(() => {
    if (status === 'authenticated') {
      console.log({ user: data.user })
      TODO: dispatch({ type: 'Auth - Login', payload: data.user as IUser })
    }
  }, [status, data])

  // useEffect(() => {
  //   checkToken()
  // }, [])

  const checkToken = async () => {
    if (!Cookies.get('token')) {
      return
    }
    try {
      const { data } = await nextTSShop.get('/user/validate-token')
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: 'Auth - Login', payload: user })
    } catch (error) {
      Cookies.remove('token')
    }
  }

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await nextTSShop.post('/user/login', { email, password })
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: 'Auth - Login', payload: user })

      return true
    } catch (error) {
      return false
    }
  }

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await nextTSShop.post('/user/register', {
        name,
        email,
        password
      })
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: 'Auth - Login', payload: user })

      return {
        hasError: false
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.message
        }
      }
      return {
        hasError: true,
        message: 'No se pudo crear el usuario - intente de nuevo'
      }
    }
  }

  const logout = () => {
    Cookies.remove('cart')
    Cookies.remove('firstName')
    Cookies.remove('lastName')
    Cookies.remove('address')
    Cookies.remove('address2')
    Cookies.remove('zip')
    Cookies.remove('city')
    Cookies.remove('country')
    Cookies.remove('phone')
    signOut()
  }

  return (
    <AuthContext.Provider value={{ ...state, loginUser, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
