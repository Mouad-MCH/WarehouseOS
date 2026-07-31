"use client"

import { useEffect, useState } from "react"
import ProductForm, { CategoryOption } from "@/components/products/ProductForm"
import { getCategories } from "@/services/category"

export default function CreateProductPage() {
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    getCategories().then((result) => {
      if (cancelled) return

      if (result.success) {
        setCategories(
          (result.data ?? []).map((cat) => ({ _id: cat._id, name: cat.name }))
        )
      } else {
        setError(result.message ?? "Failed to load categories")
      }
      setIsLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-primary">
          Add Product
        </h1>
        <p className="text-sm text-neutral">
          Create a new product in your catalog.
        </p>
      </div>

      <div className="rounded-xl border border-primary/10 bg-white p-6">
        {isLoading ? (
          <p className="py-8 text-center text-sm text-neutral">
            Loading categories...
          </p>
        ) : error ? (
          <p className="py-8 text-center text-sm text-red-600">{error}</p>
        ) : (
          <ProductForm mode="create" categories={categories} />
        )}
      </div>
    </div>
  )
}
