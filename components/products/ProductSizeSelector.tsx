import { FC } from 'react'
import { ISize } from '../../interfaces'
import { Box, Button } from '@mui/material'

interface ProductSizeSelectorProps {
  selectedSize?: ISize
  sizes: ISize[]
  onSelectedSize: (size: ISize) => void
}

export const ProductSizeSelector: FC<ProductSizeSelectorProps> = ({
  selectedSize,
  sizes,
  onSelectedSize
}) => {
  return (
    <Box>
      {sizes.map(size => (
        <Button
          key={size}
          size="small"
          color={selectedSize === size ? 'primary' : 'info'}
          onClick={() => onSelectedSize(size)}
        >
          {size}
        </Button>
      ))}
    </Box>
  )
}
