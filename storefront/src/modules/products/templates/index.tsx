import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"

import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"
import ProductReviews from "../components/product-reviews"
import ProductHeader from "./product-header"
import ProductDetails from "./product-details"
import Certificates from "@modules/home/components/certificates"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div
        className="content-container flex flex-col small:flex-row small:items-start py-12 relative gap-x-12"
        data-testid="product-container"
      >
        <div className="block w-full relative flex-1">
          <ImageGallery images={images} />
        </div>

        <div className="flex flex-col small:sticky small:top-32 small:py-0 small:max-w-[400px] w-full py-8 gap-y-8">
          <ProductHeader product={product} />

          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>

          <ProductDetails />

          <ProductTabs product={product} />
          <ProductOnboardingCta />
        </div>
      </div>

      {/* Trust & Certifications */}
      <Certificates />

      {/* Wall of Love Section */}
      <ProductReviews />

      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
