"use client"

import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/checkout/section-heading"
import { chipInteractive, motionBase } from "@/lib/interaction"

export type ShippingOption = {
  id: string
  carrier: string
  service: string
  price: number
  days: string
}

export const shippingOptions: ShippingOption[] = [
  { id: "correios-pac", carrier: "Correios", service: "PAC", price: 18.9, days: "8 a 12 dias úteis" },
  { id: "jadlog", carrier: "Jadlog", service: "Package", price: 22.5, days: "5 a 7 dias úteis" },
  { id: "correios-sedex", carrier: "Correios", service: "SEDEX", price: 32.9, days: "3 a 5 dias úteis" },
]

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

type ShippingBlockProps = {
  selectedId: string
  onSelect: (id: string) => void
}

export function ShippingBlock({ selectedId, onSelect }: ShippingBlockProps) {
  return (
    <section className="flex flex-col gap-6" aria-labelledby="shipping-heading">
      <SectionHeading step={2} title="Opções de Frete" />

      <fieldset className="flex flex-col gap-3">
        <legend className="sr-only">Selecione a transportadora</legend>
        {shippingOptions.map((option) => {
          const isSelected = selectedId === option.id
          return (
            <label
              key={option.id}
              className={cn(
                "flex cursor-pointer items-center gap-4 rounded-md border px-5 py-4",
                motionBase,
                isSelected
                  ? "border-foreground bg-card ring-1 ring-foreground"
                  : cn("border-border bg-card", chipInteractive),
              )}
            >
              <input
                type="radio"
                name="shipping"
                value={option.id}
                checked={isSelected}
                onChange={() => onSelect(option.id)}
                className="h-4 w-4 accent-foreground"
              />
              <div className="flex flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {option.carrier} — {option.service}
                  </p>
                  <p className="text-xs text-muted-foreground">{option.days}</p>
                </div>
                <span className="text-sm font-semibold text-foreground">{formatPrice(option.price)}</span>
              </div>
            </label>
          )
        })}
      </fieldset>
    </section>
  )
}
