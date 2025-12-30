"use client"

import { Container } from "@medusajs/ui"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  // Auto-switch interval
  useEffect(() => {
    if (isHovering || images.length <= 1) return

    const interval = setInterval(() => {
      scrollNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [currentIndex, isHovering, images.length])

  const scrollNext = () => {
    if (scrollRef.current) {
      const nextIndex = (currentIndex + 1) % images.length
      scrollToIndex(nextIndex)
    }
  }

  const scrollPrev = () => {
    if (scrollRef.current) {
      const prevIndex = (currentIndex - 1 + images.length) % images.length
      scrollToIndex(prevIndex)
    }
  }

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const slideWidth = container.clientWidth

      container.scrollTo({
        left: index * slideWidth,
        behavior: "smooth"
      })
      setCurrentIndex(index)
    }
  }

  // Update index on manual scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const slideWidth = container.clientWidth
      const index = Math.round(container.scrollLeft / slideWidth)
      if (index !== currentIndex) {
        setCurrentIndex(index)
      }
    }
  }

  if (!images.length) return null

  return (
    <div
      className="relative group w-full max-w-[500px] aspect-[29/34] mx-auto rounded-lg overflow-hidden border border-white/5 bg-ui-bg-subtle"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            className="relative flex-shrink-0 snap-center w-full h-full"
            id={image.id}
          >
            {!!image.url && (
              <Image
                src={image.url}
                priority={index === 0}
                className="object-cover"
                alt={`Product image ${index + 1}`}
                fill
                sizes="(max-width: 576px) 100vw, (max-width: 992px) 500px, 500px"
              />
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.preventDefault(); scrollPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-bg-deep/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-white/10 hover:bg-brand-secondary hover:text-bg-deep"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); scrollNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-bg-deep/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-white/10 hover:bg-brand-secondary hover:text-bg-deep"
          >
            <ChevronRight />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-full bg-bg-deep/30 backdrop-blur-sm">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-brand-secondary w-4" : "bg-white/50 hover:bg-white"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ImageGallery
