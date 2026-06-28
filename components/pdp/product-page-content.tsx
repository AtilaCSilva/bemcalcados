"use client"

import { useState } from "react"
import type { ProductDetail } from "@/lib/product-types"
import { ProductGallery } from "@/components/pdp/product-gallery"
import { PurchasePanel } from "@/components/pdp/purchase-panel"
import { GlanceableBenefits } from "@/components/pdp/glanceable-benefits"

type ProductPageContentProps = {
  product: ProductDetail
}

export function ProductPageContent({ product }: ProductPageContentProps) {
  const [selectedColorId, setSelectedColorId] = useState(product.colors[0]?.id ?? "")

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
      <ProductGallery
        productName={product.name}
        selectedColorId={selectedColorId}
        colors={product.colors}
        defaultImageUrl={product.image_url}
      />
      <div className="flex flex-col gap-7">
        <PurchasePanel
          product={product}
          selectedColorId={selectedColorId}
          onColorChange={setSelectedColorId}
        />
        <GlanceableBenefits benefits={product.benefits} />
      </div>
    </div>
  )
}
