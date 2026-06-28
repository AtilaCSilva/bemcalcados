"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { CreditCard, QrCode } from "lucide-react"
import { SectionHeading } from "@/components/checkout/section-heading"
import { CheckoutField } from "@/components/checkout/checkout-field"

type PaymentMethod = "pix" | "card"

export function PaymentBlock() {
  const [method, setMethod] = useState<PaymentMethod>("pix")

  return (
    <section className="flex flex-col gap-6" aria-labelledby="payment-heading">
      <input type="hidden" name="paymentMethod" value={method} />
      <SectionHeading step={3} title="Pagamento" />

      <div className="flex gap-2" role="tablist" aria-label="Forma de pagamento">
        <button
          type="button"
          role="tab"
          aria-selected={method === "pix"}
          onClick={() => setMethod("pix")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-md border px-4 py-3 text-sm font-medium transition-colors",
            method === "pix"
              ? "border-foreground bg-foreground text-background"
              : "border-border bg-card text-foreground hover:border-foreground",
          )}
        >
          <QrCode className="h-4 w-4" strokeWidth={1.5} />
          Pix
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={method === "card"}
          onClick={() => setMethod("card")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-md border px-4 py-3 text-sm font-medium transition-colors",
            method === "card"
              ? "border-foreground bg-foreground text-background"
              : "border-border bg-card text-foreground hover:border-foreground",
          )}
        >
          <CreditCard className="h-4 w-4" strokeWidth={1.5} />
          Cartão de Crédito
        </button>
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
      )}
    </section>
  )
}
