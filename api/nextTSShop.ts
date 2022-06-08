import axios from 'axios'

const nextTSShop = axios.create({
  baseURL: '/api'
})

export default nextTSShop
