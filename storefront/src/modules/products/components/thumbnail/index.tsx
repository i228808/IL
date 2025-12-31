import { Container, clx } from "@medusajs/ui"
import Image from "next/image"
import React from "react"

import PlaceholderImage from "@modules/common/icons/placeholder-image"

type ThumbnailProps = {
  thumbnail?: string | null
  // TODO: Fix image typings
  images?: any[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  handle?: string
  "data-testid"?: string
}

const sanitizeImageUrl = (url?: string | null) => {
  if (!url || url === "") return null

  let sanitized = url

  // Handle localhost:8000 (storefront)
  if (sanitized.includes("localhost:8000")) {
    sanitized = sanitized.replace(/https?:\/\/localhost:8000/g, "")
  }

  // Handle localhost:9000 (backend)
  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "https://admin.intimalustre.com"
  if (sanitized.includes("localhost:9000")) {
    sanitized = sanitized.replace(/https?:\/\/localhost:9000/g, backendUrl)
  }

  // If it's a relative path starting with /static or /uploads, it's likely a backend asset
  if (sanitized.startsWith("/static") || sanitized.startsWith("/uploads")) {
    sanitized = `${backendUrl}${sanitized}`
  }

  return sanitized
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
  handle,
}) => {
  let initialImage = sanitizeImageUrl(thumbnail) || sanitizeImageUrl(images?.[0]?.url)

  // Force PNG for Da'Zeagra if image is missing or local path is preferred
  if (handle?.includes("dazeagra") && (!initialImage || initialImage === "")) {
    initialImage = "/products/dazeagra-1.png"
  }

  return (
    <Container
      className={clx(
        "relative w-full overflow-hidden p-4 bg-transparent shadow-none rounded-large group-hover:shadow-none transition-shadow ease-in-out duration-150",
        className,
        {
          "aspect-[11/14]": isFeatured,
          "aspect-[9/16]": !isFeatured && size !== "square",
          "aspect-[1/1]": size === "square",
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full",
        }
      )}
      data-testid={dataTestid}
    >
      <ImageOrPlaceholder image={initialImage} size={size} />
    </Container>
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
}: Pick<ThumbnailProps, "size"> & { image?: string | null }) => {
  return image ? (
    <Image
      src={image}
      alt="Thumbnail"
      className="absolute inset-0 object-cover object-center"
      draggable={false}
      quality={50}
      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
      fill
    />
  ) : (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center">
      <PlaceholderImage size={size === "small" ? 16 : 24} />
    </div>
  )
}

export default Thumbnail
