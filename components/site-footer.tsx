import { Footprints } from "lucide-react"
import Link from "next/link"
import { linkSoft } from "@/lib/interaction"
import { cn } from "@/lib/utils"

const links = [
  { label: "Sobre Nós", href: "#" },
  { label: "Trocas e Devoluções", href: "#" },
  { label: "Política de Privacidade", href: "#" },
  { label: "Termos de Uso", href: "#" },
  { label: "Contato", href: "#" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex flex-col items-center gap-8 text-center">
          <Link href="/" className="group flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-80" aria-label="Bem Calçados">
            <Footprints className="h-5 w-5 text-foreground" strokeWidth={1.5} />
            <span className="font-serif text-lg font-bold uppercase tracking-wide text-foreground">Bem Calçados</span>
          </Link>

          <nav aria-label="Links institucionais">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={cn("text-sm text-muted-foreground", linkSoft, "hover:text-foreground")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
            © {new Date().getFullYear()} Bem Calçados. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
