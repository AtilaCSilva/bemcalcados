"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { QrCode } from "lucide-react"
// import { CreditCard } from "lucide-react"
import { SectionHeading } from "@/components/checkout/section-heading"
// import { CheckoutField } from "@/components/checkout/checkout-field"
import { motionBase } from "@/lib/interaction"

type PaymentMethod = "pix" | "card"

export function PaymentBlock() {
  const [method, setMethod] = useState<PaymentMethod>("pix")

  return (
    <section className="flex flex-col gap-6" aria-labelledby="payment-heading">
      <input type="hidden" name="paymentMethod" value={method} />
      <SectionHeading step={3} title="Pagamento" />

      <div role="tablist" aria-label="Forma de pagamento">
        <button
          type="button"
          role="tab"
          aria-selected={true}
          onClick={() => setMethod("pix")}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-md border border-foreground bg-foreground px-4 py-3 text-sm font-medium text-background",
            motionBase,
          )}
        >
          <QrCode className="h-4 w-4" strokeWidth={1.5} />
          Pix
        </button>
        {/* Cartão de Crédito — reativar com integração Stripe
        <button
          type="button"
          role="tab"
          aria-selected={method === "card"}
          onClick={() => setMethod("card")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-md border px-4 py-3 text-sm font-medium",
            motionBase,
            method === "card"
              ? "border-foreground bg-foreground text-background"
              : cn("border-border bg-card text-foreground", chipInteractive),
          )}
        >
          <CreditCard className="h-4 w-4" strokeWidth={1.5} />
          Cartão de Crédito
        </button>
        */}
      </div>

      {method === "pix" ? (
        <div className="rounded-md border border-border bg-card p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Ao finalizar, você receberá um QR Code Pix para pagamento instantâneo. O pedido é confirmado assim que
            identificarmos a transferência.
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-primary">Aprovação em segundos</p>
        </div>
      ) : (
        <>
          {/* Formulário de cartão — Stripe (futuro)
          <div className="flex flex-col gap-4">
            <CheckoutField
              label="Número do Cartão"
              id="card-number"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="0000 0000 0000 0000"
            />
            <CheckoutField label="Nome no Cartão" id="card-name" autoComplete="cc-name" placeholder="Como impresso no cartão" />
            <div className="grid grid-cols-2 gap-4">
              <CheckoutField label="Validade" id="card-expiry" autoComplete="cc-exp" placeholder="MM/AA" />
              <CheckoutField label="CVV" id="card-cvv" inputMode="numeric" autoComplete="cc-csc" placeholder="000" />
            </div>
            <p className="text-xs text-muted-foreground">Parcelamento disponível em até 6x sem juros.</p>
          </div>
          */}
        </>
      )}
    </section>
  )
}
