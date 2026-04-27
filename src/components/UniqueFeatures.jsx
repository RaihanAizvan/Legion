import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MagicBento from './MagicBento'
import skyblockVideo from '../assets/videos/skyblock.mp4'

const NEW_FEATURES = [
    {
        label: 'Main Experience',
        title: 'Core SkyBlock',
        description: 'Our main experience. Build your island, grind skills, unlock custom enchants, explore dungeons, complete missions, and rise through ranks in the ultimate sky survival world.',
        color: 'rgba(14, 165, 233, 0.05)', // Cyan tint
        video: skyblockVideo,
    },
    {
        label: 'Minigames',
        title: 'Arcade Minigames',
        description: 'A hub of fast-paced fun. Jump between classic and custom mini-games with friends. Earn coins, climb leaderboards, and unlock exclusive arcade rewards.',
        color: 'rgba(139, 92, 246, 0.05)', // Violet tint
    },
    {
        label: 'Competitive',
        title: 'BedWars',
        description: "Protect your bed while destroying your enemies'. Team up, upgrade your base, and be the last island standing in our custom BedWars arena with ranked seasons.",
        color: 'rgba(244, 63, 94, 0.05)', // Rose tint
    },
    {
        label: 'Progression',
        title: 'Ranks & Prestige',
        description: 'All ranks are earned by completing in-game requirements — not purchasable. Show off your true dedication through prestige.',
        color: 'rgba(245, 158, 11, 0.05)', // Amber tint
    },
    {
        label: 'Rewards',
        title: 'Leveling System',
        description: 'Gain XP by playing, completing quests, winning games, and participating in events. Each level unlocks new cosmetics and titles.',
        color: 'rgba(16, 185, 129, 0.05)', // Emerald tint
    },
    {
        label: 'Exploration',
        title: 'Custom Worlds',
        description: 'Explore completely custom biomes and terrain generation. Find unique resources, discover hidden structures, and build natively in a world like no other.',
        color: 'rgba(236, 72, 153, 0.05)', // Pink tint
    },
    {
        label: 'Passive',
        title: 'AFK Zone',
        description: "Step away from the keyboard and still earn! Our AFK Zone rewards your time — get various items completely free while you're away.",
        color: 'rgba(99, 102, 241, 0.05)', // Indigo tint
    }
]

export default function UniqueFeatures() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })

    return (
        <section ref={ref} className="relative py-24 md:py-32 bg-[#050508] overflow-hidden">
            <div className="absolute top-0 left-0 right-0 section-divider z-20" />

            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[20%] w-[800px] h-[800px] bg-cyan-900/20 blur-[120px] rounded-full point-events-none mix-blend-screen" />

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

                {/* Magic Bento Integration */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="w-full relative lg:-mx-12 xl:-mx-24"
                >
                    <MagicBento
                        items={NEW_FEATURES}
                        textAutoHide={false}
                        enableStars={false}
                        enableSpotlight={true}
                        enableBorderGlow={true}
                        enableTilt={false}
                        enableMagnetism={true}
                        clickEffect={true}
                        spotlightRadius={350}
                        particleCount={15}
                        glowColor="34, 211, 238" // Cyan Glow
                    />
                </motion.div>

            </div>
        </section>
    )
}
