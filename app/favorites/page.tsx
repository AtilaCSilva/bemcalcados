"use client"

import { useEffect, useState } from "react"
import { useFavorites } from "@/hooks/use-favorites"
import { ProductCard, type Product } from "@/components/product-card"
import { supabase } from "@/lib/supabase"
import { HeartCrack, Trash2 } from "lucide-react"
import Link from "next/link"

type DbProduct = {
  id: string
  name: string
  price: number
  image_url: string
  hover_image_url: string
  sizes: number[]
}

function mapDbProductToProduct(row: DbProduct): Product {
  return {
    id: String(row.id),
    name: row.name,
    price: row.price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }),
    image: row.image_url,
    hoverImage: row.hover_image_url,
    sizes: row.sizes.map(Number),
  }
}

export default function FavoritesPage() {
  const { favoriteIds, toggleFavorite } = useFavorites()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchFavorites() {
      if (favoriteIds.length === 0) {
        setProducts([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)

      const { data } = await supabase.from("products").select("*").in("id", favoriteIds)

      setProducts((data ?? []).map((row) => mapDbProductToProduct(row as DbProduct)))
      setIsLoading(false)
    }

    fetchFavorites()
  }, [favoriteIds])

  return (
    <div className="min-h-screen bg-background py-16 px-6 lg:px-10 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="font-serif text-3xl font-bold uppercase tracking-tight text-foreground lg:text-4xl">
          Seus Favoritos
        </h1>
        <p className="mt-2 text-muted-foreground">
          {favoriteIds.length} {favoriteIds.length === 1 ? "item salvo" : "itens salvos"}
        </p>
      </div>

      {isLoading ? (
        <p className="text-center text-muted-foreground py-20">Carregando favoritos...</p>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <HeartCrack className="h-16 w-16 text-muted-foreground/30 mb-4" strokeWidth={1} />
          <h2 className="font-serif text-xl font-medium mb-2">Sua lista está vazia</h2>
          <p className="text-muted-foreground mb-8">
            Você ainda não salvou nenhum produto aos favoritos.
          </p>
          <Link
            href="/"
            className="rounded-md bg-foreground px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-background transition-colors hover:bg-primary"
          >
            Explorar Produtos
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6">
          {products.map((product) => (
            <div key={product.id} className="relative group/fav">
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-destructive hover:text-destructive-foreground"
                aria-label="Remover dos favoritos"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
