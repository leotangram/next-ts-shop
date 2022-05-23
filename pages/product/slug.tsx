import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import { ShopLayout } from '../../components/layouts/ShopLayout'
import { ProductSlideShow } from '../../components/products'
import { initialData } from '../../database/products'

const { description, images, price, title } = initialData.products[0]

const ProductPage = () => {
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
              {/* ItemCounter */}
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

export default ProductPage
