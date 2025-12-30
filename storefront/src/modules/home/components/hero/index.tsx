"use client"

import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"
import { ArrowRight } from "@medusajs/icons"
import Link from "next/link"

const Hero = () => {
  return (
    <div className="h-[100vh] w-full relative overflow-hidden bg-bg-deep">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-secondary/10 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col-reverse medium:flex-row items-center justify-center content-container gap-10">

        {/* Text Section */}
        <div className="flex-1 flex flex-col items-center medium:items-start text-center medium:text-left gap-8 animate-fade-in-top">
          <div>
            <span className="text-brand-secondary tracking-[0.2em] uppercase font-bold text-sm mb-4 block">
              Discover Nature's secret
            </span>
            <Heading
              level="h1"
              className="text-5xl medium:text-7xl leading-tight font-heading font-medium text-text-main text-glow"
            >
              Da'Zeagra <span className="text-gold">Herbal Oil</span>
            </Heading>
            <p className="mt-6 text-lg medium:text-xl text-text-muted max-w-md font-light leading-relaxed">
              Natural Wellness & Vitality Support.
              Crafted for performance, endurance, and connection.
            </p>
          </div>

          <div className="flex gap-4">
            <Link href="/products/dazeagra-herbal-oil">
              <button className="contrast-btn flex items-center gap-2 group">
                Shop Now
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

        {/* Product Image Section - CSS Floating Animation Only */}
        <div className="flex-1 relative w-full h-[50vh] medium:h-[80vh] flex items-center justify-center">
          <div className="relative w-[300px] h-[400px] medium:w-[500px] medium:h-[700px] filter drop-shadow-2xl animate-float">
            <Image
              src="/products/dazeagra-1.png"
              alt="Da'Zeagra Herbal Oil"
              fill
              className="object-contain"
              priority
              draggable={false}
            />
            {/* Floating Particles/Glows */}
            <div className="absolute top-1/4 -left-10 w-20 h-20 bg-brand-secondary/30 rounded-full blur-xl animate-float delay-700" />
            <div className="absolute bottom-1/4 -right-10 w-32 h-32 bg-brand-primary/40 rounded-full blur-xl animate-float delay-1000" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted/50 animate-pulse">
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-text-muted/50 to-transparent"></div>
      </div>
    </div>
  )
}

export default Hero
