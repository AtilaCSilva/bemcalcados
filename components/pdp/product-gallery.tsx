"use client"

import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import type { ProductColorVariant } from "@/lib/product-types"
import { resolveImageSrc } from "@/lib/product-types"
import { cardImage } from "@/lib/interaction"

type ProductGalleryProps = {
  productName: string
  selectedColorId: string
  colors: ProductColorVariant[]
  defaultImageUrl?: string
}

function getVariantImage(color?: ProductColorVariant) {
  if (!color) return undefined
  return color.image ?? color.image_url
}

export function ProductGallery({ productName, selectedColorId, colors, defaultImageUrl }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const selectedColor = selectedColorId ? colors.find((color) => color.id === selectedColorId) : undefined

  const images = useMemo(() => {
    const primarySrc = selectedColor
      ? resolveImageSrc(getVariantImage(selectedColor) ?? defaultImageUrl)
      : resolveImageSrc(defaultImageUrl)

    const items = [
      {
        src: primarySrc,
        alt: selectedColor ? `${productName} — ${selectedColor.label}` : productName,
      },
    ]

    const hoverSrc = selectedColor?.hover_image_url ?? undefined
    if (hoverSrc) {
      items.push({
        src: resolveImageSrc(hoverSrc),
        alt: selectedColor
          ? `${productName} — ${selectedColor.label} em uso`
          : `${productName} em uso`,
      })
    }

    return items
  }, [productName, selectedColor, defaultImageUrl])

  useEffect(() => {
    setActiveIndex(0)
  }, [selectedColorId])

  if (images.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-4">
      <div className={cn("relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm", cardImage)}>
        <img
          src={images[activeIndex]?.src ?? images[0].src}
          alt={images[activeIndex]?.alt ?? images[0].alt}
          className="h-full w-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3" role="group" aria-label="Miniaturas do produto">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={image.alt}
              aria-pressed={activeIndex === index}
              className={cn(
                "relative aspect-square overflow-hidden rounded-md border border-border bg-muted transition-all duration-200",
                activeIndex === index
                  ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                  : "opacity-70 hover:opacity-100",
              )}
            >
              <img src={image.src} alt="" className="h-full w-full object-cover" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
