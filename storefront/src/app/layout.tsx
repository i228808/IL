import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { League_Spartan } from "next/font/google"
import "styles/globals.css"
import WhatsAppFloat from "@modules/common/components/whatsapp-float"

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-spartan",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={leagueSpartan.variable}>
      <body>
        <main className="relative">{props.children}</main>
        <WhatsAppFloat />
      </body>
    </html>
  )
}
