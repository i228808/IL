import { Suspense } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import Logo from "@modules/layout/components/logo"

export default async function Nav() {

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-20 mx-auto duration-200 glass transition-all ease-in-out">
        <nav className="content-container text-text-main flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            {/* SideMenu Removed */}
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="hover:opacity-80 transition-opacity duration-300 h-full flex items-center"
              data-testid="nav-store-link"
            >
              <Logo />
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-8 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-8 h-full font-body tracking-wider uppercase text-xs font-semibold">
              {/* Product and Account Links Removed */}
            </div>
            <div className="flex items-center gap-x-4">
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:text-brand-secondary flex gap-2 transition-colors font-heading uppercase tracking-widest text-sm"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    Cart (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
