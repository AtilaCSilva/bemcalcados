import type { ProductDetail } from "@/lib/product-types"

type ProductDetailsProps = {
  product: ProductDetail
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const materials = product.materials ?? []
  const careInstructions = product.care_instructions ?? []

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-28" aria-label="Detalhes do produto">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-5">
          <h2 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">Sobre o calçado</h2>
          {product.description ? (
            <p className="leading-relaxed text-muted-foreground">{product.description}</p>
          ) : (
            <p className="leading-relaxed text-muted-foreground">
              Descrição em breve. Entre em contato conosco para saber mais sobre este modelo.
            </p>
          )}
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-lg font-semibold text-foreground">Materiais</h3>
            {materials.length > 0 ? (
              <ul className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
                {materials.map((material) => (
                  <li key={material}>{material}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-relaxed text-muted-foreground">
                Informações de materiais não disponíveis para este produto.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-lg font-semibold text-foreground">Indicações de uso</h3>
            {careInstructions.length > 0 ? (
              <ul className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
                {careInstructions.map((instruction) => (
                  <li key={instruction}>{instruction}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-relaxed text-muted-foreground">
                Indicações de uso não disponíveis para este produto.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
