import { motion } from 'framer-motion'
import { Sparkles, Terminal, Cpu, Zap, Box, ShoppingCart, Users, Trophy, Globe, Map, Ghost, Hammer, Coins, MessageSquare, Anchor, MousePointer2 } from 'lucide-react'

const ALL_FEATURES = [
    "Resource Pack", "Tool Skins", "Sellwands", "Upgrades", "Prefixes", "Tutorial", "Quests", "Trades", "Votes", "Leaderboards", "Lucky Blocks", "Island Bank", "Merchant", "Minions", "Glowing", "Levels", "Jobs", "Kits", "Custom Items", "Custom Cave", "Global Fly", "Dungeons", "Enchants", "Missions", "Emotes", "Events", "Crates", "Animations", "Chest Shop", "Boost Pads", "Chat Game", "Cinematic", "AFK Area", "Auctions", "CoinFlip", "Clans", "Resource World", "Custom Generated"
]

// Split features into rows for marquee
const row1 = ALL_FEATURES.slice(0, 10)
const row2 = ALL_FEATURES.slice(10, 20)
const row3 = ALL_FEATURES.slice(20, 30)
const row4 = ALL_FEATURES.slice(30)

function FeaturePill({ text, color }) {
    return (
        <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-sm whitespace-nowrap hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-default group">
            <span className="text-cyan-500 font-bold group-hover:rotate-45 transition-transform">✦</span>
            <span className="text-sm font-black text-white/60 group-hover:text-white transition-colors uppercase tracking-widest">{text}</span>
        </div>
    )
}

function MarqueeRow({ items, direction = 1, speed = 40 }) {
    return (
        <div className="flex overflow-hidden relative py-2">
            <motion.div
                animate={{ x: direction > 0 ? [0, -1000] : [-1000, 0] }}
                transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
                className="flex gap-4 shrink-0"
            >
                {items.map((item, i) => <FeaturePill key={i} text={item} />)}
                {/* Duplicate for seamless loop */}
                {items.map((item, i) => <FeaturePill key={`copy-${i}`} text={item} />)}
                {items.map((item, i) => <FeaturePill key={`copy2-${i}`} text={item} />)}
            </motion.div>
        </div>
    )
}

export default function FeatureList() {
    return (
        <section className="relative py-32 bg-[#050508] overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-cyan-500/[0.02] blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 max-w-[1400px] relative z-10">

                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6"
                    >
                        Extensive Engine Capabilities
                    </motion.div>
                    <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                        CORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white italic">SKYBLOCK</span>
                    </h2>
                    <p className="text-white/20 text-xs md:text-sm font-bold uppercase tracking-[0.6em] whitespace-nowrap">
                        Packed with features • Built for legends
                    </p>
                </div>

                <div className="relative">
                    {/* Gradient Masks for fade-out edges */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050508] to-transparent z-20 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050508] to-transparent z-20 pointer-events-none" />

                    <div className="space-y-6">
                        <MarqueeRow items={row1} direction={1} speed={30} />
                        <MarqueeRow items={row2} direction={-1} speed={45} />
                        <MarqueeRow items={row3} direction={1} speed={35} />
                        <MarqueeRow items={row4} direction={-1} speed={40} />
                    </div>
                </div>

                {/* Tactical Stats Footer */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                    {/* Scanning Line Effect */}
                    <motion.div
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                        className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent pointer-events-none"
                    />

                    <div className="flex flex-col items-center text-center">
                        <Terminal className="text-cyan-500 mb-4" size={24} />
                        <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Architecture</div>
                        <div className="text-lg font-black text-white uppercase tracking-tight">Ultra Optimized</div>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Cpu className="text-purple-400 mb-4" size={24} />
                        <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Response Time</div>
                        <div className="text-lg font-black text-white uppercase tracking-tight">&lt; 15ms Latency</div>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Box className="text-amber-400 mb-4" size={24} />
                        <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Total Assets</div>
                        <div className="text-lg font-black text-white uppercase tracking-tight">100+ Custom Models</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
