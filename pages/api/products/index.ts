import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Product } from '../../../models'
import { IProduct } from '../../../interfaces'

type Data =
  | {
      message: string
    }
  | IProduct[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res)

    default:
      return res.status(400).json({
        message: 'Bad request'
      })
  }

  res.status(200).json({ message: 'Example' })
}

async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect()
  const products = await Product.find()
    .select('title images prices inStock slug')
    .lean()
  await db.disconnect()
  return res.status(200).json(products)
}
