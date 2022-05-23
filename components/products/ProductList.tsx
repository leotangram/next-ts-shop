import { FC } from 'react'
import { Grid } from '@mui/material'
import { IProduct } from '../../interfaces'
import { ProductCard } from './ProductCard'

interface ProductListProps {
  products: IProduct[]
}

export const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map(product => (
        <Grid item xs={6} sm={4} key={product.slug}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  )
}
