"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import ProductForm, {
  CategoryOption,
  ProductFormValues,
} from "@/components/products/ProductForm"
import { getProduct } from "@/services/product"
import { getCategories } from "@/services/category"

interface EditProductPageProps {
  params: { id: string }
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const [productName, setProductName] = useState("")
  const [initialValues, setInitialValues] = useState<ProductFormValues | null>(null)
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    setIsLoading(true)
    setError(null)

    Promise.all([getProduct(params.id), getCategories()]).then(
      ([productResult, categoriesResult]) => {
        if (cancelled) return

        if (!productResult.success || !productResult.data) {
          setError(productResult.message ?? "Product not found")
          setIsLoading(false)
          return
        }

        if (!categoriesResult.success) {
          setError(categoriesResult.message ?? "Failed to load categories")
          setIsLoading(false)
          return
        }

        const product = productResult.data
        const category = product.category as unknown as { _id: unknown } | null

        setProductName(product.name)
        setInitialValues({
          name: product.name,
          sku: product.sku,
          description: product.description,
          category: category?._id ? String(category._id) : "",
          price: String(product.price),
          quantity: String(product.quantity),
        })
        setCategories(
          (categoriesResult.data ?? []).map((cat) => ({
            _id: cat._id,
            name: cat.name,
          }))
        )
        setIsLoading(false)
      }
    )

    return () => {
      cancelled = true
    }
  }, [params.id])

  if (isLoading) {
    return (
      <div className="rounded-xl border border-primary/10 bg-white px-6 py-16 text-center text-sm text-neutral">
        Loading product...
      </div>
    )
  }

  if (error || !initialValues) {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="rounded-xl border border-dashed border-red-200 bg-red-50 px-6 py-16 text-center text-sm text-red-600">
          {error ?? "Product not found"}
        </div>
        <Link
          href="/products"
          className="inline-block text-sm font-medium font-body text-neutral hover:text-primary"
        >
          ← Back to products
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-primary">
          Edit Product
        </h1>
        <p className="text-sm text-neutral">Update {productName}&apos;s details.</p>
      </div>

      <div className="rounded-xl border border-primary/10 bg-white p-6">
        <ProductForm
          mode="edit"
          productId={params.id}
          categories={categories}
          initialValues={initialValues}
        />
      </div>
    </div>
  )
}
