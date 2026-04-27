import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Map, Gamepad2, Crosshair, Crown, TrendingUp, Moon } from 'lucide-react'

const NEW_FEATURES = [
    {
        id: 'skyblock',
        icon: Map,
        title: 'Core SkyBlock',
        description: 'Our main experience. Build your island, grind skills, unlock custom enchants, explore dungeons, complete missions, and rise through ranks in the ultimate sky survival world.',
        gradient: 'from-[#14b9ff]/20 to-[#38bdf8]/5 border-[#14b9ff]/30',
        color: 'text-[#14b9ff]',
        bgGlow: 'bg-[#14b9ff]/20',
        span: 'md:col-span-2 md:row-span-2 min-h-[300px] md:min-h-[400px]',
        size: 'large'
    },
    {
        id: 'arcade',
        icon: Gamepad2,
        title: 'Arcade Minigames',
        description: 'A hub of fast-paced fun. Jump between classic and custom mini-games with friends. Earn coins, climb leaderboards, and unlock exclusive arcade rewards.',
        gradient: 'from-violet-500/20 to-purple-500/5 border-violet-500/30',
        color: 'text-violet-400',
        bgGlow: 'bg-violet-500/20',
        span: 'col-span-1 row-span-1',
        size: 'medium'
    },
    {
        id: 'bedwars',
        icon: Crosshair,
        title: 'BedWars',
        description: "Protect your bed while destroying your enemies'. Team up, upgrade your base, and be the last island standing in our custom BedWars arena with ranked seasons.",
        gradient: 'from-rose-500/20 to-red-500/5 border-rose-500/30',
        color: 'text-rose-400',
        bgGlow: 'bg-rose-500/20',
        span: 'col-span-1 row-span-1',
        size: 'medium'
    },
    {
        id: 'ranks',
        icon: Crown,
        title: 'Ranks & Prestige',
        description: 'All ranks are earned by completing in-game requirements — not purchasable. Show off your true dedication through prestige.',
        gradient: 'from-amber-500/20 to-yellow-500/5 border-amber-500/30',
        color: 'text-amber-400',
        bgGlow: 'bg-amber-500/20',
        span: 'col-span-1 row-span-1',
        size: 'small'
    },
    {
        id: 'leveling',
        icon: TrendingUp,
        title: 'Leveling System',
        description: 'Gain XP by playing, completing quests, winning games, and participating in events. Each level unlocks new cosmetics and titles.',
        gradient: 'from-green-500/20 to-emerald-500/5 border-green-500/30',
        color: 'text-green-400',
        bgGlow: 'bg-green-500/20',
        span: 'col-span-1 row-span-1',
        size: 'small'
    },
    {
        id: 'afk',
        icon: Moon,
        title: 'AFK Zone',
        description: "Step away from the keyboard and still earn! Our AFK Zone rewards your time — get various items completely free while you're away.",
        gradient: 'from-indigo-500/20 to-blue-500/5 border-indigo-500/30',
        color: 'text-indigo-400',
        bgGlow: 'bg-indigo-500/20',
        span: 'col-span-1 row-span-1',
        size: 'small'
    }
]

export default function UniqueFeatures() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    }

    return (
        <section ref={ref} className="relative py-24 md:py-32 bg-[#050508] overflow-hidden">
            <div className="absolute top-0 left-0 right-0 section-divider z-20" />

            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-cyan-900/20 blur-[120px] rounded-full point-events-none mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-violet-900/20 blur-[120px] rounded-full point-events-none mix-blend-screen" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative z-10">

                {/* Headers */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16 md:mb-24"
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        The Legion Experience
                    </span>
                    <h2 className="font-display font-black text-5xl md:text-7xl text-white uppercase tracking-tighter mb-6">
                        More Than Just <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">A Server</span>
                    </h2>
                    <p className="text-white/50 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                        We abandoned the basic templates. Every feature in Legion is custom-built to deliver an unparalleled, highly competitive multiplayer experience.
                    </p>
                </motion.div>

                {/* Bento Box Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 auto-rows-fr"
                >
                    {NEW_FEATURES.map((feature) => {
                        const Icon = feature.icon;
                        const isLarge = feature.size === 'large';

                        return (
                            <motion.div
                                key={feature.id}
                                variants={itemVariants}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                className={`relative group overflow-hidden rounded-3xl border bg-black/40 backdrop-blur-md p-6 md:p-8 flex flex-col ${feature.span} ${feature.gradient}`}
                            >
                                {/* Inner Hover Lighting */}
                                <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none ${feature.bgGlow}`} />
                                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

                                <div className={`flex items-start gap-4 md:gap-6 ${isLarge ? 'flex-col' : 'flex-col sm:flex-row md:flex-col'} h-full relative z-10`}>

                                    {/* Icon Container */}
                                    <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${feature.color} shrink-0 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300 shadow-2xl`}>
                                        <Icon size={isLarge ? 48 : 32} strokeWidth={isLarge ? 1.5 : 2} />
                                    </div>

                                    {/* Text Content */}
                                    <div className={`flex flex-col ${isLarge ? 'mt-auto pt-8' : ''}`}>
                                        <h3 className={`font-display font-bold text-white tracking-tight mb-3 transition-colors duration-300 group-hover:${feature.color} ${isLarge ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl'}`}>
                                            {feature.title}
                                        </h3>
                                        <p className={`text-white/60 leading-relaxed ${isLarge ? 'text-lg md:text-xl max-w-2xl' : 'text-sm md:text-base'}`}>
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom Glowing Edge */}
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                                    <div className={`w-full h-full ${feature.bgGlow.replace('bg-', 'bg-')} blur-sm`} />
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>

            </div>
        </section>
    )
}
