import { Heading } from "@medusajs/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-0 flex flex-col-reverse small:flex-col gap-y-8 py-8 small:py-0 ">
      <div className="w-full bg-[#0F1510] border border-brand-secondary/30 flex flex-col p-6 rounded-2xl text-white shadow-[0_0_20px_rgba(212,175,55,0.05)] backdrop-blur-md">
        <Divider className="my-6 small:hidden border-white/10" />
        <Heading
          level="h2"
          className="flex flex-row text-3xl font-heading font-medium text-brand-secondary items-baseline"
        >
          Your Cart
        </Heading>
        <Divider className="my-6 border-white/10" />
        <CartTotals totals={cart} />
        <ItemsPreviewTemplate cart={cart} />
        {/* Discount code removed per user request */}
        {/* <div className="my-6">
          <DiscountCode cart={cart} />
        </div> */}
      </div>
    </div>
  )
}

export default CheckoutSummary
