"use client"

import Image from "next/image"
import { useCart } from "@/hooks/use-cart"
import { shippingOptions, type ShippingOption } from "@/components/checkout/shipping-block"

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

type OrderSummaryProps = {
  selectedShippingId: string
}

export function OrderSummary({ selectedShippingId }: OrderSummaryProps) {
  const { items } = useCart()
  
  // Calculando o subtotal real baseado nos itens do Zustand
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  
  const shipping: ShippingOption =
    shippingOptions.find((option) => option.id === selectedShippingId) ?? shippingOptions[0]

  const total = subtotal + shipping.price

  return (
    <div className="rounded-md border border-border bg-card p-6">
      <h3 className="font-serif text-lg font-bold text-foreground">Resumo do Pedido</h3>

      <div className="mt-6 flex flex-col gap-4">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">Seu carrinho está vazio.</p>
        ) : (
          items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                {/* Imagem estática por enquanto, até adicionarmos o caminho da imagem no Zustand */}
                <Image
                  src="/product-1.png"
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="flex flex-col justify-center gap-1 w-full">
                <p className="text-sm font-medium text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">Tam: {item.size} • Qtd: {item.quantity}</p>
                <p className="text-sm font-semibold text-foreground mt-1">{formatPrice(item.price * item.quantity)}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <dl className="mt-6 flex flex-col gap-3 border-t border-border pt-6 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="font-medium text-foreground">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">
            Frete ({shipping.carrier} {shipping.service})
          </dt>
          <dd className="font-medium text-foreground">{formatPrice(shipping.price)}</dd>
        </div>
        <div className="flex justify-between border-t border-border pt-3">
          <dt className="font-serif text-base font-bold text-foreground">Total</dt>
          <dd className="font-serif text-base font-bold text-foreground">{formatPrice(total)}</dd>
        </div>
      </dl>
    </div>
  )
}