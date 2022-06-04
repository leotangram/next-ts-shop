import { Box, Typography } from '@mui/material'
import type { NextPage, GetServerSideProps } from 'next'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { dbProducts } from '../../database'
import { IProduct } from '../../interfaces'

interface SearchPageProps {
  products: IProduct[]
  foundProducts: boolean
  query: string
}

const SearchPage: NextPage<SearchPageProps> = ({
  products,
  foundProducts,
  query
}) => {
  return (
    <ShopLayout
      title="Next TS Shop - Search"
      pageDescription="Encuentra los mejores productos de Next TS Aquí"
    >
      <Typography variant="h1" component="h1">
        Buscar productos
      </Typography>
      {foundProducts ? (
        <Typography
          variant="h2"
          sx={{ marginBottom: 1 }}
          textTransform="capitalize"
        >
          Término: {query}
        </Typography>
      ) : (
        <Box display="flex">
          <Typography variant="h2" sx={{ marginBottom: 1 }}>
            No encontramos ningún producto
          </Typography>
          <Typography
            variant="h2"
            sx={{ marginLeft: 1 }}
            color="secondary"
            textTransform="capitalize"
          >
            {query}
          </Typography>
        </Box>
      )}
      <ProductList products={products} />
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string }

  if (!query.length) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  let products = await dbProducts.getProductsByTerm(query)
  const foundProducts = !!products.length

  if (!foundProducts) {
    products = await dbProducts.getProductsByTerm('shirt')
    // products = await dbProducts.getAllProducts()
  }

  return {
    props: {
      products,
      foundProducts,
      query
    }
  }
}

export default SearchPage
