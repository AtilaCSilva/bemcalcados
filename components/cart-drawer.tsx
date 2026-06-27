"use client";

import { ShoppingBag, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useCart } from "../hooks/use-cart";
import Link from "next/link";

export function CartDrawer() {
  const { items, removeItem } = useCart();
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative p-2">
          <ShoppingBag className="h-6 w-6" />
          {items.length > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-black text-white text-[10px] flex items-center justify-center">
              {items.length}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background">
        <SheetHeader>
          <SheetTitle>Seu Carrinho</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground mt-10">Seu carrinho está vazio.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between items-center border-b pb-4">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Tam: {item.size} | Qtd: {item.quantity}</p>
                    {/* Linha corrigida para multiplicar pelo número de itens */}
                    <p className="font-medium mt-1">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                  </div>
                  <button onClick={() => removeItem(item.id, item.size)} className="p-2 text-muted-foreground hover:text-red-500">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t pt-4 mt-auto">
          <div className="flex justify-between font-medium text-lg mb-4">
            <span>Total</span>
            <span>R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
          <Link href="/checkout" className="block">
            <button 
              disabled={items.length === 0}
              className="w-full bg-foreground text-background py-4 rounded-md font-medium disabled:opacity-50"
            >
              FINALIZAR COMPRA
            </button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}