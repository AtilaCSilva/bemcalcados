"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { Heart, RefreshCw, ShieldCheck, ChevronRight } from "lucide-react"
import { useCart } from "../../hooks/use-cart"
import { useFavorites } from "../../hooks/use-favorites"
import { useToast } from "@/hooks/use-toast"
import type { ProductDetail } from "@/lib/product-types"
import { formatProductPrice } from "@/lib/product-types"
import { btnIconSquare, btnOutline, btnPrimary, chipInteractive, colorSwatchBtn } from "@/lib/interaction"
import { VirtualFitting } from "@/components/pdp/virtual-fitting"

const SOLID_SWATCHES: Record<string, string> = {
  preto: "#000000",
  branco: "#FFFFFF",
  branca: "#FFFFFF",
  rosa: "#FFC0CB",
  cinza: "#808080",
  caramelo: "#C9A06A",
  grafite: "#2B2B2B",
}

const GRADIENT_SWATCHES: Record<string, string> = {
  "preto-branco": "linear-gradient(135deg, #000000 50%, #FFFFFF 50%)",
  "branco-preto": "linear-gradient(135deg, #FFFFFF 50%, #000000 50%)",
  "rosa-branca": "linear-gradient(135deg, #FFC0CB 50%, #FFFFFF 50%)",
  "preto-rosa": "linear-gradient(135deg, #000000 50%, #FFC0CB 50%)",
  "preta-cinza": "linear-gradient(135deg, #000000 50%, #808080 50%)",
  "preto-cinza": "linear-gradient(135deg, #000000 50%, #808080 50%)",
  "preto-branca": "linear-gradient(135deg, #000000 50%, #FFFFFF 50%)",
}

function getSwatchStyle(colorId: string): string {
  const id = colorId.toLowerCase()

  if (GRADIENT_SWATCHES[id]) return GRADIENT_SWATCHES[id]
  if (SOLID_SWATCHES[id]) return SOLID_SWATCHES[id]

  if (id.includes("-")) {
    const [first, second] = id.split("-")
    const colorA = SOLID_SWATCHES[first] ?? "#CCCCCC"
    const colorB = SOLID_SWATCHES[second] ?? "#CCCCCC"
    return `linear-gradient(135deg, ${colorA} 50%, ${colorB} 50%)`
  }

  return "#CCCCCC"
}

type PurchasePanelProps = {
  product: ProductDetail
  selectedColorId: string
  onColorChange: (colorId: string) => void
}

export function PurchasePanel({ product, selectedColorId, onColorChange }: PurchasePanelProps) {
  const searchParams = useSearchParams()
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const { addItem } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { toast } = useToast()

  const isFavorited = isFavorite(product.id)
  const selectedColor = product.colors.find((color) => color.id === selectedColorId) ?? product.colors[0]
  const installmentValue = product.price / 6

  useEffect(() => {
    const sizeParam = searchParams.get("size")
    if (sizeParam) {
      setSelectedSize(Number(sizeParam))
    }
  }, [searchParams])

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Por favor, selecione um tamanho antes de comprar.",
        duration: 2000,
        variant: "destructive",
      })
      return
    }

    const productName = selectedColor ? `${product.name} — ${selectedColor.label}` : product.name
    const image =
      selectedColor?.image ?? selectedColor?.image_url ?? product.image_url ?? "/placeholder.svg"

    addItem({
      id: `${product.id}-${selectedColorId}`,
      name: productName,
      price: product.price,
      size: selectedSize.toString(),
      quantity: 1,
      image,
    })

  
    toast({
      title: "Adicionado ao carrinho!",
      description: `${productName} (Tamanho ${selectedSize}).`,
      duration: 2000,
    })
  }

  const handleFavorite = () => {
    toggleFavorite(product.id)

    toast({
      title: isFavorited ? "Removido dos favoritos" : "Salvo nos favoritos",
      description: "Você pode ver sua lista no topo da tela.",
      duration: 2000,
    })
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">{product.category}</p>
        <h1 className="text-balance font-serif text-3xl font-bold leading-tight text-foreground lg:text-4xl">
          {product.name}
        </h1>
        <div className="flex flex-col gap-1">
          <span className="text-3xl font-semibold text-foreground">{formatProductPrice(product.price)}</span>
          <span className="text-sm text-muted-foreground">
            ou 6x de <span className="font-medium text-foreground">{formatProductPrice(installmentValue)}</span> sem
            juros
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-foreground">Cor:</span>
          <span className="text-muted-foreground">{selectedColor?.label}</span>
        </div>
        <div className="flex items-center gap-3" role="group" aria-label="Seleção de cor">
          {product.colors.map((color) => {
            const isSelected = selectedColorId === color.id

            return (
              <button
                key={color.id}
                type="button"
                onClick={() => onColorChange(color.id)}
                aria-label={color.label}
                aria-pressed={isSelected}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  colorSwatchBtn,
                  isSelected && "ring-2 ring-foreground ring-offset-2 ring-offset-background",
                )}
              >
                <span
                  className="h-8 w-8 rounded-full border border-gray-300"
                  style={{ background: getSwatchStyle(color.id) }}
                />
              </button>
            )
          })}
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">92% dos clientes</span> relatam que este modelo tem o tamanho
        exato. Compre o número que já costuma usar.
      </p>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Tamanho</span>
          <VirtualFitting availableSizes={product.sizes} onSizeSuggested={setSelectedSize}>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              Provador Virtual
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </VirtualFitting>
        </div>
        <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-8" role="group" aria-label="Seleção de tamanho">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              aria-pressed={selectedSize === size}
              className={cn(
                "flex h-12 items-center justify-center rounded-md border text-sm font-medium",
                selectedSize === size
                  ? "border-foreground bg-foreground text-background"
                  : cn("border-border text-foreground", chipInteractive),
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-x-8 gap-y-3">
        <div className="flex items-center gap-2 text-sm text-foreground">
          <RefreshCw className="h-4 w-4 text-primary" strokeWidth={1.75} />
          Primeira Troca Grátis
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" strokeWidth={1.75} />
          Satisfação Garantida por 7 dias
        </div>
      </div>

      <div className="flex items-stretch gap-3">
        <button
          onClick={handleAddToCart}
          className={cn(btnPrimary, "flex flex-1 items-center justify-center rounded-md py-4 text-sm font-semibold uppercase tracking-[0.2em]")}
        >
          Adicionar ao Carrinho
        </button>
        <button
          onClick={handleFavorite}
          aria-label="Adicionar aos favoritos"
          aria-pressed={isFavorited}
          className={cn(btnIconSquare, "h-auto w-14 rounded-md")}
        >
          <Heart className={cn("h-5 w-5", isFavorited && "fill-primary text-primary")} strokeWidth={1.5} />
        </button>
      </div>

      <VirtualFitting availableSizes={product.sizes} onSizeSuggested={setSelectedSize}>
        <button type="button" className={cn(btnOutline, "w-full py-3.5 text-xs font-medium uppercase tracking-[0.18em]")}>
          Provador Virtual
        </button>
      </VirtualFitting>
    </div>
  )
}
