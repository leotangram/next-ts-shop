import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@mui/material'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'
import { ShopLayout } from '../../components/layouts'
import { countries } from '../../utils'
import { CartContext } from '../../context'

const getAddressFromCookies = (): FormData => {
  return {
    firstName: Cookies.get('firstName') || '',
    lastName: Cookies.get('lastName') || '',
    address: Cookies.get('address') || '',
    address2: Cookies.get('address2') || '',
    zip: Cookies.get('zip') || '',
    city: Cookies.get('city') || '',
    country: Cookies.get('country') || '',
    phone: Cookies.get('phone') || ''
  }
}

type FormData = {
  firstName: string
  lastName: string
  address: string
  address2: string
  zip: string
  city: string
  country: string
  phone: string
}

const AddressPage = () => {
  const router = useRouter()
  const { updateAddress } = useContext(CartContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
      zip: '',
      city: '',
      country: countries[0].code,
      phone: ''
    }
  })

  useEffect(() => {
    reset(getAddressFromCookies())
  }, [reset])

  const onAddressSubmit = (data: FormData) => {
    updateAddress(data)
    router.push('/checkout/summary')
  }

  return (
    <ShopLayout
      title="Dirección"
      pageDescription="Confirmar dirección del destino"
    >
      <form onSubmit={handleSubmit(onAddressSubmit)}>
        <Typography variant="h1" component="h1">
          Dirección
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              variant="filled"
              fullWidth
              {...register('firstName', {
                required: 'Este campo es requerido'
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido"
              variant="filled"
              fullWidth
              {...register('lastName', {
                required: 'Este campo es requerido'
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección"
              variant="filled"
              fullWidth
              {...register('address', {
                required: 'Este campo es requerido'
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección 2 (optional)"
              variant="filled"
              fullWidth
              {...register('address2')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Código postal"
              variant="filled"
              fullWidth
              {...register('zip', {
                required: 'Este campo es requerido'
              })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Ciudad"
              variant="filled"
              fullWidth
              {...register('city', {
                required: 'Este campo es requerido'
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <FormControl fullWidth> */}
            <TextField
              // select
              // defaultValue={Cookies.get('country') || countries[0].code}
              fullWidth
              variant="filled"
              label="País"
              {...register('country', {
                required: 'Este campo es requerido'
              })}
              error={!!errors.country}
              helperText={errors.country?.message}
            />
            {/* {countries.map(({ code, name }) => (
                  <MenuItem key={code} value={code}>
                    {name}
                  </MenuItem>
                ))}
              </TextField> */}
            {/* </FormControl> */}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Teléfono"
              variant="filled"
              fullWidth
              {...register('phone', {
                required: 'Este campo es requerido'
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 5 }} display="flex" justifyContent="center">
          <Button
            color="secondary"
            className="circular-btn"
            size="large"
            type="submit"
          >
            Revisar pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  )
}

export default AddressPage
