import { Heading } from "@medusajs/ui"

const ProductDetails = () => {
    return (
        <div id="product-details" className="flex flex-col gap-y-12 animate-fade-in-top lg:max-w-[500px] mx-auto mt-8">

            <div className="flex flex-col gap-8 text-text-muted/90 font-light leading-relaxed">
                <p>
                    Experience the refined balance of tradition and modern self care with <strong className="text-brand-secondary font-medium">Da’ZEAGRA Power Massage Oil</strong> a thoughtfully crafted herbal formulation designed to support vitality, relaxation, and physical confidence as part of a healthy lifestyle.
                </p>

                <p>
                    Positioned within a curated men’s care range, Da’ZEAGRA is developed using time honored Ayurvedic principles and a synergistic blend of natural oils known for their nourishing and revitalizing properties.
                </p>
            </div>

            {/* Decorative Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-secondary/30 to-transparent" />

            {/* Ingredients Section */}
            <div className="flex flex-col gap-6">
                <Heading level="h3" className="text-2xl font-heading text-text-main italic border-b border-white/5 pb-2 w-fit pr-8">
                    Key Herbal Ingredients
                </Heading>
                <ul className="grid grid-cols-1 gap-4">
                    {[
                        { name: "Mustard Oil", desc: "Supports warmth and circulation" },
                        { name: "Almond Oil", desc: "Deeply nourishing, promotes skin comfort" },
                        { name: "Olive Oil", desc: "Enhances softness and hydration" },
                        { name: "Sesame Oil", desc: "Traditionally used in Ayurvedic massage" },
                        { name: "Kalaunji (Black Seed)", desc: "Known for strengthening properties" },
                        { name: "Ginseng Extract", desc: "Valued for promoting energy and vitality" },
                        { name: "Sura Sar", desc: "Traditional ingredient for classical formulations" },
                    ].map((item) => (
                        <li key={item.name} className="flex items-baseline gap-3 group">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/60 mt-2 flex-shrink-0 group-hover:bg-brand-secondary transition-colors" />
                            <p className="text-sm">
                                <span className="text-text-main font-medium">{item.name}</span>
                                <span className="text-text-muted mx-1">–</span>
                                <span className="text-text-muted italic">{item.desc}</span>
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Benefits Section */}
            <div className="p-6 rounded-lg bg-white/[0.02] border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-brand-secondary/20 transition-colors duration-500">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    {/* Abstract decorative icon/shape could go here */}
                </div>
                <Heading level="h3" className="text-xl font-heading text-text-main mb-4 tracking-wide uppercase text-sm">
                    Wellness Benefits
                </Heading>
                <ul className="space-y-3">
                    {[
                        "Promotes relaxation through gentle massage",
                        "Supports healthy blood flow and muscle comfort",
                        "Helps ease physical tension and fatigue",
                        "Encourages a renewed sense of strength and confidence",
                        "Ideal for men seeking a natural, herbal-based wellness routine"
                    ].map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="text-brand-secondary text-lg leading-none">✦</span>
                            <span className="text-text-muted/90 text-sm leading-relaxed">{benefit}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col gap-4">
                <Heading level="h3" className="text-lg font-heading text-text-main">
                    How to Use
                </Heading>
                <p className="text-sm text-text-muted leading-relaxed border-l-2 border-brand-secondary/30 pl-4">
                    Apply a small amount to the desired area and massage gently until absorbed. Best used as part of a regular self-care or relaxation routine.
                </p>
            </div>
        </div>
    )
}

export default ProductDetails
