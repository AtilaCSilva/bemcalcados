"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { Heart, RefreshCw, ShieldCheck, ChevronRight } from "lucide-react"
import { useCart } from "../../hooks/use-cart"
import { useFavorites } from "../../hooks/use-favorites"
import { useToast } from "@/hooks/use-toast" // Importando o hook de toast

const colors = [

{ id: "branco", label: "Branco Atlas", swatch: "#EDEAE3" },

{ id: "caramelo", label: "Caramelo Vale", swatch: "#C9A06A" },

{ id: "grafite", label: "Grafite Pulso", swatch: "#2B2B2B" },

]

const sizes = [36, 37, 38, 39, 40, 41, 42, 43]

export function PurchasePanel() {
  const searchParams = useSearchParams()
  const [selectedColor, setSelectedColor] = useState(colors[0].id)
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const { addItem } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { toast } = useToast() // Inicializando o toast

// Definimos um ID fixo provisório e verificamos se ele é favorito

  const productId = "sneaker-atlas-1"

  const isFavorited = isFavorite(productId)

  useEffect(() => {

  const sizeParam = searchParams.get("size")

  if (sizeParam) {
    setSelectedSize(Number(sizeParam))
    }
  }, [searchParams])


  const handleAddToCart = () => {

    if (!selectedSize) {

    alert("Por favor, selecione um tamanho antes de comprar.")
      return
    }

    const colorLabel = colors.find((c) => c.id === selectedColor)?.label || "Branco Atlas"
    const productName = `Sneaker ${colorLabel}`

    addItem({
      id: `p1-${selectedColor}`,
      name: `Sneaker ${colorLabel}`,
      price: 389.00,
      size: selectedSize.toString(),
      quantity: 1,
    })

    toast({
      title: "Adicionado ao carrinho!",
      description: `${productName} (Tamanho ${selectedSize}).`,
    })

  }

  const handleFavorite = () => {
    toggleFavorite(productId)

    // Disparando o Toast de favoritos
    toast({
      title: isFavorited ? "Removido dos favoritos" : "Salvo nos favoritos",
      description: "Você pode ver sua lista no topo da tela.",
    })
  }



  return (

  <div className="flex flex-col gap-7">
  {/* Título e preço */}
  <div className="flex flex-col gap-3">
    <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">Sneakers</p>
    <h1 className="text-balance font-serif text-3xl font-bold leading-tight text-foreground lg:text-4xl">
  Sneaker Branco Atlas

    </h1>
    <div className="flex flex-col gap-1">
  <span className="text-3xl font-semibold text-foreground">R$ 389,00</span>
  <span className="text-sm text-muted-foreground">
  ou 6x de <span className="font-medium text-foreground">R$ 64,83</span> sem juros
  </span>
  </div>
  </div>



  {/* Seletor de cores */}

  <div className="flex flex-col gap-3">

  <div className="flex items-center gap-2 text-sm">

  <span className="font-medium text-foreground">Cor:</span>

  <span className="text-muted-foreground">{colors.find((c) => c.id === selectedColor)?.label}</span>

  </div>

  <div className="flex items-center gap-3" role="group" aria-label="Seleção de cor">

  {colors.map((color) => (

  <button

  key={color.id}

  onClick={() => setSelectedColor(color.id)}

  aria-label={color.label}

  aria-pressed={selectedColor === color.id}

  className={cn(

  "flex h-10 w-10 items-center justify-center rounded-full transition-all",

  selectedColor === color.id

  ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"

  : "ring-1 ring-border hover:ring-foreground/50",

  )}

  >

  <span className="h-7 w-7 rounded-full" style={{ backgroundColor: color.swatch }} />

  </button>

  ))}

  </div>

  </div>



  {/* Microcopy de validação */}

  <p className="text-sm leading-relaxed text-muted-foreground">

  <span className="font-medium text-foreground">92% dos clientes</span> relatam que este modelo tem o tamanho

  exato. Compre o número que já costuma usar.

  </p>



  {/* Seletor de tamanhos */}

  <div className="flex flex-col gap-3">

  <div className="flex items-center justify-between">

  <span className="text-sm font-medium text-foreground">Tamanho</span>

  <button className="inline-flex items-center gap-1 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline">

  Tabela de Medidas

  <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />

  </button>

  </div>

  <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-8" role="group" aria-label="Seleção de tamanho">

  {sizes.map((size) => (

  <button

      key={size}
      onClick={() => setSelectedSize(size)}
      aria-pressed={selectedSize === size}
      className={cn(
      "flex h-12 items-center justify-center rounded-md border text-sm font-medium transition-colors",
      selectedSize === size
      ? "border-foreground bg-foreground text-background"
      : "border-border text-foreground hover:border-foreground",

      )}

  >

    {size}

    </button>

    ))}
  </div>
  </div>

  {/* Selos de confiança */}

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

  {/* Botões de ação */}

  <div className="flex items-stretch gap-3">

  <button

    onClick={handleAddToCart}

    className="flex flex-1 items-center justify-center rounded-md bg-primary py-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-foreground hover:text-background"

  >

  Adicionar ao Carrinho

  </button>

  <button
    onClick={handleFavorite}  
    aria-label="Adicionar aos favoritos"
    aria-pressed={isFavorited}  
    className="flex h-auto w-14 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-foreground"
  >

      <Heart className={cn("h-5 w-5", isFavorited && "fill-primary text-primary")} strokeWidth={1.5} />
      </button>
    </div>
  </div>

  )
}