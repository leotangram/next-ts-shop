import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'
import { ShopLayout } from '../../components/layouts/ShopLayout'
import {
  ProductSizeSelector,
  ProductSlideShow
} from '../../components/products'
import { ItemCounter } from '../../components/ui'
import { dbProducts } from '../../database'
import { IProduct } from '../../interfaces'

interface ProductPageProps {
  product: IProduct
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  const { title, description, images, price, sizes } = product

  return (
    <ShopLayout title={title} pageDescription={description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {`$${price}`}
            </Typography>
            <Box sx={{ marginY: 2 }}>
              <Typography variant="subtitle2">Cantindad:</Typography>
              <ItemCounter />
              <ProductSizeSelector selectedSize={sizes[3]} sizes={sizes} />
            </Box>
            <Button color="secondary" className="circular-btn">
              Agregar al carrito
            </Button>
            {/* <Chip label="No hay disponibles" color="error" variant="outlined" /> */}
            <Box sx={{ marginTop: 3 }}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body2">{description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string }

  const product = await dbProducts.getProductBySlug(slug)

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    }
  }
}

export default ProductPage
