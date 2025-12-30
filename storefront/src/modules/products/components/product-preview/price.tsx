import { Text, clx } from "@medusajs/ui"
import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  return (
    <>
      {price.price_type === "sale" && (
        <Text
          className="line-through text-text-muted text-sm"
          data-testid="original-price"
        >
          {price.original_price}
        </Text>
      )}
      <Text
        className={clx("text-text-muted font-body", {
          "text-brand-secondary font-heading text-lg font-bold text-shadow-sm": price.price_type === "sale" || true,
        })}
        data-testid="price"
      >
        {price.calculated_price}
      </Text>
    </>
  )
}
