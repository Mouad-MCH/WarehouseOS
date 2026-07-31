"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import { productSchema } from "@/lib/validations/product"
import { createProduct, updateProduct } from "@/services/product"

export interface CategoryOption {
  _id: string
  name: string
}

export interface ProductFormValues {
  name: string
  sku: string
  description: string
  category: string
  price: string
  quantity: string
}

interface ProductFormProps {
  mode: "create" | "edit"
  categories: CategoryOption[]
  productId?: string
  initialValues?: ProductFormValues
}

const emptyValues: ProductFormValues = {
  name: "",
  sku: "",
  description: "",
  category: "",
  price: "",
  quantity: "0",
}

export default function ProductForm({
  mode,
  categories,
  productId,
  initialValues,
}: ProductFormProps) {
  const router = useRouter()
  const [values, setValues] = useState<ProductFormValues>(
    initialValues ?? emptyValues
  )
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange =
    (field: keyof ProductFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setFieldErrors({})

    const parsed = productSchema.safeParse({
      name: values.name,
      sku: values.sku,
      description: values.description,
      category: values.category,
      price: Number(values.price),
      quantity: Number(values.quantity),
    })

    if (!parsed.success) {
      setFieldErrors(parsed.error.flatten().fieldErrors)
      return
    }

    setIsSubmitting(true)

    const result =
      mode === "create"
        ? await createProduct(parsed.data)
        : await updateProduct(productId as string, parsed.data)

    setIsSubmitting(false)

    if (!result.success || !result.data) {
      setFormError(result.message ?? "Something went wrong")
      if (result.errors) {
        setFieldErrors(result.errors)
      }
      return
    }

    router.push(`/products/${result.data._id}`)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {formError && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {formError}
        </div>
      )}

      <Input
        id="name"
        label="Name"
        value={values.name}
        onChange={handleChange("name")}
        error={fieldErrors.name?.[0]}
      />

      <Input
        id="sku"
        label="SKU"
        value={values.sku}
        onChange={handleChange("sku")}
        error={fieldErrors.sku?.[0]}
      />

      <div>
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-medium font-body text-primary"
        >
          Description
        </label>
        <textarea
          id="description"
          value={values.description}
          onChange={handleChange("description")}
          rows={3}
          className={`w-full rounded-md border px-3 py-2 text-sm font-body text-primary focus:outline-none focus:ring-1 ${
            fieldErrors.description
              ? "border-red-400 focus:border-red-400 focus:ring-red-400"
              : "border-neutral/40 focus:border-secondary focus:ring-secondary"
          }`}
        />
        {fieldErrors.description?.[0] && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.description[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="category"
          className="mb-1 block text-sm font-medium font-body text-primary"
        >
          Category
        </label>
        <select
          id="category"
          value={values.category}
          onChange={handleChange("category")}
          className={`w-full rounded-md border bg-white px-3 py-2 text-sm font-body text-primary focus:outline-none focus:ring-1 ${
            fieldErrors.category
              ? "border-red-400 focus:border-red-400 focus:ring-red-400"
              : "border-neutral/40 focus:border-secondary focus:ring-secondary"
          }`}
        >
          <option value="" disabled>
            {categories.length ? "Select a category" : "No categories yet — create one first"}
          </option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        {fieldErrors.category?.[0] && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.category[0]}</p>
        )}
      </div>

      <Input
        id="price"
        label="Price"
        type="number"
        step="0.01"
        min="0"
        value={values.price}
        onChange={handleChange("price")}
        error={fieldErrors.price?.[0]}
      />

      <Input
        id="quantity"
        label={mode === "create" ? "Initial quantity" : "Quantity"}
        type="number"
        min="0"
        step="1"
        value={values.quantity}
        onChange={handleChange("quantity")}
        disabled={mode === "edit"}
        helperText={mode === "edit" ? "Change via Stock Movements" : undefined}
        error={fieldErrors.quantity?.[0]}
      />

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outlined"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : mode === "create"
              ? "Create product"
              : "Save changes"}
        </Button>
      </div>
    </form>
  )
}
