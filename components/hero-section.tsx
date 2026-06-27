import Link from "next/link"

const banners = [
  {
    id: "casuais",
    image: "/hero-casual.png",
    title: "Conforto para o seu passo.",
    cta: "Comprar Casuais",
    href: "#vitrine",
    alt: "Par de mocassins de couro caramelo premium",
  },
  {
    id: "sneakers",
    image: "/hero-sneakers.png",
    title: "Estilo para o seu corre.",
    cta: "Comprar Sneakers",
    href: "#vitrine",
    alt: "Par de sneakers minimalistas em couro branco",
  },
]

export function HeroSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2" aria-label="Destaques de coleções">
      {banners.map((banner) => (
        <article key={banner.id} id={banner.id} className="group relative flex flex-col">
          <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-auto md:h-[640px]">
            <img
              src={banner.image || "/placeholder.svg"}
              alt={banner.alt}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col items-start gap-6 p-8 lg:p-12">
            <h2 className="max-w-sm text-balance font-serif text-3xl font-bold uppercase leading-tight tracking-tight text-foreground lg:text-4xl">
              {banner.title}
            </h2>
            <Link
              href={banner.href}
              className="inline-block bg-primary px-9 py-4 text-sm font-medium uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              {banner.cta}
            </Link>
          </div>
        </article>
      ))}
    </section>
  )
}
