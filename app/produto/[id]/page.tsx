import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ProductPageContent } from "@/components/pdp/product-page-content"
import { ProductDetails } from "@/components/pdp/product-detaiils"
import { supabase } from "@/lib/supabase"
import { mapDbRowToProductDetail, type DbProductRow } from "@/lib/product-types"

type ProductPageProps = {
  params: Promise<{ id: string }>
}

async function getProduct(id: string) {
  const { data } = await supabase.from("products").select("*").eq("id", id).maybeSingle()
  if (!data) return null
  return mapDbRowToProductDetail(data as DbProductRow)
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    return {
      title: "Produto não encontrado — Bem Calçados",
    }
  }

  return {
    title: `${product.name} — Bem Calçados`,
    description: product.description ?? `${product.name} com conforto premium e primeira troca grátis.`,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
          <ProductPageContent product={product} />
        </section>
        <ProductDetails product={product} />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  )
}
