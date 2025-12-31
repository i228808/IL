"use client"

import { Table, Text, clx } from "@medusajs/ui"
import { updateLineItem, deleteLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    <div className="w-full bg-transparent border-b border-white/5 pb-6 mb-6 last:border-0 last:mb-0" data-testid="product-row">
      <div className="grid grid-cols-[100px_1fr] small:grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-x-6 gap-y-4 items-start small:items-center">

        {/* Product Image & Title Area */}
        <div className="flex gap-x-4 items-start small:items-center col-span-2 small:col-span-2">
          {/* Thumbnail - Larger on mobile */}
          <LocalizedClientLink
            href={`/products/${item.product_handle}`}
            className={clx("shrink-0 rounded-xl overflow-hidden shadow-2xl border border-white/5", {
              "w-16": type === "preview",
              "w-[100px] small:w-32 aspect-square": type === "full",
            })}
          >
            <Thumbnail
              thumbnail={item.thumbnail}
              images={item.variant?.product?.images}
              size="square"
              className="bg-zinc-900" // Ensure dark bg placeholder
              handle={item.product_handle}
            />
          </LocalizedClientLink>

          {/* Title & Info - Visible on Desktop, merged on Mobile */}
          <div className="flex flex-col gap-y-1 self-center">
            <Text
              className="txt-medium-plus text-white font-heading font-medium text-lg leading-tight"
              data-testid="product-title"
            >
              {item.product_title}
            </Text>
            <LineItemOptions variant={item.variant} data-testid="product-variant" />

            {/* Mobile Only: Price & Qty Stack */}
            <div className="flex small:hidden flex-col gap-y-2 mt-2">
              <div className="text-brand-secondary font-heading text-lg">
                <LineItemUnitPrice item={item} style="tight" currencyCode={currencyCode} />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Quantity */}
        {type === "full" && (
          <div className="hidden small:flex flex-col items-center justify-center">
            <div className="flex items-center gap-x-1 w-28">
              <button
                className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded text-white transition-colors"
                onClick={() => changeQuantity(item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                &ndash;
              </button>
              <div className="w-10 text-center text-white text-sm font-medium">
                {updating ? <Spinner /> : item.quantity}
              </div>
              <button
                className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded text-white transition-colors"
                onClick={() => changeQuantity(item.quantity + 1)}
                disabled={item.quantity >= maxQuantity}
              >
                +
              </button>
            </div>
            <DeleteButton
              id={item.id}
              data-testid="product-delete-button"
              className="mt-2 gap-1 items-center text-ui-fg-muted hover:text-red-500 transition-colors text-xs uppercase tracking-wide font-medium"
            >
              Remove
            </DeleteButton>
          </div>
        )}

        {/* Desktop: Unit Price */}
        {type === "full" && (
          <div className="hidden small:flex justify-end text-white/80 font-body">
            <LineItemUnitPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </div>
        )}

        {/* Desktop: Total - OR Preview Price */}
        {(type === "full" || type === "preview") && (
          <div className={clx("hidden small:flex flex-col items-end justify-center", {
            "small:flex": type === "full",
            "flex col-start-2 row-start-2 place-self-end mt-2": type === "preview"
          })}>
            <span className="text-xl font-heading text-brand-secondary">
              <LineItemPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </span>
          </div>
        )}

        {/* Mobile ONLY: Bottom Row Controls (Qty + Remove + Total) */}
        <div className="col-span-2 small:hidden flex items-center justify-between mt-4 pt-6 border-t border-white/5 w-full">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-x-4">
              <button
                className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded text-white transition-colors border border-white/10"
                onClick={() => changeQuantity(item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                &ndash;
              </button>
              <div className="w-8 text-center text-white text-sm font-medium">
                {updating ? <Spinner /> : item.quantity}
              </div>
              <button
                className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded text-white transition-colors border border-white/10"
                onClick={() => changeQuantity(item.quantity + 1)}
                disabled={item.quantity >= maxQuantity}
              >
                +
              </button>
            </div>
            <DeleteButton id={item.id} />
          </div>

          <div className="text-lg font-heading text-brand-secondary">
            <LineItemPrice item={item} style="tight" currencyCode={currencyCode} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Item
