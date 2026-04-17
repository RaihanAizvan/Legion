import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { carouselSlides } from '../lib/constants'

export default function Carousel() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-100px' })
    const [current, setCurrent] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const total = carouselSlides.length

    // Auto-advance
    useEffect(() => {
        if (isDragging) return
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % total)
        }, 3500)
        return () => clearInterval(timer)
    }, [isDragging, total])

    const prev = useCallback(() => setCurrent(p => (p - 1 + total) % total), [total])
    const next = useCallback(() => setCurrent(p => (p + 1) % total), [total])

    const getSlideStyle = (index) => {
        const diff = ((index - current + total) % total)
        const normalizedDiff = diff > total / 2 ? diff - total : diff

        const isCenter = normalizedDiff === 0
        const isLeft1 = normalizedDiff === -1
        const isRight1 = normalizedDiff === 1
        const isLeft2 = normalizedDiff === -2
        const isRight2 = normalizedDiff === 2

        if (isCenter)
            return { transform: 'translateX(0%) scale(1)', zIndex: 10, opacity: 1 }
        if (isLeft1)
            return { transform: 'translateX(-75%) scale(0.8)', zIndex: 5, opacity: 0.7 }
        if (isRight1)
            return { transform: 'translateX(75%) scale(0.8)', zIndex: 5, opacity: 0.7 }
        if (isLeft2)
            return { transform: 'translateX(-130%) scale(0.65)', zIndex: 2, opacity: 0.4 }
        if (isRight2)
            return { transform: 'translateX(130%) scale(0.65)', zIndex: 2, opacity: 0.4 }
        return { transform: 'translateX(200%) scale(0.5)', zIndex: 1, opacity: 0 }
    }

    return (
        <section ref={ref} className="relative py-24 overflow-hidden bg-[#050508]">
            <div className="absolute inset-0 grid-pattern opacity-10" />
            <div className="absolute top-0 left-0 right-0 section-divider" />

            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-xs tracking-widest text-violet-400 uppercase font-semibold">Latest Updates</span>
                    <h2 className="font-display font-bold text-4xl text-white mt-2">Featured Announcements</h2>
                </motion.div>

                {/* Carousel Container */}
                <div className="relative mx-auto w-full h-[280px] sm:h-[340px] max-w-[900px]">
                    {carouselSlides.map((slide, i) => {
                        const style = getSlideStyle(i)
                        return (
                            <div
                                key={i}
                                onClick={() => i !== current && setCurrent(i)}
                                className="absolute top-0 left-1/2 glass-card overflow-hidden cursor-pointer w-[260px] h-[220px] sm:w-[360px] sm:h-[280px] -translate-x-1/2"
                                style={{
                                    transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transformOrigin: 'center center',
                                    ...style,
                                }}
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${slide.image})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                                    <h3 className="font-display font-bold text-white text-base sm:text-lg leading-tight">{slide.title}</h3>
                                    <p className="text-white/60 text-xs sm:text-sm mt-1 line-clamp-2">{slide.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center space-x-4 mt-8">
                    <button
                        onClick={prev}
                        className="p-3 glass-card hover:bg-white/10 transition-all rounded-full text-white/70 hover:text-white"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {/* Dots */}
                    <div className="flex space-x-2">
                        {carouselSlides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${i === current
                                    ? 'bg-blue-500 w-6'
                                    : 'bg-white/20 w-1.5 hover:bg-white/40'
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={next}
                        className="p-3 glass-card hover:bg-white/10 transition-all rounded-full text-white/70 hover:text-white"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    )
}
