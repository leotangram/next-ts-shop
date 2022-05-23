import { FC } from 'react'
import { ISize } from '../../interfaces'
import { Box, Button } from '@mui/material'

interface ProductSizeSelectorProps {
  selectedSize?: ISize
  sizes: ISize[]
}

export const ProductSizeSelector: FC<ProductSizeSelectorProps> = ({
  selectedSize,
  sizes
}) => {
  return (
    <Box>
      {sizes.map(size => (
        <Button
          key={size}
          size="small"
          color={selectedSize === size ? 'primary' : 'info'}
        >
          {size}
        </Button>
      ))}
    </Box>
  )
}
