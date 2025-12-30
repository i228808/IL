import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { InteractiveCard } from "./interactive-card"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group block h-full">
      <InteractiveCard className="h-full">
        <div data-testid="product-wrapper" className="flex flex-col h-full">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
            <Thumbnail
              thumbnail={product.thumbnail}
              images={product.images}
              size="full"
              isFeatured={isFeatured}
              className="group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col mt-4 gap-2 flex-grow">
            <Text className="text-text-main font-heading text-xl font-medium tracking-wide" data-testid="product-title">
              {product.title}
            </Text>
            <div className="flex items-center gap-x-2 mt-auto">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
          </div>
        </div>
      </InteractiveCard>
    </LocalizedClientLink>
  )
}
