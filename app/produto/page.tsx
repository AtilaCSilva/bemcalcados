import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ProductGallery } from "@/components/pdp/product-gallery"
import { PurchasePanel } from "@/components/pdp/purchase-panel"
import { GlanceableBenefits } from "@/components/pdp/glanceable-benefits"
import { ProductDetails } from "@/components/pdp/product-detaiils"

export const metadata: Metadata = {
  title: "Sneaker Branco Atlas — Bem Calçados",
  description:
    "Sneaker Branco Atlas com couro legítimo, entressola macia e solado antiderrapante. Conforto premium para o dia a dia.",
}

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <ProductGallery />
            <div className="flex flex-col gap-7">
              <PurchasePanel />
              <GlanceableBenefits />
            </div>
          </div>
        </section>
        <ProductDetails />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  )
}
