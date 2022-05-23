import { initialData } from '../../database/products'
import { Typography } from '@mui/material'

const productsInCart = initialData.products.filter((_, index) => index < 4)
console.log({ productsInCart })

export const CartList = () => {
  return (
    <>
      {productsInCart.map(({ slug, title }) => (
        <Typography key={slug}>{title}</Typography>
      ))}
    </>
  )
}
