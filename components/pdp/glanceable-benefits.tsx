import { Wind, Cloud, Shield } from "lucide-react"

const benefits = [
  { icon: Wind, label: "Pés Frescos" },
  { icon: Cloud, label: "Passo Macio" },
  { icon: Shield, label: "Solado Firme" },
]

export function GlanceableBenefits() {
  return (
    <div className="grid grid-cols-3 gap-4 border-y border-border py-6">
      {benefits.map(({ icon: Icon, label }) => (
        <div key={label} className="flex flex-col items-center gap-2.5 text-center">
          <Icon className="h-7 w-7 text-foreground" strokeWidth={1.25} />
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-foreground sm:text-sm">{label}</span>
        </div>
      ))}
    </div>
  )
}
