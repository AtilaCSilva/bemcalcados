const images = [
  { src: "/gallery-1.png", alt: "Sneakers brancos com calça jeans em estilo urbano" },
  { src: "/gallery-2.png", alt: "Pessoa sentada usando mocassins de couro caramelo" },
  { src: "/gallery-3.png", alt: "Sneakers pretos em escadaria urbana" },
  { src: "/gallery-4.png", alt: "Sapatos de camurça bege sobre folhas de outono" },
  { src: "/gallery-5.png", alt: "Look completo com sneakers brancos em flat lay" },
  { src: "/gallery-6.png", alt: "Pessoa caminhando em rua de pedra com sapatos casuais" },
]

export function InspirationGallery() {
  return (
    <section className="bg-muted/40 py-20 lg:py-28" aria-label="Galeria de inspiração">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="mb-12 text-center text-balance font-serif text-3xl font-bold uppercase tracking-tight text-foreground lg:text-4xl">
          Bem Calçados no seu look
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {images.map((image) => (
            <div key={image.src} className="group aspect-square overflow-hidden rounded-md border border-border">
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
