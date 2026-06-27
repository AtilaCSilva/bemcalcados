export function SectionHeading({ step, title }: { step: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">
        {step}
      </span>
      <h2 className="font-serif text-xl font-bold text-foreground">{title}</h2>
    </div>
  )
}
