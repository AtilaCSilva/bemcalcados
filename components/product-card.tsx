"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { resolveImageSrc } from "@/lib/product-types"
import { btnDark, btnOutline, cardImage, chipInteractive } from "@/lib/interaction"

export type Product = {
  id: string
  name: string
  price: string
  image: string
  hoverImage: string
  sizes: number[]
}

export function ProductCard({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null)

  // Variável para evitar repetição de código
  const productUrl = selectedSize ? `/produto/${product.id}?size=${selectedSize}` : `/produto/${product.id}`
  const imageSrc = resolveImageSrc(product.image)
  const hoverImageSrc = resolveImageSrc(product.hoverImage)

  return (
    <div className="group flex h-full w-[280px] shrink-0 snap-start flex-col gap-4 sm:w-[320px]">
      <Link href={productUrl} className={cn("relative block aspect-square w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm", cardImage)}>
        <img
          src={imageSrc}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <img
          src={hoverImageSrc}
          alt={`${product.name} em uso real`}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3">
        <Link href={productUrl} className="flex items-baseline justify-between gap-3 transition-opacity duration-200 hover:opacity-80">
          <h3 className="font-serif text-lg font-semibold text-foreground">{product.name}</h3>
          <span className="text-base font-medium text-foreground">{product.price}</span>
        </Link>

        {/* Seletor rápido de tamanho */}
        <div
          className="flex min-h-[5.5rem] flex-wrap content-start gap-2"
          role="group"
          aria-label={`Tamanhos disponíveis para ${product.name}`}
        >
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              aria-pressed={selectedSize === size}
              className={cn(
                "flex h-9 w-9 items-center justify-center border text-sm",
                selectedSize === size
                  ? "border-foreground bg-foreground text-background"
                  : cn("border-border text-foreground", chipInteractive),
              )}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Ações */}
        <div className="mt-auto flex flex-col gap-2">
          {/* Botão principal de destaque */}
          <Link
            href={productUrl}
            className={cn(btnDark, "block w-full py-3.5 text-center text-xs font-semibold uppercase tracking-[0.2em]")}
          >
            Comprar
          </Link>

          <button className={cn(btnOutline, "w-full py-3 text-xs font-medium uppercase tracking-[0.18em]")}>
            Provador Virtual
          </button>
        </div>
      </div>
    </div>
  )
}