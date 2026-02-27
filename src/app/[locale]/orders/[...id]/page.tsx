import { OrderClient } from './OrderClient'

export async function generateStaticParams() {
  return Array.from({ length: 500 }, (_, i) => ({
    id: [(i + 1).toString()]
  }))
}

const OrderPage = () => <OrderClient />

export default OrderPage
