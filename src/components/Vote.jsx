import { motion } from 'framer-motion'
import { Vote as VoteIcon, Coins, Zap, PartyPopper, Trophy, ExternalLink, Box, Sparkles } from 'lucide-react'

const VOTE_SITES = [
    {
        id: '01',
        name: 'MinecraftServers.org',
        desc: 'One of the largest Minecraft server listing communities. Vote once per day!',
        url: 'https://minecraftservers.org',
        color: 'text-blue-400',
        bg: 'bg-blue-500/10'
    },
    {
        id: '02',
        name: 'TopMinecraftServers.org',
        desc: 'Top-ranked server directory. Your vote counts toward our global ranking!',
        url: 'https://topminecraftservers.org',
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10'
    },
    {
        id: '03',
        name: 'Minecraft-Server-List.com',
        desc: 'Trusted listing with thousands of daily players. Boost our visibility!',
        url: 'https://minecraft-server-list.com',
        color: 'text-purple-400',
        bg: 'bg-purple-500/10'
    }
]

const REWARDS = [
    { name: 'Vote Coins', icon: <Coins size={20} />, value: 'Earn coins with every vote', color: 'text-blue-400' },
    { name: 'Vote Crate Key', icon: <Box size={20} />, value: 'Open exclusive vote crates', color: 'text-purple-400' },
    { name: 'XP Boost', icon: <Zap size={20} />, value: 'Bonus experience for a limited time', color: 'text-cyan-400' },
    { name: 'Vote Party', icon: <PartyPopper size={20} />, value: 'Server-wide items on milestones', color: 'text-blue-500' },
    { name: 'Vote Rank', icon: <Trophy size={20} />, value: 'Reach milestones for exclusive titles', color: 'text-indigo-400' },
]

export default function Vote() {
    return (
        <section id="vote" className="relative py-24 md:py-32 bg-[#050508] overflow-hidden">
            {/* Theme Elements */}
            <div className="absolute top-0 left-0 right-0 section-divider z-20" />
            <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 max-w-[1400px] relative z-10">

                {/* Headers - Optimized for theme but keeping layout */}
                <div className="max-w-3xl mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/50 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                        Community Power
                    </motion.div>

                    <h2 className="font-display font-black text-5xl md:text-7xl text-white uppercase tracking-tighter leading-[0.9] mb-8">
                        VOTE PARTY <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-600 italic font-black">& REWARDS</span>
                    </h2>

                    <p className="text-white/50 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                        Every vote helps Legion grow — and <span className="text-white font-bold underline decoration-blue-500/50 decoration-2 underline-offset-4">YOU get rewarded for it!</span> Help us hit our server milestone for massive item surges.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left: Milestone & Rewards (Restored Layout) */}
                    <div className="lg:col-span-12 xl:col-span-4 space-y-10">
                        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                            <Sparkles className="absolute -right-10 -bottom-10 text-white/[0.03] group-hover:rotate-12 transition-transform duration-1000" size={160} />
                            <div className="relative z-10">
                                <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-4">Live Milestone</div>
                                <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-8 italic">VOTE PARTY PROGRESS</h3>

                                <div className="relative h-4 bg-white/5 rounded-full overflow-hidden mb-6">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '84.2%' }}
                                        transition={{ duration: 1.5, ease: "circOut" }}
                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-violet-600 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                                    />
                                </div>

                                <div className="flex items-center justify-between text-[11px] font-black text-white/40 uppercase tracking-widest">
                                    <span>842 / 1000 Votes</span>
                                    <span className="text-blue-400 animate-pulse">Syncing...</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {REWARDS.map((reward, i) => (
                                <motion.div
                                    key={reward.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-colors group"
                                >
                                    <div className={`p-3 rounded-xl bg-white/5 ${reward.color} group-hover:scale-110 transition-transform`}>
                                        {reward.icon}
                                    </div>
                                    <div>
                                        <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-0.5">{reward.name}</div>
                                        <div className="text-xs font-black text-white/60 uppercase italic tracking-tight">{reward.value}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Vote Sites (Restored Layout) */}
                    <div className="lg:col-span-12 xl:col-span-8">
                        <div className="grid grid-cols-1 gap-6">
                            {VOTE_SITES.map((site, i) => (
                                <motion.div
                                    key={site.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group relative"
                                >
                                    <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative p-8 md:p-10 rounded-[2rem] bg-white/[0.01] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-white/[0.02] transition-all">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${site.color}`}>Vote Site {site.id}</span>
                                                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                                <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">Protocol Active</div>
                                            </div>
                                            <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-blue-400 transition-colors">{site.name}</h4>
                                            <p className="text-white/40 text-sm font-medium leading-relaxed max-w-xl">
                                                {site.desc}
                                            </p>
                                        </div>

                                        <a
                                            href={site.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="px-10 py-5 rounded-full bg-blue-600 text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all shrink-0"
                                        >
                                            Vote Now <ExternalLink size={14} />
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Bottom Surge */}
                <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-center gap-12 opacity-30 hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-4 text-[10px] font-black text-white uppercase tracking-[0.5em]">
                        <Zap size={14} className="text-blue-400" /> Multiplier: 2.5x Active
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-black text-white uppercase tracking-[0.5em]">
                        <Trophy size={14} className="text-violet-400" /> Milestone Reward: LEGACY CRATE
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-black text-white uppercase tracking-[0.5em]">
                        <Sparkles size={14} className="text-indigo-400" /> Community Tier: ELITE
                    </div>
                </div>

            </div>
        </section>
    )
}
