import { FC, useMemo, useState } from 'react'
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Link,
  Typography
} from '@mui/material'
import { IProduct } from '../../interfaces'
import NextLink from 'next/link'

interface ProductCardProps {
  product: IProduct
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const productImage = useMemo(() => {
    return isHovered
      ? `/products/${product.images[1]}`
      : `/products/${product.images[0]}`
  }, [isHovered, product.images])

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
          <Link>
            <CardActionArea>
              {!product.inStock && (
                <Chip
                  color="primary"
                  label="No hay disponibles"
                  sx={{ position: 'absolute', zIndex: 99, top: 10, left: 10 }}
                />
              )}
              <CardMedia
                component="img"
                image={productImage}
                alt={product.title}
                className="fadeIn"
                onLoad={() => setImageLoaded(true)}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>
      <Box
        sx={{ marginTop: 1, display: imageLoaded ? 'block' : 'none' }}
        className="fadeIn"
      >
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>{`$${product.price}`}</Typography>
      </Box>
    </Box>
  )
}
