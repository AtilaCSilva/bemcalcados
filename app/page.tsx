import { SiteHeader } from "@/components/site-header"

import { HeroSection } from "@/components/hero-section"

import { TrustBadges } from "@/components/trust-badges"

import { FeaturedCarousel } from "@/components/featured-carousel"

import { InspirationGallery } from "@/components/inspiration-gallery"

import { SiteFooter } from "@/components/site-footer"

import { WhatsAppButton } from "@/components/whatsapp-button"



export default function HomePage() {

  return (

    <div className="min-h-screen bg-background">

      <SiteHeader />

      <main>

        <HeroSection />

        <TrustBadges />

        <FeaturedCarousel />

        <InspirationGallery />

      </main>

      <SiteFooter />

      <WhatsAppButton />

    </div>

  )

}

