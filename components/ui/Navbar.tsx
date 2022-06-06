import { ChangeEvent, useContext, useMemo, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography
} from '@mui/material'
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined
} from '@mui/icons-material'
import { CartContext, UIContext } from '../../context'

const CATEGORY = {
  CHILDREN: '/category/children',
  MEN: '/category/men',
  WOMEN: '/category/women'
}

export const Navbar = () => {
  const router = useRouter()
  const { toggleSideMenu } = useContext(UIContext)
  const { numberOfItems } = useContext(CartContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const onChangeSearchTerm = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setSearchTerm(e.target.value)

  const onSearchTerm = () => {
    router.push(`/search/${searchTerm}`)
  }

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
        <Box
          sx={{
            display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' }
          }}
          className="fadeIn"
        >
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
        {isSearchVisible ? (
          <Input
            sx={{
              display: { xs: 'none', sm: 'flex' }
            }}
            className="fadeIn"
            autoFocus
            value={searchTerm}
            onChange={onChangeSearchTerm}
            onKeyPress={event =>
              event.key === 'Enter' ? onSearchTerm() : null
            }
            type="text"
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            onClick={() => setIsSearchVisible(true)}
            className="fadeIn"
            sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
            <SearchOutlined />
          </IconButton>
        )}
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>
        <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge
                badgeContent={numberOfItems > 9 ? '+9' : numberOfItems}
                color="secondary"
              >
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <Button onClick={toggleSideMenu}>Menú</Button>
      </Toolbar>
    </AppBar>
  )
}
