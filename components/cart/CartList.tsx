import { FC } from 'react'
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
import { initialData } from '../../database/products'
import { ItemCounter } from '../ui'

const productsInCart = initialData.products.filter((_, index) => index < 4)

interface CartListProps {
  editable?: boolean
}

export const CartList: FC<CartListProps> = ({ editable = false }) => {
  return (
    <>
      {productsInCart.map(({ images, price, slug, title }) => (
        <Grid key={slug} container spacing={2} sx={{ marginBottom: 1 }}>
          <Grid item xs={3}>
            <NextLink href={`/product/slug`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`products/${images[0]}`}
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
                Talla: <strong>M</strong>
              </Typography>
              {editable ? (
                <ItemCounter />
              ) : (
                <Typography variant="h5">3 items</Typography>
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
            <Typography variant="subtitle1">{`$${price}`}</Typography>
            {editable && (
              <Button variant="text" color="secondary">
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  )
}
