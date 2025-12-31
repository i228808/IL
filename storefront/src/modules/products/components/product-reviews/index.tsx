"use client"

import { StarSolid } from "@medusajs/icons"
import { Text, Heading } from "@medusajs/ui"
import { useState } from "react"
import { clx } from "@medusajs/ui"

const reviews = [
    {
        id: 1,
        author: "Fatima Ahmed",
        rating: 5,
        title: "Zindagi Badal Dene Wala Tajurba",
        content: "Mujhe herbal nuskhon par believe nahi tha jab tak maine Da'Zeagra use nahi kiya. Iska texture bohot acha hai aur results... bas ye kahungi ke main aur mere husband pehle se zyada khush hain. Waqai premium cheez hai.",
        date: "2 months ago"
    },
    {
        id: 2,
        author: "Faizan Malik",
        rating: 5,
        title: "Bilkul Premium Quality Hai",
        content: "Packaging, khushboo, feel—sab kuch luxury lagta hai. Ye sirf tel nahi, ek anokha tajurba hai. Jo log apni vitality barhana chahte hain unke liye behtareen hai.",
        date: "1 month ago"
    },
    {
        id: 3,
        author: "Sana & Bilal",
        rating: 5,
        title: "Humara Secret Ingredient",
        content: "Humne bohot products try kiye hain lekin is jaisa koi nahi. Ye natural aur safe lagta hai aur asar bhi kamaal ka hai. Itni achi cheez banane ka shukriya.",
        date: "3 weeks ago"
    },
    {
        id: 4,
        author: "Ayesha Khan",
        rating: 5,
        title: "Paison Ka Behtareen Istemal",
        content: "Price (2500 PKR) dekh kar thora socha tha, lekin ek bottle kaafi arsa chalti hai aur quality lajawab hai. Ab ye meri daily routine ka hissa ban gaya hai.",
        date: "1 week ago"
    },
    {
        id: 5,
        author: "Usman Tariq",
        rating: 5,
        title: "Bohot Zabardast Result",
        content: "Maine pehle bhi kuch oils use kiye thay magar iska asar fori mehsoos hota hai. Thakan door ho jati hai aur body mein nayi jaan aa jati hai.",
        date: "3 days ago"
    },
    {
        id: 6,
        author: "Zainab Bibi",
        rating: 5,
        title: "Kamaal Ki Cheez Hai",
        content: "Mere husband ne ye use karna shuru kiya aur unki energy levels mein wazeh farq aya hai. Hum dono is product se bohot mutma'in hain.",
        date: "5 days ago"
    },
    {
        id: 7,
        author: "Hamza Ali",
        rating: 4,
        title: "Acha Hai Magar Mehenga",
        content: "Quality mein koi shaq nahi, bohot ala hai. Price thori zyada hai magar results dekh kar lagta hai ke worth it hai.",
        date: "1 week ago"
    },
    {
        id: 8,
        author: "Nida & Kashif",
        rating: 5,
        title: "Behtareen Tohfa",
        content: "Maine ye apne husband ko gift kiya tha. Unhe bohot pasand aya. Iski khushboo bohot mild aur relaxing hai.",
        date: "2 weeks ago"
    },
    {
        id: 9,
        author: "Raza Hussain",
        rating: 5,
        title: "Asli Aur Khalis",
        content: "Bazaar mein milne waly naqli telon se behtar hai. Iska rang aur khushboo bata deti hai ke ye waqai asli jari bootiyon se bana hai.",
        date: "2 weeks ago"
    },
    {
        id: 10,
        author: "Hira Salman",
        rating: 5,
        title: "Relaxation Ke Liye Best",
        content: "Poore din ki thakan ke baad is se massage karne ka maza hi kuch aur hai. Neend bhi bohot achi aati hai.",
        date: "3 weeks ago"
    },
    {
        id: 11,
        author: "Omar Farooq",
        rating: 5,
        title: "Highly Recommended",
        content: "Agar aap apne liye kuch acha karna chahte hain to ye zaroor try karein. Main isay pichle 2 mahine se use kar raha hoon aur results consistent hain.",
        date: "1 month ago"
    },
    {
        id: 12,
        author: "Sadia Parveen",
        rating: 5,
        title: "Skin Ke Liye Bhi Acha",
        content: "Ye na sirf taqat deta hai balkay skin ko bhi soft rakhta hai. Koi irritation nahi hoti, bohot smooth hai.",
        date: "1 month ago"
    },
    {
        id: 13,
        author: "Adeel Shah",
        rating: 4,
        title: "Achi Packing",
        content: "Delivery waqt par hui aur packing bohot safe thi. Product bhi waisa hi hai jaisa describe kiya gaya tha.",
        date: "2 months ago"
    },
    {
        id: 14,
        author: "Mariam & Yusuf",
        rating: 5,
        title: "Shukriya Da'Zeagra",
        content: "Humari married life mein is ne nayi khushi bhar di hai. Ek bohot hi natural aur effective product hai.",
        date: "2 months ago"
    }
]

const ReviewCard = ({ review }: { review: typeof reviews[0], index: number }) => {
    return (
        <div
            className="glass-card p-6 rounded-lg flex flex-col gap-4 hover:bg-brand-primary/20 transition-colors animate-fade-in-top"
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
    const [showAll, setShowAll] = useState(false)

    const displayedReviews = showAll ? reviews : reviews.slice(0, 4)

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
                    {displayedReviews.map((review, index) => (
                        <ReviewCard key={review.id} review={review} index={index} />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="contrast-btn px-8 text-sm"
                    >
                        {showAll ? "Show Less" : "Read All Reviews"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductReviews
