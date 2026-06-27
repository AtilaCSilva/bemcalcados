import { cn } from "@/lib/utils"

export function CheckoutField({
  label,
  id,
  type = "text",
  placeholder,
  className,
  inputMode,
  autoComplete,
  onChange,
}: {
  label: string
  id: string
  type?: string
  placeholder?: string
  className?: string
  inputMode?: "text" | "email" | "tel" | "numeric"
  autoComplete?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={onChange}
        className="h-12 rounded-md border border-input bg-card px-4 text-sm text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
      />
    </div>
  )
}
