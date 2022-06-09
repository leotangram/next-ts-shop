import { FC, useEffect, useReducer } from 'react'
import Cookie from 'js-cookie'
import { ICartProduct } from '../../interfaces'
import { CartContext, cartReducer } from './'

export interface CartState {
  isLoaded: boolean
  cart: ICartProduct[]
  numberOfItems: number
  subTotal: number
  tax: number
  total: number
  shippingAddress?: ShippingAddress
}

interface CartProviderProps {
  children: JSX.Element | JSX.Element[]
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  address: string
  address2?: string
  zip: string
  city: string
  country: string
  phone: string
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined
}

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get('cart')
        ? JSON.parse(Cookie.get('cart')!)
        : []

      dispatch({
        type: 'Cart - LoadCart from cookies | storage',
        payload: cookieProducts
      })
    } catch (error) {
      dispatch({
        type: 'Cart - LoadCart from cookies | storage',
        payload: []
      })
    }
  }, [])

  useEffect(() => {
    if (Cookie.get('firstName')) {
      const shippingAddress = {
        firstName: Cookie.get('firstName') || '',
        lastName: Cookie.get('lastName') || '',
        address: Cookie.get('address') || '',
        address2: Cookie.get('address2') || '',
        zip: Cookie.get('zip') || '',
        city: Cookie.get('city') || '',
        country: Cookie.get('country') || '',
        phone: Cookie.get('phone') || ''
      }

      dispatch({
        type: 'Cart - Load address from cookies',
        payload: shippingAddress
      })
    }
  }, [])

  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart))
  }, [state.cart])

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prevValue, currentvalue) => currentvalue.quantity + prevValue,
      0
    )

    const subTotal = state.cart.reduce(
      (prevValue, currentValue) =>
        currentValue.price * currentValue.quantity + prevValue,
      0
    )

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1)
    }

    dispatch({ type: 'Cart - Update order summary', payload: orderSummary })
  }, [state.cart])

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some(({ _id }) => _id === product._id)
    if (!productInCart)
      return dispatch({
        type: 'Cart - Update products in cart',
        payload: [...state.cart, product]
      })

    const productInCartButDiferentSize = state.cart.some(
      ({ _id, size }) => _id === product._id && size === product.size
    )
    if (!productInCartButDiferentSize)
      return dispatch({
        type: 'Cart - Update products in cart',
        payload: [...state.cart, product]
      })

    const updatedProducts = state.cart.map(currentProduct => {
      if (currentProduct._id !== product._id) return currentProduct
      if (currentProduct.size !== product.size) return currentProduct

      currentProduct.quantity += product.quantity

      Cookie.set('cart', JSON.stringify(currentProduct))

      return currentProduct
    })

    dispatch({
      type: 'Cart - Update products in cart',
      payload: updatedProducts
    })
  }

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: 'Cart - Change cart quantity', payload: product })
  }

  const removeCartProducts = (product: ICartProduct) => {
    dispatch({ type: 'Cart - Remove product in cart', payload: product })
  }

  const updateAddress = (address: ShippingAddress) => {
    Cookie.set('firstName', address.firstName)
    Cookie.set('lastName', address.lastName)
    Cookie.set('address', address.address)
    Cookie.set('address2', address.address2 || '')
    Cookie.set('zip', address.zip)
    Cookie.set('city', address.city)
    Cookie.set('country', address.country)
    Cookie.set('phone', address.phone)
    dispatch({ type: 'Cart - Update address', payload: address })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        removeCartProducts,
        updateCartQuantity,
        updateAddress
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
