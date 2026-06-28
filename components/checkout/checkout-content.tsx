"use client"

import { useState } from "react"
import { Lock } from "lucide-react"
import { IdentificationBlock } from "@/components/checkout/identification-block"
import { ShippingBlock, shippingOptions } from "@/components/checkout/shipping-block"
import { PaymentBlock } from "@/components/checkout/payment-block"
import { OrderSummary } from "@/components/checkout/order-summary"
import { useCart } from "@/hooks/use-cart"
import { btnPrimary } from "@/lib/interaction"
import { cn } from "@/lib/utils"

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

export function CheckoutContent() {
  const [selectedShippingId, setSelectedShippingId] = useState(shippingOptions[0].id)
  const { items } = useCart()

  const handleCheckout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (items.length === 0) {
      alert("Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.")
      return
    }

    const formData = new FormData(e.currentTarget)
    const get = (key: string) => String(formData.get(key) ?? "")

    const shipping =
      shippingOptions.find((option) => option.id === get("shipping")) ??
      shippingOptions.find((option) => option.id === selectedShippingId) ??
      shippingOptions[0]

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const total = subtotal + shipping.price
    const paymentMethod = get("paymentMethod") === "card" ? "Cartão de Crédito" : "Pix"

    const complemento = get("complemento")
    const enderecoLinha = `${get("rua")}, ${get("numero")}${complemento ? ` — ${complemento}` : ""}`

    const itensFormatados = items
      .map(
        (item) =>
          `• ${item.quantity}x ${item.name} (Tam. ${item.size}) — ${formatPrice(item.price * item.quantity)}`,
      )
      .join("\n")

    const mensagem = [
      "🛍️ *NOVO PEDIDO — Bem Calçados*",
      "",
      "*Dados do Cliente*",
      `Nome: ${get("nome")}`,
      `E-mail: ${get("email")}`,
      `CPF: ${get("cpf")}`,
      `Telefone: ${get("telefone")}`,
      "",
      "*Endereço de Entrega*",
      `CEP: ${get("cep")}`,
      enderecoLinha,
      `${get("bairro")} — ${get("cidade")}/${get("uf")}`,
      "",
      "*Itens do Carrinho*",
      itensFormatados,
      "",
      "*Frete*",
      `${shipping.carrier} ${shipping.service} (${shipping.days}) — ${formatPrice(shipping.price)}`,
      "",
      "*Pagamento*",
      paymentMethod,
      "",
      "*Resumo*",
      `Subtotal: ${formatPrice(subtotal)}`,
      `Frete: ${formatPrice(shipping.price)}`,
      `*Total: ${formatPrice(total)}*`,
    ].join("\n")

    window.open(`https://wa.me/5531992697524?text=${encodeURIComponent(mensagem)}`, "_blank")
  }

  return (
    <form
      onSubmit={handleCheckout}
      className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-12"
    >
      <div className="flex flex-col gap-12 lg:gap-14">
        <IdentificationBlock />
        <ShippingBlock selectedId={selectedShippingId} onSelect={setSelectedShippingId} />
        <PaymentBlock />
      </div>

      <aside className="flex flex-col gap-5 lg:sticky lg:top-28">
        <OrderSummary selectedShippingId={selectedShippingId} />

        <button
          type="submit"
          className={cn(btnPrimary, "w-full rounded-md py-4 text-sm font-semibold uppercase tracking-[0.2em]")}
        >
          Finalizar Compra
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Lock className="h-3.5 w-3.5 text-primary" strokeWidth={1.75} />
          <span>Ambiente Seguro — seus dados estão protegidos</span>
        </div>
      </aside>
    </form>
  )
}
