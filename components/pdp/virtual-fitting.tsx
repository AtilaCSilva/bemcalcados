"use client"

import { useState } from "react"
import { Footprints, Ruler } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { btnPrimary } from "@/lib/interaction"
import { getFootLengthRangeHint, getSuggestedShoeSize } from "@/lib/shoe-size"
import { cn } from "@/lib/utils"

type VirtualFittingProps = {
  children: React.ReactNode
  availableSizes?: number[]
  onSizeSuggested?: (size: number) => void
}

export function VirtualFitting({ children, availableSizes, onSizeSuggested }: VirtualFittingProps) {
  const [open, setOpen] = useState(false)
  const [footLength, setFootLength] = useState("")
  const [suggestedSize, setSuggestedSize] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const resetState = () => {
    setFootLength("")
    setSuggestedSize(null)
    setError(null)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) resetState()
  }

  const handleCalculate = () => {
    const value = Number.parseFloat(footLength.replace(",", "."))

    if (!footLength.trim() || Number.isNaN(value)) {
      setError("Digite a medida do seu pé em centímetros.")
      setSuggestedSize(null)
      return
    }

    const size = getSuggestedShoeSize(value)

    if (size === null) {
      setError(getFootLengthRangeHint())
      setSuggestedSize(null)
      return
    }

    setError(null)
    setSuggestedSize(size)
    onSizeSuggested?.(size)
  }

  const isAvailable =
    suggestedSize !== null &&
    (availableSizes === undefined || availableSizes.length === 0 || availableSizes.includes(suggestedSize))

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-md border-border sm:rounded-xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl font-bold text-foreground">
            Descubra seu tamanho ideal
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
            Medir o pé leva menos de um minuto e reduz a chance de troca.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <div className="flex gap-4 rounded-lg border border-border bg-muted/40 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Ruler className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <ol className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
              <li>1. Apoie o pé em uma folha de papel, encostado na parede.</li>
              <li>2. Marque a ponta do dedão mais longo.</li>
              <li>3. Meça com fita métrica ou régua, do calcanhar até a marca.</li>
            </ol>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="foot-length" className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Comprimento do pé (cm)
            </Label>
            <Input
              id="foot-length"
              type="number"
              inputMode="decimal"
              step="0.1"
              min={20}
              max={28}
              placeholder="Ex: 23.5"
              value={footLength}
              onChange={(e) => {
                setFootLength(e.target.value)
                setError(null)
                setSuggestedSize(null)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCalculate()
              }}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <Button
            type="button"
            onClick={handleCalculate}
            className={cn(btnPrimary, "h-12 w-full rounded-md text-sm font-semibold uppercase tracking-[0.15em]")}
          >
            Calcular meu tamanho
          </Button>

          {suggestedSize !== null && (
            <div
              className="flex flex-col items-center gap-3 rounded-lg border border-primary/30 bg-primary/10 px-6 py-8 text-center"
              role="status"
              aria-live="polite"
            >
              <Footprints className="h-8 w-8 text-primary" strokeWidth={1.5} />
              <p className="text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">
                Sugerimos o tamanho
              </p>
              <p className="font-serif text-5xl font-bold text-foreground">{suggestedSize}</p>
              {availableSizes && availableSizes.length > 0 && (
                <p className={cn("text-sm", isAvailable ? "text-muted-foreground" : "text-destructive")}>
                  {isAvailable
                    ? "Este tamanho está disponível para este modelo."
                    : "Este tamanho pode não estar disponível — confira as opções acima."}
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
