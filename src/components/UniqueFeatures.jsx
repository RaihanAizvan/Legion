import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Zap, Shield, Coins, Trophy } from 'lucide-react'
import { features } from '../lib/constants'

const ICON_MAP = { Zap, Shield, Coins, Trophy }
const ICON_COLORS = ['text-cyan-400', 'text-violet-400', 'text-amber-400', 'text-pink-400']
const GRADIENTS = [
    'from-blue-600/20 to-cyan-600/10 border-blue-500/30',
    'from-violet-600/20 to-purple-600/10 border-violet-500/30',
    'from-amber-600/20 to-yellow-600/10 border-amber-500/30',
    'from-pink-600/20 to-rose-600/10 border-pink-500/30',
]

function FeatureCard({ feature, i, progress }) {
    const Icon = ICON_MAP[feature.icon]

    // Map progress (0 to 1) across the total scroll height to center each of the 4 cards at different intervals.
    // 0 = first card peak, 1 = last card peak
    const scrollValue = useTransform(progress, [0, 1], [0, 3])

    const distance = useTransform(scrollValue, val => val - i)

    // Calculate 3D transformations simulating the FlyingPosters distortion curve
    const y = useTransform(distance, [-2, -1, 0, 1, 2], [-1000, -350, 0, 350, 1000])
    const rotateX = useTransform(distance, [-2, -1, 0, 1, 2], [-50, -25, 0, 25, 50])
    const scale = useTransform(distance, [-2, -1, 0, 1, 2], [0.5, 0.8, 1, 0.8, 0.5])
    const opacity = useTransform(distance, [-2, -1, 0, 1, 2], [0, 0.4, 1, 0.4, 0])
    const zIndex = useTransform(distance, [-2, -1, 0, 1, 2], [1, 5, 10, 5, 1])

    return (
        <motion.div
            style={{ y, rotateX, scale, opacity, zIndex }}
            className={`absolute flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 text-center w-[90%] max-w-4xl aspect-[4/3] sm:aspect-[21/9] rounded-[2rem] border border-white/10 bg-black/60 shadow-2xl backdrop-blur-xl group`}
        >
            <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${GRADIENTS[i]} opacity-50 pointer-events-none`} />

            {/* Glowing dot */}
            <div className={`absolute top-8 left-8 w-4 h-4 rounded-full bg-black border-2 border-white/20 group-hover:border-cyan-400 transition-colors duration-300 shadow-[0_0_15px_rgba(34,211,238,0)] group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]`} />

            <div className={`p-5 rounded-2xl bg-white/5 border border-white/10 ${ICON_COLORS[i]} mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300 shadow-2xl`}>
                <Icon size={36} />
            </div>

            <h3 className="font-display font-bold text-white text-3xl md:text-5xl mb-4 tracking-tight group-hover:text-cyan-300 transition-colors duration-300">
                {feature.title}
            </h3>

            <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                {feature.description}
            </p>
        </motion.div>
    )
}

export default function UniqueFeatures() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    return (
        <section ref={containerRef} className="relative bg-[#050508]" style={{ height: "450vh" }}>
            <div className="absolute top-0 left-0 right-0 section-divider z-20" />

            <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center" style={{ perspective: "1200px" }}>

                {/* Fixed Background Titles */}
                <div className="absolute top-12 md:top-24 left-0 w-full text-center z-0 opacity-40">
                    <span className="text-xs tracking-widest text-cyan-400 uppercase font-semibold flex items-center justify-center gap-2 mb-2">
                        <span className="w-8 h-px bg-cyan-400" />
                        Why Legion?
                        <span className="w-8 h-px bg-cyan-400" />
                    </span>
                    <h2 className="font-display font-bold text-4xl md:text-6xl text-white uppercase tracking-tighter mix-blend-overlay">
                        Ultimate Survival Freedom
                    </h2>
                </div>

                {/* 3D Stacked Feature Cards */}
                {features.map((feature, i) => (
                    <FeatureCard key={feature.title} feature={feature} i={i} progress={scrollYProgress} />
                ))}

            </div>
        </section>
    )
}
