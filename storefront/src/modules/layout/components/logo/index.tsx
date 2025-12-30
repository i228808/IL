import Image from "next/image"
import { clx } from "@medusajs/ui"

const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={clx("relative h-14 w-48 p-1", className)}>
            <Image
                src="/navlogo-main.png"
                alt="Da'Zeagra Logo"
                fill
                className="object-contain"
                priority
            />
        </div>
    )
}

export default Logo;
