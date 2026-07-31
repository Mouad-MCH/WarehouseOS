import { ProductInpute } from "@/lib/validations/product"
import { IProduct } from "@/types/Product"
import { revalidateTag } from "next/cache"

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

export const createProduct = async (
  data: ProductInpute
): Promise<ApiResponse<IProduct>> => {
  try {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    

    const body = await res.json()

    if (!res.ok) {
      return {
        success: false,
        message: body.message || "Failed to create product",
        errors: body.errors,
      }
    }

    revalidateTag('products')

    return {
      success: true,
      data: body.data,
      message: body.message,
    }
  } catch (error) {
    console.error("createProduct error:", error)
    return {
      success: false,
      message: "Network error. Please try again.",
    }
  }
}

export const getProducts = async (
  archived: boolean
): Promise<ApiResponse<IProduct[]>> => {
  try {
    const params = new URLSearchParams()
    params.set("archived", String(archived))

    const res = await fetch(`/api/products?${params}`,  
      {
        next: { 
          tags: ['products'] ,
          revalidate: 3600,
        }
      })

    const body = await res.json()

    if (!res.ok) {
      return {
        success: false,
        message: body.message || "Failed to load products",
      }
    }

    return {
      success: true,
      data: body.data,
      message: body.message,
    }
  } catch (error) {
    console.error("getProducts error:", error)
    return {
      success: false,
      message: "Network error. Please try again.",
    }
  }
}

export const getProduct = async (
  id: string
): Promise<ApiResponse<IProduct>> => {
  try {
    const res = await fetch(`/api/products/${id}`)

    const body = await res.json()

    if (!res.ok) {
      return {
        success: false,
        message: body.message || "Failed to load product",
      }
    }

    return {
      success: true,
      data: body.data,
      message: body.message,
    }
  } catch (error) {
    console.error("getProduct error:", error)
    return {
      success: false,
      message: "Network error. Please try again.",
    }
  }
}

export const updateProduct = async (
  id: string,
  data: ProductInpute
): Promise<ApiResponse<IProduct>> => {
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    const body = await res.json()

    if (!res.ok) {
      return {
        success: false,
        message: body.message || "Failed to update product",
        errors: body.errors,
      }
    }

    revalidateTag('products')

    return {
      success: true,
      data: body.data,
      message: body.message,
    }
  } catch (error) {
    console.error("updateProduct error:", error)
    return {
      success: false,
      message: "Network error. Please try again.",
    }
  }
}

export const archiveProduct = async (
  id: string
): Promise<ApiResponse<IProduct>> => {
  try {
    const res = await fetch(`/api/products/${id}/archive`, {
      method: "PATCH",
    })

    const body = await res.json()

    if (!res.ok) {
      return {
        success: false,
        message: body.message || "Failed to update product status",
      }
    }

    return {
      success: true,
      data: body.data,
      message: body.message,
    }
  } catch (error) {
    console.error("archiveProduct error:", error)
    return {
      success: false,
      message: "Network error. Please try again.",
    }
  }
}