import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Shield, Coins, Trophy } from 'lucide-react'
import { features } from '../lib/constants'
import FlyingPosters from './FlyingPosters'

const ICON_MAP = { Zap, Shield, Coins, Trophy }

const POSTERS = [
    'https://images.unsplash.com/photo-1627856013091-fed6e4e09ba9?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1605806616239-e4d0cdfb5ee6?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=800&auto=format&fit=crop'
]

const ICON_COLORS = ['text-cyan-400', 'text-violet-400', 'text-amber-400', 'text-pink-400']

export default function UniqueFeatures() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section ref={ref} className="relative bg-[#050508] overflow-hidden">
            <div className="absolute top-0 left-0 right-0 section-divider z-20" />

            <div className="flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto">

                {/* Left Side: Sticky Flying Posters */}
                <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen lg:sticky top-0 z-10 p-4 sm:p-12">
                    <div className="w-full h-full relative rounded-3xl overflow-hidden border border-white/5 bg-black/50 shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/80 via-transparent to-[#050508]/80 z-20 pointer-events-none" />
                        <FlyingPosters
                            items={POSTERS}
                            planeWidth={450}
                            planeHeight={550}
                            distortion={2.5}
                            cameraZ={22}
                            scrollEase={0.05}
                        />
                    </div>
                </div>

                {/* Right Side: Features Content */}
                <div className="w-full lg:w-1/2 px-6 sm:px-12 py-24 lg:py-48 z-10">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="mb-20"
                    >
                        <span className="text-xs tracking-widest text-cyan-400 uppercase font-semibold flex items-center gap-2">
                            <span className="w-8 h-px bg-cyan-400" />
                            Why Legion?
                        </span>
                        <h2 className="font-display font-bold text-5xl md:text-7xl text-white mt-4 uppercase tracking-tighter">
                            A New Era of <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Survival</span>
                        </h2>
                        <p className="text-white/60 mt-6 max-w-lg text-lg leading-relaxed">
                            We threw out the textbook and rebuilt the Minecraft survival experience from the ground up, giving you ultimate freedom alongside unprecedented community competition.
                        </p>
                    </motion.div>

                    <div className="flex flex-col gap-16">
                        {features.map((feature, i) => {
                            const Icon = ICON_MAP[feature.icon]
                            return (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6 }}
                                    className="relative pl-8 md:pl-12 group"
                                >
                                    {/* Timeline line */}
                                    <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 group-hover:bg-white/30 transition-colors duration-500" />

                                    {/* Glowing dot */}
                                    <div className={`absolute -left-[5px] top-4 w-3 h-3 rounded-full bg-black border-2 border-white/20 group-hover:border-cyan-400 transition-colors duration-300 shadow-[0_0_15px_rgba(34,211,238,0)] group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]`} />

                                    <div className="flex items-start gap-6">
                                        <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${ICON_COLORS[i]} shrink-0 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300 shadow-2xl`}>
                                            <Icon size={28} />
                                        </div>

                                        <div>
                                            <h3 className="font-display font-bold text-white text-2xl mb-3 tracking-tight group-hover:text-cyan-300 transition-colors duration-300">
                                                {feature.title}
                                            </h3>
                                            <p className="text-white/50 text-base leading-relaxed max-w-md">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </section >
    )
}
