import { HttpTypes } from "@medusajs/types"
import { Table, Text } from "@medusajs/ui"

import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import Thumbnail from "@modules/products/components/thumbnail"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  currencyCode: string
}

const Item = ({ item, currencyCode }: ItemProps) => {
  return (
    <div className="flex flex-col gap-y-4 border-b border-white/10 pb-4 last:border-0 last:pb-0" data-testid="product-row">
      <div className="flex gap-x-4">
        <div className="flex w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border border-white/10">
          <Thumbnail
            thumbnail={item.thumbnail}
            images={(item as any).variant?.product?.images}
            size="square"
            handle={(item as any).product_handle}
          />
        </div>

        <div className="flex flex-col justify-between flex-grow">
          <div className="flex flex-col">
            <Text
              className="txt-medium-plus text-white text-base-regular"
              data-testid="product-name"
            >
              {item.product_title}
            </Text>
            <LineItemOptions variant={item.variant} data-testid="product-variant" />
          </div>

          <div className="flex justify-between items-center w-full mt-2">
            <div className="flex gap-x-2 text-white/60 items-center">
              <Text className="txt-medium text-white/60">
                <span data-testid="product-quantity">{item.quantity}</span>x
              </Text>
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </div>
            <LineItemPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
