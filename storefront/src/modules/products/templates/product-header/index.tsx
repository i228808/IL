import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductHeaderProps = {
    product: HttpTypes.StoreProduct
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
    return (
        <div id="product-header" className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto animate-fade-in-top">
            {product.collection && (
                <LocalizedClientLink
                    href={`/collections/${product.collection.handle}`}
                    className="text-sm text-brand-secondary font-medium uppercase tracking-[0.2em] hover:text-text-main transition-colors font-body"
                >
                    {product.collection.title}
                </LocalizedClientLink>
            )}
            <Heading
                level="h1"
                className="text-5xl leading-[1.1] text-text-main font-heading font-normal tracking-tight mb-2"
                data-testid="product-title"
            >
                Da’ZEAGRA <br />
                <span className="text-3xl text-text-muted italic">Power Massage Oil</span>
            </Heading>

            <Text className="text-lg text-brand-secondary font-medium tracking-wide first-letter:float-left border-l-2 border-brand-secondary pl-4 py-1 mb-6">
                Premium Herbal Wellness for Strength, Vitality, and Confidence
            </Text>


        </div>
    )
}

export default ProductHeader
