import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

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
    <html lang="pt-BR">
      <body>
        {children}
        <Toaster /> {/* Adicione esta linha */}
      </body>
    </html>
  )
}
