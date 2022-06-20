import { FC, useContext } from 'react'
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography
} from '@mui/material'
import NextLink from 'next/link'
import { ItemCounter } from '../ui'
import { CartContext } from '../../context/cart'
import { ICartProduct, IOrderItem } from '../../interfaces'
import { currency } from '../../utils'

interface CartListProps {
  editable?: boolean
  products?: IOrderItem[]
}

export const CartList: FC<CartListProps> = ({ editable = false, products }) => {
  const {
    cart = [],
    updateCartQuantity,
    removeCartProducts
  } = useContext(CartContext)

  const onNewCartQuantityValue = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue
    updateCartQuantity(product)
  }

  const productsToShow = products ? products : cart

  return (
    <>
      {productsToShow?.map(product => {
        const { image, price, quantity, size, slug, title } = product
        return (
          <Grid
            key={`${slug}${size}`}
            container
            spacing={2}
            sx={{ marginBottom: 1 }}
          >
            <Grid item xs={3}>
              <NextLink href={`/product/${slug}`} passHref>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`/products/${image}`}
                      component="img"
                      sx={{ borderRadius: 5 }}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={7}>
              <Box display="flex" flexDirection="column">
                <Typography variant="body1">{title}</Typography>
                <Typography variant="body1">
                  Talla: <strong>{size}</strong>
                </Typography>
                {editable ? (
                  <ItemCounter
                    currentValue={quantity}
                    maxValue={10}
                    updateQuantity={value =>
                      onNewCartQuantityValue(product as ICartProduct, value)
                    }
                  />
                ) : (
                  <Typography variant="h5">
                    {quantity} {quantity > 1 ? 'productos' : 'producto'}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="subtitle1">
                {currency.format(price)}
              </Typography>
              {editable && (
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => removeCartProducts(product as ICartProduct)}
                >
                  Remover
                </Button>
              )}
            </Grid>
          </Grid>
        )
      })}
    </>
  )
}
