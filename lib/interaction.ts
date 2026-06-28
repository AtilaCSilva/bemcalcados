/** Classes de interação alinhadas ao Warm Minimalism da Bem Calçados */

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export const motionBase = "transition-all duration-300 ease-out"

export const liftHover =
  "hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.99] active:shadow-sm"

export const btnPrimary = `${motionBase} ${focusRing} ${liftHover} bg-primary text-primary-foreground hover:bg-foreground hover:text-background`

export const btnDark = `${motionBase} ${focusRing} ${liftHover} bg-foreground text-background hover:bg-primary hover:text-primary-foreground`

export const btnOutline = `${motionBase} ${focusRing} border border-foreground bg-transparent text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground`

export const btnIcon = `${motionBase} ${focusRing} rounded-md p-2 text-foreground hover:bg-muted/60 hover:text-primary active:scale-95`

export const btnIconSquare = `${motionBase} ${focusRing} flex items-center justify-center border border-border text-foreground hover:border-foreground hover:bg-muted/50 active:scale-95`

export const linkNav = "transition-colors duration-200 hover:text-primary"

export const linkSoft = "transition-all duration-200 hover:text-primary"

export const chipInteractive =
  "transition-all duration-200 hover:border-foreground hover:bg-muted/50 active:scale-95"

export const cardImage =
  "transition-all duration-300 ease-out hover:border-foreground/40 hover:shadow-md"

export const colorSwatchBtn = "transition-all duration-200 hover:scale-105 active:scale-95"
