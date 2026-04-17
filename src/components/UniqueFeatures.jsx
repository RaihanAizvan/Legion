import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Shield, Coins, Trophy } from 'lucide-react'
import { features } from '../lib/constants'

const ICON_MAP = { Zap, Shield, Coins, Trophy }

const GRADIENTS = [
    'from-blue-600/20 to-cyan-600/10 border-blue-500/30',
    'from-violet-600/20 to-purple-600/10 border-violet-500/30',
    'from-amber-600/20 to-yellow-600/10 border-amber-500/30',
    'from-pink-600/20 to-rose-600/10 border-pink-500/30',
]

const ICON_COLORS = ['text-cyan-400', 'text-violet-400', 'text-amber-400', 'text-pink-400']

export default function UniqueFeatures() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section ref={ref} className="relative py-24 bg-[#050508] overflow-hidden">
            <div className="absolute top-0 left-0 right-0 section-divider" />
            <div className="absolute inset-0 grid-pattern opacity-10" />

            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <span className="text-xs tracking-widest text-cyan-400 uppercase font-semibold">Why Legion?</span>
                    <h2 className="font-display font-bold text-4xl text-white mt-2">Unique Features</h2>
                    <p className="text-white/50 mt-3 max-w-xl mx-auto text-sm">
                        Built from the ground up with features you won't find anywhere else.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
                    {features.map((feature, i) => {
                        const Icon = ICON_MAP[feature.icon]
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                className={`relative glass-card border bg-gradient-to-br ${GRADIENTS[i]} p-6 overflow-hidden group cursor-default`}
                            >
                                {/* Glow blob */}
                                <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-20 ${ICON_COLORS[i].replace('text-', 'bg-')}`} />

                                <div className={`p-3 rounded-xl bg-white/5 inline-flex mb-5 ${ICON_COLORS[i]} group-hover:scale-110 transition-transform duration-200`}>
                                    <Icon size={24} />
                                </div>

                                <h3 className="font-display font-bold text-white text-lg mb-2">{feature.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>

                                {/* Bottom accent */}
                                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${GRADIENTS[i].split(' ')[0].replace('from-', 'from-')} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                    style={{ backgroundImage: `linear-gradient(to right, transparent, ${['#06b6d4', '#8b5cf6', '#f59e0b', '#ec4899'][i]}, transparent)` }}
                                />
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
