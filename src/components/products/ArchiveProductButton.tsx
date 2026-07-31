"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Button from "@/components/ui/Button"
import { archiveProduct } from "@/services/product"

interface ArchiveProductButtonProps {
  productId: string
  archived: boolean
  onSuccess?: () => void
}

export default function ArchiveProductButton({
  productId,
  archived,
  onSuccess,
}: ArchiveProductButtonProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClick = async () => {
    const confirmed = window.confirm(
      archived
        ? "Restore this product?"
        : "Archive this product? It will be hidden from the default list."
    )
    if (!confirmed) return

    setIsSubmitting(true)
    const result = await archiveProduct(productId)
    setIsSubmitting(false)

    if (result.success) {
      if (onSuccess) {
        onSuccess()
      } else {
        router.refresh()
      }
    } else {
      window.alert(result.message ?? "Something went wrong")
    }
  }

  return (
    <Button
      type="button"
      variant="outlined"
      onClick={handleClick}
      disabled={isSubmitting}
    >
      {isSubmitting ? "Please wait..." : archived ? "Restore" : "Archive"}
    </Button>
  )
}
