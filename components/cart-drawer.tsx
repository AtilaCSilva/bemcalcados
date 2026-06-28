"use client"

import { ShoppingBag, X } from "lucide-react"
import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { useCart } from "../hooks/use-cart"
import { btnDark, btnIcon } from "@/lib/interaction"
import { cn } from "@/lib/utils"

export function CartDrawer() {
  const { items, removeItem } = useCart()
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className={cn("relative", btnIcon)} aria-label="Abrir carrinho">
          <ShoppingBag className="h-6 w-6" />
          {items.length > 0 && (
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] text-background">
              {items.length}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="flex h-full w-full flex-col bg-background sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Seu Carrinho</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-muted-foreground">Seu carrinho está vazio.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Tam: {item.size} | Qtd: {item.quantity}
                    </p>
                    <p className="mt-1 font-medium">R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    className={cn(btnIcon, "text-muted-foreground hover:text-destructive")}
                    aria-label="Remover item"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-auto border-t border-border pt-4">
          <div className="mb-4 flex justify-between text-lg font-medium">
            <span>Total</span>
            <span>R$ {total.toFixed(2).replace(".", ",")}</span>
          </div>
          <Link href="/checkout" className="block">
            <button
              disabled={items.length === 0}
              className={cn(btnDark, "w-full rounded-md py-4 font-medium uppercase tracking-[0.15em] disabled:opacity-50")}
            >
              Finalizar Compra
            </button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
