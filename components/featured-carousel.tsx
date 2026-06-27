"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard, type Product } from "@/components/product-card"

const products: Product[] = [
  {
    id: "1",
    name: "Sneaker Branco Atlas",
    price: "R$ 389",
    image: "/product-1.png",
    hoverImage: "/product-1-worn.png",
    sizes: [37, 38, 39, 40, 41, 42],
  },
  {
    id: "2",
    name: "Mocassim Caramelo Vale",
    price: "R$ 429",
    image: "/product-2.png",
    hoverImage: "/product-2-worn.png",
    sizes: [38, 39, 40, 41, 42, 43],
  },
  {
    id: "3",
    name: "Sneaker Preto Pulso",
    price: "R$ 459",
    image: "/product-3.png",
    hoverImage: "/product-3-worn.png",
    sizes: [38, 39, 40, 41, 42],
  },
  {
    id: "4",
    name: "Casual Camurça Duna",
    price: "R$ 399",
    image: "/product-4.png",
    hoverImage: "/product-4-worn.png",
    sizes: [37, 38, 39, 40, 41],
  },
]

export function FeaturedCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.8
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" })
  }

  return (
    <section id="vitrine" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 lg:px-10 lg:py-28" aria-label="Lançamentos">
      <div className="mb-12 flex items-end justify-between gap-6">
        <h2 className="text-balance font-serif text-3xl font-bold uppercase tracking-tight text-foreground lg:text-4xl">
          Conheça nossos destaques
        </h2>
        <div className="hidden gap-3 sm:flex">
          <button
            onClick={() => scroll("left")}
            aria-label="Anterior"
            className="flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors hover:border-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Próximo"
            className="flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors hover:border-foreground"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
