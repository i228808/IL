import { Text, clx } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Logo from "@modules/layout/components/logo"

// SVG Icons for Social Media
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.196 0-5.192 1.583-5.192 4.615v3.385z" />
  </svg>
)

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.74-1.61.57-.98.56-2.13.56-3.23.01-4.32.01-8.64.01-12.96z" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="border-t border-white/10 w-full bg-bg-deep relative overflow-hidden">
      {/* Subtle decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-secondary/50 to-transparent" />

      <div className="content-container flex flex-col items-center justify-center py-16 gap-y-8">
        {/* Brand / Logo */}
        <LocalizedClientLink href="/" className="hover:opacity-80 transition-opacity">
          {/* Reusing the resized logo component, but maybe we want just text or the same logo? 
                User said "update the footer with the brand name etc...". 
                Using the Logo component ensures consistency. 
            */}
          <Logo className="h-16 w-auto p-0" />
        </LocalizedClientLink>

        {/* Social Links */}
        <div className="flex items-center gap-8">
          <a
            href="https://www.instagram.com/intimalustre/?utm_source=qr&igsh=YTFvcXphMG1rdDF1#"
            target="_blank"
            rel="noreferrer"
            className="text-text-muted hover:text-brand-secondary transition-colors duration-300 transform hover:scale-110"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-6 h-6" />
          </a>
          <a
            href="https://www.facebook.com/share/1DEJwFuUgh/"
            target="_blank"
            rel="noreferrer"
            className="text-text-muted hover:text-brand-secondary transition-colors duration-300 transform hover:scale-110"
            aria-label="Facebook"
          >
            <FacebookIcon className="w-6 h-6" />
          </a>
          <a
            href="https://www.tiktok.com/@intimalustre?_r=1&_t=ZS-92dRR6IbLwm"
            target="_blank"
            rel="noreferrer"
            className="text-text-muted hover:text-brand-secondary transition-colors duration-300 transform hover:scale-110"
            aria-label="TikTok"
          >
            <TikTokIcon className="w-6 h-6" />
          </a>
        </div>

        <p className="text-xs text-text-muted/50 tracking-widest uppercase mt-4">
          © {new Date().getFullYear()} Intima Lustre. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
