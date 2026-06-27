import { Footprints, ShieldCheck, RefreshCw } from "lucide-react"

const badges = [
  {
    icon: Footprints,
    title: "Ajuste Perfeito",
    description: "Numeração precisa e provador virtual para acertar de primeira.",
  },
  {
    icon: ShieldCheck,
    title: "Conforto e Durabilidade Premium",
    description: "Materiais selecionados que duram e cuidam dos seus pés.",
  },
  {
    icon: RefreshCw,
    title: "Primeira Troca Grátis e Fácil",
    description: "Não serviu? A primeira troca é por nossa conta, sem burocracia.",
  },
]

export function TrustBadges() {
  return (
    <section className="border-y border-border bg-background" aria-label="Benefícios">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-3 lg:px-10 lg:py-20">
        {badges.map((badge) => (
          <div key={badge.title} className="flex flex-col items-center gap-4 text-center">
            <badge.icon className="h-8 w-8 text-foreground" strokeWidth={1.25} />
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">{badge.title}</h3>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{badge.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
