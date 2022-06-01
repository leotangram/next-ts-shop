import { useContext, useMemo } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography
} from '@mui/material'
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { UIContext } from '../../context'

const CATEGORY = {
  CHILDREN: '/category/children',
  MEN: '/category/men',
  WOMEN: '/category/women'
}

export const Navbar = () => {
  const router = useRouter()
  const { toggleSideMenu } = useContext(UIContext)

  const category = useMemo(() => router.pathname, [router.pathname])

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Next TS |</Typography>
            <Typography sx={{ marginLeft: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>
        <Box flex={1} />
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <NextLink href="/category/men" passHref>
            <Link>
              <Button color={category === CATEGORY.MEN ? 'primary' : 'info'}>
                Hombres
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" passHref>
            <Link>
              <Button color={category === CATEGORY.WOMEN ? 'primary' : 'info'}>
                Mujeres
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/children" passHref>
            <Link>
              <Button
                color={category === CATEGORY.CHILDREN ? 'primary' : 'info'}
              >
                Niños
              </Button>
            </Link>
          </NextLink>
        </Box>
        <Box flex={1} />
        <IconButton>
          <SearchOutlined />
        </IconButton>
        <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <Button onClick={() => toggleSideMenu()}>Menú</Button>
      </Toolbar>
    </AppBar>
  )
}
