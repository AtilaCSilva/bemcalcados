import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { TrustBadges } from "@/components/trust-badges"
import { FeaturedCarousel } from "@/components/featured-carousel"
import { InspirationGallery } from "@/components/inspiration-gallery"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import type { Product } from "@/components/product-card"
import { supabase } from "@/lib/supabase"

type DbProduct = {
  id: string
  name: string
  price: number
  image: string
  hover_image: string
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
    image: row.image,
    hoverImage: row.hover_image,
    sizes: row.sizes.map(Number),
  }
}

export default async function HomePage() {
  const { data } = await supabase.from("products").select("*")
  const products: Product[] = (data ?? []).map((row) => mapDbProductToProduct(row as DbProduct))

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection />
        <TrustBadges />
        <FeaturedCarousel products={products} />
        <InspirationGallery />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  )
}

