import { useContext, useState } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import { ShopLayout } from '../../components/layouts/ShopLayout'
import {
  ProductSizeSelector,
  ProductSlideShow
} from '../../components/products'
import { ItemCounter } from '../../components/ui'
import { dbProducts } from '../../database'
import { ICartProduct, IProduct, ISize } from '../../interfaces'
import { useRouter } from 'next/router'
import { CartContext } from '../../context/cart/CartContext'

interface ProductPageProps {
  product: IProduct
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  const {
    _id,
    gender,
    title,
    description,
    images,
    price,
    sizes,
    inStock,
    slug
  } = product

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id,
    image: images[0],
    price,
    size: undefined,
    slug,
    title,
    gender,
    quantity: 1
  })

  const router = useRouter()

  const { addProductToCart } = useContext(CartContext)

  const onSelectedSize = (size: ISize) =>
    setTempCartProduct(currentTempCartProduct => ({
      ...currentTempCartProduct,
      size
    }))

  const onAddProduct = () => {
    if (!tempCartProduct.size) return

    addProductToCart(tempCartProduct)
    // router.push('/cart')
  }

  const onUpdateQuantity = (quantity: number) =>
    setTempCartProduct(currentTempCartProduct => ({
      ...currentTempCartProduct,
      quantity
    }))

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
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updateQuantity={onUpdateQuantity}
                maxValue={inStock > 5 ? 5 : inStock}
              />
              <ProductSizeSelector
                // selectedSize={sizes[3]}
                sizes={sizes}
                selectedSize={tempCartProduct.size}
                onSelectedSize={onSelectedSize}
              />
            </Box>
            {!!inStock ? (
              <Button
                color="secondary"
                className="circular-btn"
                onClick={onAddProduct}
              >
                {tempCartProduct.size
                  ? 'Agregar al carrito'
                  : 'Seleccione una talla'}
              </Button>
            ) : (
              <Chip
                label="No hay disponibles"
                color="error"
                variant="outlined"
              />
            )}
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

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug = '' } = params as { slug: string }

//   const product = await dbProducts.getProductBySlug(slug)

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }

// You should use getStaticPaths if you???re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async ctx => {
  const productsSlugs = await dbProducts.getAllProductSlugs()

  return {
    paths: productsSlugs.map(({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user???s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast ??? getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
    },
    revalidate: 60 * 60 * 24
  }
}

export default ProductPage
