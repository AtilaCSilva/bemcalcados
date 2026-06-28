export type ProductColorVariant = {
  id: string
  label: string
  swatch?: string
  colorHex?: string
  hex?: string
  color?: string
  image?: string
  image_url?: string
  hover_image_url?: string
}

export function getColorSwatch(variant: ProductColorVariant): string {
  return variant.colorHex ?? variant.swatch ?? variant.hex ?? variant.color ?? "#CCCCCC"
}

export type ProductBenefit = {
  label: string
  icon?: "wind" | "cloud" | "shield"
}

export type ProductDetail = {
  id: string
  name: string
  category: string
  price: number
  sizes: number[]
  colors: ProductColorVariant[]
  benefits?: ProductBenefit[]
  image_url?: string
  hover_image_url?: string
}

export type DbProductRow = {
  id: string
  name: string
  price: number
  sizes: number[]
  colors: ProductColorVariant[] | string
  category?: string
  benefits?: ProductBenefit[] | string
  image_url?: string
  hover_image_url?: string
}

const LEGACY_IMAGE_PATHS: Record<string, string> = {
  "/reed.png": "/products/reed/reed.png",
  "/reed-branco.png": "/products/reed/reed-branco.png",
  "/sapatilha-branca.png": "/products/sapatilhas/sapatilha-branca.png",
  "/sapatilha-fe-branca.png": "/products/sapatilhas/sapatilha-fe-branca.png",
  "/sapatilha-fe-preta-branca.png": "/products/sapatilhas/sapatilha-fe-preta-branca.png",
  "/sapatilha-fe-rosa-branca.png": "/products/sapatilhas/sapatilha-fe-rosa-branca.png",
  "/sapatilha-preta-cinza.png": "/products/sapatilhas/sapatilha-preta-cinza.png",
  "/sapatilha-rosa-branca.png": "/products/sapatilhas/sapatilha-rosa-branca.png",
  "/sapatilha-slick.png": "/products/sapatilhas/sapatilha-slick.png",
  "/snaker-branco-rosa.png": "/products/sneakers/snaker-branco-rosa.png",
  "/sneaker-moleca.png": "/products/sneakers/sneaker-moleca.png",
  "/sneaker-preto-branco.png": "/products/sneakers/sneaker-preto-branco.png",
  "/sneaker-preto.png": "/products/sneakers/sneaker-preto.png",
  "/sneaker-angle.png": "/products/sneakers/sneaker-angle.png",
  "/sneaker-detail.png": "/products/sneakers/sneaker-detail.png",
  "/sneaker-main.png": "/products/sneakers/sneaker-main.png",
  "/sneaker-worn.png": "/products/sneakers/sneaker-worn.png",
  "/product-1.png": "/products/sneakers/product-1.png",
  "/product-1-worn.png": "/products/sneakers/product-1-worn.png",
  "/product-2.png": "/products/sneakers/product-2.png",
  "/product-2-worn.png": "/products/sneakers/product-2-worn.png",
  "/product-3.png": "/products/sneakers/product-3.png",
  "/product-3-worn.png": "/products/sneakers/product-3-worn.png",
  "/product-4.png": "/products/sneakers/product-4.png",
  "/product-4-worn.png": "/products/sneakers/product-4-worn.png",
  "/tenis-m-adidas-preto-branco.png": "/products/tenis/tenis-m-adidas-preto-branco.png",
  "/tenis-m-adidas-preto.png": "/products/tenis/tenis-m-adidas-preto.png",
  "/tenis-m-nike-branco.png": "/products/tenis/tenis-m-nike-branco.png",
  "/tenis-m-nike-branco-preto.png": "/products/tenis/tenis-m-nike-branco-preto.png",
  "/pdp/sneaker-angle.png": "/products/sneakers/sneaker-angle.png",
  "/pdp/sneaker-detail.png": "/products/sneakers/sneaker-detail.png",
  "/pdp/sneaker-main.png": "/products/sneakers/sneaker-main.png",
  "/pdp/sneaker-worn.png": "/products/sneakers/sneaker-worn.png",
  "/products/tenis/reed.png": "/products/reed/reed.png",
  "/products/tenis/reed-branco.png": "/products/reed/reed-branco.png",
  "/products/tenis/sapatilha-branca.png": "/products/sapatilhas/sapatilha-branca.png",
  "/products/tenis/sapatilha-fe-branca.png": "/products/sapatilhas/sapatilha-fe-branca.png",
  "/products/tenis/sapatilha-fe-preta-branca.png": "/products/sapatilhas/sapatilha-fe-preta-branca.png",
  "/products/tenis/sapatilha-fe-rosa-branca.png": "/products/sapatilhas/sapatilha-fe-rosa-branca.png",
  "/products/tenis/sapatilha-preta-cinza.png": "/products/sapatilhas/sapatilha-preta-cinza.png",
  "/products/tenis/sapatilha-rosa-branca.png": "/products/sapatilhas/sapatilha-rosa-branca.png",
  "/products/tenis/sapatilha-slick.png": "/products/sapatilhas/sapatilha-slick.png",
  "/products/tenis/snaker-branco-rosa.png": "/products/sneakers/snaker-branco-rosa.png",
  "/products/tenis/sneaker-moleca.png": "/products/sneakers/sneaker-moleca.png",
  "/products/tenis/sneaker-preto-branco.png": "/products/sneakers/sneaker-preto-branco.png",
  "/products/tenis/sneaker-preto.png": "/products/sneakers/sneaker-preto.png",
  "/products/tenis/sneaker-angle.png": "/products/sneakers/sneaker-angle.png",
  "/products/tenis/sneaker-detail.png": "/products/sneakers/sneaker-detail.png",
  "/products/tenis/sneaker-main.png": "/products/sneakers/sneaker-main.png",
  "/products/tenis/sneaker-worn.png": "/products/sneakers/sneaker-worn.png",
  "/products/tenis/product-1.png": "/products/sneakers/product-1.png",
  "/products/tenis/product-1-worn.png": "/products/sneakers/product-1-worn.png",
  "/products/tenis/product-2.png": "/products/sneakers/product-2.png",
  "/products/tenis/product-2-worn.png": "/products/sneakers/product-2-worn.png",
  "/products/tenis/product-3.png": "/products/sneakers/product-3.png",
  "/products/tenis/product-3-worn.png": "/products/sneakers/product-3-worn.png",
  "/products/tenis/product-4.png": "/products/sneakers/product-4.png",
  "/products/tenis/product-4-worn.png": "/products/sneakers/product-4-worn.png",
}

