import { Suspense } from 'react'
import ProductsPage from '@/components/products/ProductPage'

const page = () => {
  return (
    <Suspense fallback={null}>
      <ProductsPage />
    </Suspense>
  )
}

export default page
