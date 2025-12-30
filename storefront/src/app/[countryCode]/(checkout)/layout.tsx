import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Logo from "@modules/layout/components/logo"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-bg-deep relative small:min-h-screen">
      <div className="h-20 glass border-b border-brand-secondary/20">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-sm font-medium text-text-muted flex items-center gap-x-2 uppercase flex-1 basis-0 hover:text-brand-secondary transition-colors"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block text-xs tracking-widest font-bold">
              Back to shopping cart
            </span>
            <span className="mt-px block small:hidden text-xs tracking-widest font-bold">
              Back
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="flex items-center h-full group transition-opacity duration-200 hover:opacity-80"
            data-testid="store-link"
          >
            <Logo className="!w-24 small:!w-48 !h-full object-contain" />
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative pt-12" data-testid="checkout-container">{children}</div>
      <div className="py-8 w-full flex items-center justify-center opacity-50">
        <MedusaCTA />
      </div>
    </div>
  )
}
