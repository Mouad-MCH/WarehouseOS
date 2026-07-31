"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Button from "@/components/ui/Button"
import ArchiveProductButton from "@/components/products/ArchiveProductButton"
import { getProduct } from "@/services/product"
import { IProduct } from "@/types/Product"

interface ProductDetailPageProps {
  params: { id: string }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [product, setProduct] = useState<IProduct | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProduct = () => {
    setIsLoading(true)
    setError(null)

    return getProduct(params.id).then((result) => {
      if (result.success && result.data) {
        setProduct(result.data)
      } else {
        setError(result.message ?? "Product not found")
      }
      setIsLoading(false)
    })
  }

  useEffect(() => {
    fetchProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  if (isLoading) {
    return (
      <div className="rounded-xl border border-primary/10 bg-white px-6 py-16 text-center text-sm text-neutral">
        Loading product...
      </div>
    )
  }

  if (error || !product) {
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

  const category = product.category as unknown as { name?: string } | null

  const fields: Array<{ label: string; value: string }> = [
    { label: "SKU", value: product.sku },
    { label: "Category", value: category?.name ?? "—" },
    { label: "Description", value: product.description },
    { label: "Price", value: product.price.toFixed(2) },
    { label: "Quantity", value: String(product.quantity) },
  ]

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-primary">
            {product.name}
          </h1>
          {product.archived ? (
            <span className="text-sm text-neutral">Archived</span>
          ) : (
            <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Active
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/products/${params.id}/edit`}>
            <Button type="button" variant="outlined">
              Edit
            </Button>
          </Link>
          <ArchiveProductButton
            productId={params.id}
            archived={product.archived}
            onSuccess={fetchProduct}
          />
        </div>
      </div>

      <div className="divide-y divide-primary/10 rounded-xl border border-primary/10 bg-white">
        {fields.map((field) => (
          <div key={field.label} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm font-medium font-body text-neutral">
              {field.label}
            </span>
            <span className="text-sm font-body text-primary">{field.value}</span>
          </div>
        ))}
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
