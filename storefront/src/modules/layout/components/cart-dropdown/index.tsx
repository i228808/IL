"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
  Portal,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 2000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  const delayedClose = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    const timer = setTimeout(close, 200)
    setActiveTimer(timer)
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  // Check for client-side mounting to avoid hydration mismatch with Portal
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={delayedClose}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full">
          <LocalizedClientLink
            className="hover:text-ui-fg-base"
            href="/cart"
            data-testid="nav-cart-link"
          >{`Cart (${totalItems})`}</LocalizedClientLink>
        </PopoverButton>
        {mounted && (
          <Portal>
            <Transition show={cartDropdownOpen} as={Fragment}>
              {/* Backdrop */}
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div
                  className="fixed inset-0 bg-black/40 backdrop-blur-lg z-[90]"
                  aria-hidden="true"
                  onClick={close}
                  onMouseEnter={openAndCancel}
                />
              </Transition.Child>

              {/* Panel */}
              <Transition.Child
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel
                  static
                  anchor="bottom end"
                  className="flex flex-col bg-[#0F1510] border border-brand-secondary/30 w-[calc(100vw-2rem)] small:w-[420px] text-white shadow-2xl z-[100] rounded-2xl overflow-hidden backdrop-blur-md [--anchor-gap:20px] small:[--anchor-gap:10px]"
                  data-testid="nav-cart-dropdown"
                  onMouseEnter={openAndCancel}
                  onMouseLeave={delayedClose}
                >
                  <div className="p-4 flex items-center justify-center border-b border-white/10">
                    <h3 className="text-xl font-heading font-medium tracking-wide uppercase text-brand-secondary">Cart</h3>
                  </div>
                  {cartState && cartState.items?.length ? (
                    <>
                      <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar p-px py-4">
                        {cartState.items
                          .sort((a, b) => {
                            return (a.created_at ?? "") > (b.created_at ?? "")
                              ? -1
                              : 1
                          })
                          .map((item) => (
                            <div
                              className="grid grid-cols-[80px_1fr] small:grid-cols-[122px_1fr] gap-x-4"
                              key={item.id}
                              data-testid="cart-item"
                            >
                              <LocalizedClientLink
                                href={`/products/${item.product_handle}`}
                                className="w-20 small:w-24 bg-white/5 rounded-lg overflow-hidden"
                              >
                                <Thumbnail
                                  thumbnail={item.thumbnail}
                                  images={item.variant?.product?.images}
                                  size="square"
                                  handle={item.product_handle}
                                />
                              </LocalizedClientLink>
                              <div className="flex flex-col justify-between flex-1">
                                <div className="flex flex-col flex-1">
                                  <div className="flex items-start justify-between">
                                    <div className="flex flex-col overflow-ellipsis whitespace-nowrap mr-2 w-full max-w-[140px] small:max-w-[180px]">
                                      <h3 className="text-sm small:text-base-regular overflow-hidden text-ellipsis font-heading font-medium text-brand-secondary">
                                        <LocalizedClientLink
                                          href={`/products/${item.product_handle}`}
                                          data-testid="product-link"
                                        >
                                          {item.title}
                                        </LocalizedClientLink>
                                      </h3>
                                      <LineItemOptions
                                        variant={item.variant}
                                        data-testid="cart-item-variant"
                                        data-value={item.variant}
                                      />
                                      <span
                                        data-testid="cart-item-quantity"
                                        data-value={item.quantity}
                                        className="font-body text-xs text-ui-fg-muted"
                                      >
                                        Quantity: {item.quantity}
                                      </span>
                                    </div>
                                    <div className="flex justify-end font-body text-gold">
                                      <LineItemPrice
                                        item={item}
                                        style="tight"
                                        currencyCode={cartState.currency_code}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <DeleteButton
                                  id={item.id}
                                  className="mt-1 font-body text-xs uppercase tracking-wider text-ui-fg-subtle hover:text-white transition-colors"
                                  data-testid="cart-item-remove-button"
                                >
                                  Remove
                                </DeleteButton>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="p-4 flex flex-col gap-y-4 text-small-regular border-t border-white/10">
                        <div className="flex items-center justify-between font-heading font-medium text-lg">
                          <span className="text-white">
                            Subtotal{" "}
                            <span className="font-normal text-xs font-body text-ui-fg-muted">(excl. taxes)</span>
                          </span>
                          <span
                            className="text-large-semi text-brand-secondary"
                            data-testid="cart-subtotal"
                            data-value={subtotal}
                          >
                            {convertToLocale({
                              amount: subtotal,
                              currency_code: cartState.currency_code,
                            })}
                          </span>
                        </div>
                        <LocalizedClientLink href="/cart" passHref onClick={close}>
                          <Button
                            className="w-full h-12 bg-brand-secondary text-black hover:bg-brand-secondary/90 font-heading font-bold uppercase tracking-widest transition-all duration-300 rounded-none border border-brand-secondary"
                            size="large"
                            data-testid="go-to-cart-button"
                          >
                            Go to cart
                          </Button>
                        </LocalizedClientLink>
                      </div>
                    </>
                  ) : (
                    <div>
                      <div className="flex py-16 flex-col gap-y-6 items-center justify-center text-center">
                        <div className="bg-brand-secondary text-small-regular flex items-center justify-center w-8 h-8 rounded-full text-black font-heading font-bold">
                          <span>0</span>
                        </div>
                        <span className="font-body text-sm text-white tracking-wide">Your shopping bag is empty.</span>
                        <div>
                          <LocalizedClientLink href="/">
                            <>
                              <span className="sr-only">Go to all products page</span>
                              <Button
                                onClick={close}
                                className="h-10 bg-white text-black hover:bg-brand-secondary hover:text-black font-heading font-bold uppercase tracking-widest transition-all duration-300 rounded-none px-6"
                              >
                                Explore products
                              </Button>
                            </>
                          </LocalizedClientLink>
                        </div>
                      </div>
                    </div>
                  )}
                </PopoverPanel>
              </Transition.Child>
            </Transition>
          </Portal>
        )}
      </Popover>
    </div>
  )
}

export default CartDropdown
