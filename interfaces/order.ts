import { ISize } from './products'
import { IUser } from './user'

export interface IOrder {
  _id?: string
  isPaid: boolean
  numberOfItems: number
  orderItems: IOrderItem[]
  paidAt?: string
  paymentResult?: string
  shippingAddress: ShippingAddress
  subTotal: number
  tax: number
  total: number
  user?: IUser | string
}

export interface IOrderItem {
  _id: string
  gender: string
  image: string
  price: number
  quantity: number
  size: ISize
  slug: string
  title: string
}

export interface ShippingAddress {
  address: string
  address2?: string
  city: string
  country: string
  firstName: string
  lastName: string
  phone: string
  zip: string
}
