"use client"

import { useState } from "react"
import { Lock } from "lucide-react"
import { IdentificationBlock } from "@/components/checkout/identification-block"
import { ShippingBlock, shippingOptions } from "@/components/checkout/shipping-block"
import { PaymentBlock } from "@/components/checkout/payment-block"
import { OrderSummary } from "@/components/checkout/order-summary"

export function CheckoutContent() {
  const [selectedShippingId, setSelectedShippingId] = useState(shippingOptions[0].id)

  return (
    <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-12">
      <div className="flex flex-col gap-12 lg:gap-14">
        <IdentificationBlock />
        <ShippingBlock selectedId={selectedShippingId} onSelect={setSelectedShippingId} />
        <PaymentBlock />
      </div>

      <aside className="flex flex-col gap-5 lg:sticky lg:top-28">
        <OrderSummary selectedShippingId={selectedShippingId} />

        <button
          type="button"
          className="w-full rounded-md bg-primary py-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          Finalizar Compra
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Lock className="h-3.5 w-3.5 text-primary" strokeWidth={1.75} />
          <span>Ambiente Seguro — seus dados estão protegidos</span>
        </div>
      </aside>
    </div>
  )
}
