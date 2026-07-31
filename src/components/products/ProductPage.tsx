"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Package, Plus } from "lucide-react"
import Button from "@/components/ui/Button"
import ArchiveProductButton from "@/components/products/ArchiveProductButton"
import { getProducts } from "@/services/product"
import { IProduct } from "@/types/Product"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const showArchived = searchParams.get("archived") === "true"

  const [products, setProducts] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = () => {
    setIsLoading(true)
    setError(null)

    return getProducts(showArchived).then((result) => {
      if (result.success) {
        setProducts(result.data ?? [])
      } else {
        setError(result.message ?? "Failed to load products")
      }
      setIsLoading(false)
    })
  }

  useEffect(() => {
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showArchived])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-primary">
            Products
          </h1>
          <p className="text-sm text-neutral">
            {showArchived ? "Archived products" : "Active products"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={showArchived ? "/products" : "/products?archived=true"}
            className="text-sm font-medium font-body text-neutral hover:text-primary"
          >
            {showArchived ? "View active" : "Show archived"}
          </Link>
          <Link href="/products/create">
            <Button type="button" variant="primary" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-xl border border-primary/10 bg-white px-6 py-16 text-center text-sm text-neutral">
          Loading products...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-dashed border-red-200 bg-red-50 px-6 py-16 text-center text-sm text-red-600">
          {error}
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-primary/20 bg-white px-6 py-16 text-center">
          <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-neutral">
            <Package className="h-5 w-5" />
          </span>
          <h2 className="font-heading text-lg font-semibold text-primary">
            {showArchived ? "No archived products" : "No products yet"}
          </h2>
          <p className="mx-auto mt-1 max-w-md text-sm text-neutral">
            {showArchived
              ? "Products you archive will show up here."
              : "Get started by adding your first product."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-primary/10 bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-primary/10 text-xs font-medium uppercase tracking-wide text-neutral">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const category = product.category as unknown as {
                  name?: string
                } | null

                return (
                  <tr
                    key={product._id}
                    className="border-b border-primary/5 last:border-0"
                  >
                    <td className="px-4 py-3 font-medium font-body text-primary">
                      <Link
                        href={`/products/${product._id}`}
                        className="hover:text-secondary"
                      >
                        {product.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-neutral">{product.sku}</td>
                    <td className="px-4 py-3 text-neutral">
                      {category?.name ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-neutral">
                      {product.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-neutral">{product.quantity}</td>
                    <td className="px-4 py-3">
                      {product.archived ? (
                        <span className="text-sm text-neutral">Archived</span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
                          <span className="h-2 w-2 rounded-full bg-green-500" />
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/products/${product._id}/edit`}
                          className="rounded-lg border border-primary/10 px-3 py-1.5 text-sm font-medium font-body text-primary hover:bg-surface"
                        >
                          Edit
                        </Link>
                        <ArchiveProductButton
                          productId={product._id}
                          archived={product.archived}
                          onSuccess={fetchProducts}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
