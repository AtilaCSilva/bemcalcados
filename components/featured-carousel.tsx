"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard, type Product } from "@/components/product-card"
import { btnIconSquare } from "@/lib/interaction"
import { cn } from "@/lib/utils"

type FeaturedCarouselProps = {
  products: Product[]
}

export function FeaturedCarousel({ products }: FeaturedCarouselProps) {
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
            className={cn(btnIconSquare, "h-11 w-11 rounded-md")}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Próximo"
            className={cn(btnIconSquare, "h-11 w-11 rounded-md")}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
