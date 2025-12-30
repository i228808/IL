import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading, Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  return (
    <div className="flex flex-col gap-y-8 w-full">
      <div className="pb-3 flex items-center">
        <Heading className="text-[2rem] leading-[2.75rem] font-heading font-medium text-brand-secondary">Cart</Heading>
      </div>

      <div className="w-full flex flex-col">
        {/* Desktop Header - H IDDEN on mobile */}
        <div className="hidden small:grid grid-cols-[1fr_1fr_1fr_1fr_1fr] border-b border-white/10 pb-4 text-ui-fg-muted txt-medium-plus uppercase tracking-widest text-xs font-heading">
          <div className="col-span-2">Item</div>
          <div className="text-center">Quantity</div>
          <div className="text-right hidden small:block">Price</div>
          <div className="text-right">Total</div>
        </div>

        {/* Items List */}
        <div className="flex flex-col gap-y-6 pt-6 small:pt-0">
          {items
            ? items
              .sort((a, b) => {
                return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
              })
              .map((item) => {
                return (
                  <Item
                    key={item.id}
                    item={item}
                    currencyCode={cart?.currency_code}
                  />
                )
              })
            : repeat(5).map((i) => {
              return <SkeletonLineItem key={i} />
            })}
        </div>
      </div>
    </div>
  )
}

export default ItemsTemplate
