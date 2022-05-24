import { Chip, Grid, Link, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import NextLink from 'next/link'
import { ShopLayout } from '../../components/layouts'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullName', headerName: 'Nombre completo', width: 300 },
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra información si está pagada la orden o no',
    width: 200,
    renderCell: (params: GridValueGetterParams) =>
      params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No pagada" variant="outlined" />
      )
  },
  {
    field: 'order',
    headerName: 'Ver orden',
    width: 200,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => (
      <NextLink href={`/orders/${params.row.id}`} passHref>
        <Link underline="always">Ver orden</Link>
      </NextLink>
    )
  }
]

const rows = [
  { id: 1, paid: true, fullName: 'Leonardo Omaña' },
  { id: 2, paid: false, fullName: 'Fernando Herrera' },
  { id: 3, paid: true, fullName: 'Bruce Banner' },
  { id: 4, paid: false, fullName: 'Steve Rogers' },
  { id: 5, paid: true, fullName: 'Tony Stark' },
  { id: 6, paid: false, fullName: 'Peter Parker' }
]

const HistoryPage = () => {
  return (
    <ShopLayout
      title="Historial de ordenes"
      pageDescription="Historial de ordenes del cliente"
    >
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default HistoryPage
