import { ICategory } from "@/types/Category"

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
}

export const getCategories = async (): Promise<
  ApiResponse<(ICategory & { _id: string })[]>
> => {
  try {
    const res = await fetch("/api/categories")

    const body = await res.json()

    if (!res.ok) {
      return {
        success: false,
        message: body.message || "Failed to load categories",
      }
    }

    return {
      success: true,
      data: body.data,
      message: body.message,
    }
  } catch (error) {
    console.error("getCategories error:", error)
    return {
      success: false,
      message: "Network error. Please try again.",
    }
  }
}
