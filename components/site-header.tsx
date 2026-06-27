"use client"

import { Footprints, Heart } from "lucide-react"
import Link from "next/link"
import { CartDrawer } from "@/components/cart-drawer"
import { useFavorites } from "@/hooks/use-favorites"

export function SiteHeader() {
  const { favoriteIds } = useFavorites()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Bem Calçados - página inicial">
          <Footprints className="h-6 w-6 text-foreground" strokeWidth={1.5} />
          <span className="font-serif text-xl font-bold uppercase tracking-wide text-foreground">Bem Calçados</span>
        </Link>

        <nav className="hidden items-center gap-12 md:flex" aria-label="Navegação principal">
          <Link
            href="/#sneakers"
            className="text-sm font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary"
          >
            Sneakers
          </Link>
          <Link
            href="/#casuais"
            className="text-sm font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary"
          >
            Casuais
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Link para a página de favoritos com o contador */}
          <Link href="/favorites" className="relative p-2 text-foreground transition-colors hover:text-primary">
            <Heart className="h-5 w-5" strokeWidth={1.5} />
            {favoriteIds.length > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                {favoriteIds.length}
              </span>
            )}
          </Link>

          <CartDrawer />
        </div>
      </div>
    </header>
  )
}