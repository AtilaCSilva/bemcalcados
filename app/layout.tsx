import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from "next"
import { Playfair_Display, Inter, Geist } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

export const metadata: Metadata = {
  title: "Bem Calçados — Conforto e Estilo para o Seu Passo",
  description:
    "E-commerce de calçados Bem Calçados. Sneakers e casuais com ajuste perfeito, conforto premium e primeira troca grátis.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={cn("font-sans", geist.variable)}>
      <body suppressHydrationWarning={true}>
        {children}
        <Toaster /> {/* Adicione esta linha */}
      </body>
    </html>
  )
}
