import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CheckoutContent } from "@/components/checkout/checkout-content"

export const metadata: Metadata = {
  title: "Checkout — Bem Calçados",
  description: "Finalize sua compra de forma rápida e segura. Guest checkout sem criação de senha.",
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">Guest Checkout</p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-foreground lg:text-4xl">Finalizar Compra</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Preencha seus dados uma única vez — sem criar senha. Entrega, frete e pagamento na mesma página.
          </p>
        </div>

        <CheckoutContent />
      </main>
      <SiteFooter />
    </div>
  )
}
