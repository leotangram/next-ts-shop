import { createContext } from 'react'
import { ICartProduct } from '../../interfaces'

interface CartContextProps {
  cart: ICartProduct[]
  numberOfItems: number
  subTotal: number
  tax: number
  total: number
  addProductToCart: (product: ICartProduct) => void
  updateCartQuantity: (product: ICartProduct) => void
  removeCartProducts: (product: ICartProduct) => void
}

export const CartContext = createContext({} as CartContextProps)
