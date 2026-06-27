export function ProductDetails() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-28" aria-label="Detalhes do produto">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-5">
          <h2 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">Sobre o calçado</h2>
          <p className="leading-relaxed text-muted-foreground">
            O Sneaker Branco Atlas nasce do equilíbrio entre forma e função. O cabedal em couro legítimo de toque macio
            é tratado para resistir ao uso diário, enquanto o forro respirável mantém os pés frescos do início ao fim do
            dia. Cada par é montado artesanalmente, com costuras reforçadas que garantem durabilidade sem abrir mão da
            leveza.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            A entressola em espuma de alta densidade absorve o impacto a cada passo, oferecendo uma pisada macia e
            estável. O solado de borracha antiderrapante proporciona aderência firme em superfícies secas e molhadas,
            tornando-o ideal para a rotina urbana.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-lg font-semibold text-foreground">Materiais</h3>
            <ul className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
              <li>Cabedal em couro legítimo</li>
              <li>Forro têxtil respirável</li>
              <li>Entressola em espuma de alta densidade</li>
              <li>Solado de borracha antiderrapante</li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-lg font-semibold text-foreground">Indicações de uso</h3>
            <ul className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
              <li>Uso diário e caminhadas urbanas</li>
              <li>Combina com looks casuais e despojados</li>
              <li>Limpe com pano úmido e seque à sombra</li>
              <li>Evite máquina de lavar e secadora</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