export const PRODUCT_IMAGE_PATHS = {
  reed: [
    "/products/reed/reed.png",
    "/products/reed/reed-branco.png",
  ],
  sapatilhas: [
    "/products/sapatilhas/sapatilha-branca.png",
    "/products/sapatilhas/sapatilha-fe-branca.png",
    "/products/sapatilhas/sapatilha-fe-preta-branca.png",
    "/products/sapatilhas/sapatilha-fe-rosa-branca.png",
    "/products/sapatilhas/sapatilha-preta-cinza.png",
    "/products/sapatilhas/sapatilha-rosa-branca.png",
    "/products/sapatilhas/sapatilha-slick.png",
  ],
  sneakers: [
    "/products/sneakers/product-1.png",
    "/products/sneakers/product-1-worn.png",
    "/products/sneakers/product-2.png",
    "/products/sneakers/product-2-worn.png",
    "/products/sneakers/product-3.png",
    "/products/sneakers/product-3-worn.png",
    "/products/sneakers/product-4.png",
    "/products/sneakers/product-4-worn.png",
    "/products/sneakers/snaker-branco-rosa.png",
    "/products/sneakers/sneaker-angle.png",
    "/products/sneakers/sneaker-detail.png",
    "/products/sneakers/sneaker-main.png",
    "/products/sneakers/sneaker-moleca.png",
    "/products/sneakers/sneaker-preto-branco.png",
    "/products/sneakers/sneaker-preto.png",
    "/products/sneakers/sneaker-worn.png",
  ],
  tenis: [
    "/products/tenis/tenis-m-adidas-preto-branco.png",
    "/products/tenis/tenis-m-adidas-preto.png",
    "/products/tenis/tenis-m-nike-branco.png",
    "/products/tenis/tenis-m-nike-branco-preto.png",
  ],
} as const

export function resolveImageSrc(path?: string | null) {
  if (!path) return "/placeholder.svg"
  if (path.startsWith("http://") || path.startsWith("https://")) return path

  const normalized = path.startsWith("/") ? path : `/${path}`
  return LEGACY_IMAGE_PATHS[normalized] ?? normalized
}

export function formatProductPrice(price: number, withCents = true) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: withCents ? 2 : 0,
    maximumFractionDigits: withCents ? 2 : 0,
  })
}

function parseJsonField<T>(value: T | string | null | undefined, fallback: T): T {
  if (value == null) return fallback
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T
    } catch {
      return fallback
    }
  }
  return value
}

export function mapDbRowToProductDetail(row: DbProductRow): ProductDetail {
  const colors = parseJsonField<ProductColorVariant[]>(row.colors, [])

  if (colors.length === 0 && row.image_url) {
    colors.push({
      id: "default",
      label: "Padrão",
      swatch: "#EDEAE3",
      image_url: row.image_url,
      hover_image_url: row.hover_image_url,
    })
  }

  return {
    id: String(row.id),
    name: row.name,
    category: row.category ?? "Calçados",
    price: Number(row.price),
    sizes: (row.sizes ?? []).map(Number),
    colors,
    benefits: parseJsonField<ProductBenefit[] | undefined>(row.benefits, undefined),
    image_url: row.image_url,
    hover_image_url: row.hover_image_url,
  }
}
