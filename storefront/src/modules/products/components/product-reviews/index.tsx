"use client"

import { StarSolid } from "@medusajs/icons"
import { Text, Heading } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"

const reviews = [
    {
        id: 1,
        author: "Sarah J.",
        rating: 5,
        title: "Life Changing Experience",
        content: "I didn't believe in herbal remedies until I tried Da'Zeagra. The texture is divine, and the results... well, let's just say my partner and I are happier than ever. It's truly a premium product.",
        date: "2 months ago"
    },
    {
        id: 2,
        author: "Michael T.",
        rating: 5,
        title: "Absolutely Premium Quality",
        content: "The packaging, the scent, the feel—everything screams luxury. It's not just an oil; it's an experience. Highly recommended for anyone looking to elevate their vitality.",
        date: "1 month ago"
    },
    {
        id: 3,
        author: "Emily & David",
        rating: 5,
        title: "Our Secret Ingredient",
        content: "We've tried many products, but nothing comes close to this. It feels natural, safe, and incredibly effective. Thank you for creating something so beautiful.",
        date: "3 weeks ago"
    },
    {
        id: 4,
        author: "Jessica R.",
        rating: 5,
        title: "Worth Every Penny",
        content: "I was hesitant because of the price (2500 PKR), but one bottle lasts a long time and the quality is unmatched. It has become an essential part of my self-care routine.",
        date: "1 week ago"
    }
]

const ReviewCard = ({ review }: { review: typeof reviews[0], index: number }) => {
    return (
        <div
            className="glass-card p-6 rounded-lg flex flex-col gap-4 hover:bg-brand-primary/20 transition-colors"
        >
            <div className="flex justify-between items-start">
                <div className="flex gap-1 text-brand-secondary">
                    {[...Array(review.rating)].map((_, i) => (
                        <StarSolid key={i} />
                    ))}
                </div>
                <Text className="text-text-muted text-xs">{review.date}</Text>
            </div>
            <div>
                <Text className="font-heading text-lg font-semibold text-text-main mb-2">{review.title}</Text>
                <Text className="text-text-muted text-sm leading-relaxed">{review.content}</Text>
            </div>
            <div className="mt-auto pt-4 border-t border-white/5">
                <Text className="text-text-main font-medium font-body tracking-wide">{review.author}</Text>
            </div>
        </div>
    )
}

export const ProductReviews = () => {
    return (
        <div className="w-full py-20 bg-bg-deep relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-secondary/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="content-container relative z-10">
                <div className="flex flex-col items-center text-center mb-16 gap-4">
                    <span
                        className="text-brand-secondary uppercase tracking-[0.2em] text-sm font-semibold"
                    >
                        Testimonials
                    </span>
                    <Heading level="h2" className="text-4xl medium:text-5xl font-heading text-text-main">
                        Wall of Love
                    </Heading>
                    <p className="max-w-xl text-text-muted text-lg">
                        Discover why couples worldwide trust Da'Zeagra Herbal Oil for their wellness.
                    </p>
                </div>

                <div className="grid grid-cols-1 medium:grid-cols-2 large:grid-cols-4 gap-6">
                    {reviews.map((review, index) => (
                        <ReviewCard key={review.id} review={review} index={index} />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="contrast-btn px-8 text-sm">Read All Reviews</button>
                </div>
            </div>
        </div>
    )
}

export default ProductReviews
