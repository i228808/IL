import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 small:py-12 min-h-[75vh]" data-testid="account-page">
      <div className="flex-1 content-container h-full max-w-5xl mx-auto glass-card rounded-lg flex flex-col overflow-hidden">
        <div className="grid grid-cols-1 small:grid-cols-[240px_1fr] py-12">
          <div className="border-r border-brand-secondary/10">{customer && <AccountNav customer={customer} />}</div>
          <div className="flex-1 px-8">{children}</div>
        </div>
        <div className="flex flex-col small:flex-row items-end justify-between small:border-t border-brand-secondary/10 py-12 gap-8 px-8 bg-brand-primary/5">
          <div>
            <h3 className="text-xl font-heading text-brand-secondary mb-4">Got questions?</h3>
            <span className="text-text-muted text-sm">
              You can find frequently asked questions and answers on our
              customer service page.
            </span>
          </div>
          <div>
            <UnderlineLink href="/customer-service">
              Customer Service
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
