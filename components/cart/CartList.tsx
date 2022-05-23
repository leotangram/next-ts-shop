import { initialData } from '../../database/products'
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

const productsInCart = initialData.products.filter((_, index) => index < 4)
console.log({ productsInCart })

export const CartList = () => {
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
              <ItemCounter />
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle">{`$${price}`}</Typography>
            <Button variant="text" color="secondary">
              Remover
            </Button>
          </Grid>
        </Grid>
      ))}
    </>
  )
}
