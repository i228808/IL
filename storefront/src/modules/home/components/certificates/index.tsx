import Image from "next/image"

const Certificates = () => {
    return (
        <div className="py-24 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-bg-deep" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.1)_0%,_transparent_40%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(26,60,40,0.2)_0%,_transparent_40%)]" />

            <div className="content-container relative z-10">
                <div className="flex flex-col items-center text-center mb-16 space-y-6">
                    <span className="text-xs font-heading uppercase tracking-[0.2em] text-brand-secondary animate-fade-in-top">
                        Integrity & Excellence
                    </span>
                    <h2 className="text-4xl md:text-5xl font-heading text-text-main">
                        Our Certifications
                    </h2>
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-brand-secondary to-transparent my-4" />
                    <p className="max-w-xl text-text-muted font-body font-light leading-relaxed text-lg">
                        We adhere to the highest standards of quality and sustainability.
                        Our certifications are verifiable proof of our commitment to you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
                    {[
                        { src: "/certificates/1767049555518.jpg", aspect: "aspect-[4/3]" },
                        { src: "/certificates/1767049937727.jpg", aspect: "aspect-square" },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className={`group relative w-full overflow-hidden transition-all duration-500 hover:-translate-y-2 ${item.aspect} md:aspect-auto md:h-[450px] border border-brand-secondary/20 rounded-xl shadow-2xl`}
                        >
                            <div className="relative w-full h-full flex items-center justify-center bg-black/40">
                                <Image
                                    src={item.src}
                                    alt={`Certificate ${index + 1}`}
                                    fill
                                    className="object-contain transition-all duration-700 ease-out group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Certificates
