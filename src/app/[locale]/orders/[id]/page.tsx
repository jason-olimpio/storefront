import OrderPage from './OrderPage'

export function generateStaticParams() {
  return Array.from({ length: 500 }, (_, i) => ({
    id: (i + 1).toString()
  }))
}

const Page = () => <OrderPage />

export default Page
