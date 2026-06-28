import { Wind, Cloud, Shield, type LucideIcon } from "lucide-react"
import type { ProductBenefit } from "@/lib/product-types"

const iconMap: Record<NonNullable<ProductBenefit["icon"]>, LucideIcon> = {
  wind: Wind,
  cloud: Cloud,
  shield: Shield,
}

const defaultBenefits: ProductBenefit[] = [
  { icon: "wind", label: "Pés Frescos" },
  { icon: "cloud", label: "Passo Macio" },
  { icon: "shield", label: "Solado Firme" },
]

type GlanceableBenefitsProps = {
  benefits?: ProductBenefit[]
}

export function GlanceableBenefits({ benefits }: GlanceableBenefitsProps) {
  const items = benefits?.length ? benefits : defaultBenefits

  return (
    <div className="grid grid-cols-3 gap-4 border-y border-border py-6">
      {items.map(({ icon, label }) => {
        const Icon = icon ? iconMap[icon] : Wind

        return (
          <div key={label} className="flex flex-col items-center gap-2.5 text-center">
            <Icon className="h-7 w-7 text-foreground" strokeWidth={1.25} />
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-foreground sm:text-sm">{label}</span>
          </div>
        )
      })}
    </div>
  )
}
