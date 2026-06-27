"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const images = [
  { src: "/product-1.png", alt: "Sneaker Branco Atlas — vista frontal" },
  { src: "/product-1-worn.png", alt: "Sneaker Branco Atlas — em uso" },
  { src: "/product-1.png", alt: "Sneaker Branco Atlas — detalhe lateral" },
  { src: "/product-1-worn.png", alt: "Sneaker Branco Atlas — contexto urbano" },
]

export function ProductGallery() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
        <img
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="grid grid-cols-4 gap-3" role="group" aria-label="Miniaturas do produto">
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={image.alt}
            aria-pressed={activeIndex === index}
            className={cn(
              "relative aspect-square overflow-hidden rounded-md bg-muted transition-all",
              activeIndex === index
                ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                : "opacity-70 hover:opacity-100",
            )}
          >
            <img src={image.src} alt="" className="h-full w-full object-cover" aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  )
}
