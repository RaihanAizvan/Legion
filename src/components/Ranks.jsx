import { motion } from 'framer-motion'
import { Crown, Sparkles, Zap, Shield, Swords, Gem, Trophy, CheckCircle2, Lock, ArrowRight } from 'lucide-react'

const RANKS = [
    {
        name: 'Gold',
        id: 'gold',
        icon: <Trophy size={32} className="text-amber-400" />,
        badge: '🥇',
        subtitle: 'Starting Rank',
        tagLine: 'Default Rank',
        color: 'from-amber-400 to-yellow-600',
        perks: [
            'Welcome Message',
            'Extra Chat Colors',
            'Emotes in chat',
            'Special Kit',
            'Access to /heal, /feed, /ec, /wb',
            'Auction Limit 8'
        ]
    },
    {
        name: 'Diamond',
        id: 'diamond',
        icon: <Gem size={32} className="text-cyan-400" />,
        badge: '💎',
        subtitle: 'Complete Requirements',
        tagLine: 'Rankup Required',
        color: 'from-cyan-400 to-blue-600',
        perks: [
            'Welcome Message',
            'Extra Chat Colors',
            'Emotes in chat',
            'Special Kit',
            'Access to /repair, /heal, /feed',
            'Access to /ec, /wb',
            'Auction Limit 11'
        ]
    },
    {
        name: 'Emerald',
        id: 'emerald',
        icon: <Sparkles size={32} className="text-emerald-400" />,
        badge: '💚',
        subtitle: 'Complete Requirements',
        tagLine: 'Rankup Required',
        color: 'from-emerald-400 to-green-600',
        perks: [
            'Welcome Message',
            'Extra Chat Colors',
            'Emotes in chat',
            'Special Kit',
            'Flying on Island',
            'Access to /repair, /heal, /feed, /ec, /wb',
            'Auction Limit 13'
        ]
    },
    {
        name: 'Netherite',
        id: 'netherite',
        icon: <Crown size={32} className="text-purple-400" />,
        badge: '🏆',
        subtitle: 'Complete All Requirements',
        tagLine: 'Ultimate Rank',
        color: 'from-purple-500 to-indigo-700',
        perks: [
            'Welcome Message + Extra Chat Colors',
            'Emotes + Special Kit',
            'Flying on Island',
            'Access to /gamma, /repair',
            'Access to /heal, /feed, /ec, /wb',
            'Access to /smithtable, /carttable',
            'Auction Limit 15'
        ]
    }
]

function RankCard({ rank, index }) {
    const isUltimate = rank.id === 'netherite'

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            className="relative group"
        >
            {/* Glow Effect */}
            <div className={`absolute -inset-1 bg-gradient-to-br ${rank.color} rounded-[2.5rem] opacity-10 group-hover:opacity-20 blur-xl transition-all duration-500`} />

            <div className="relative h-full bg-[#0A0A0F] border border-white/5 rounded-[2.5rem] p-8 overflow-hidden flex flex-col">
                {/* Background Decor */}
                <div className={`absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br ${rank.color} opacity-[0.03] rounded-full blur-3xl group-hover:opacity-[0.08] transition-opacity`} />
                <div className="absolute top-8 right-8 text-4xl opacity-20 filter grayscale group-hover:grayscale-0 transition-all">{rank.badge}</div>

                <div className="mb-10 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                        {rank.icon}
                    </div>
                    <div className="text-[10px] font-black uppercase text-white/30 tracking-[0.4em] mb-1">{rank.subtitle}</div>
                    <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">{rank.name}</h3>
                    <div className={`inline-flex px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-gradient-to-r ${rank.color} text-black shadow-lg`}>
                        {rank.tagLine}
                    </div>
                </div>

                <div className="flex-1 space-y-4 mb-10 relative z-10">
                    {rank.perks.map((perk, i) => (
                        <div key={i} className="flex items-start gap-3 group/perk">
                            <CheckCircle2 size={16} className={`shrink-0 mt-0.5 opacity-40 group-hover/perk:opacity-100 transition-opacity ${rank.id === 'gold' ? 'text-amber-500' : rank.id === 'diamond' ? 'text-cyan-500' : rank.id === 'emerald' ? 'text-emerald-500' : 'text-purple-500'}`} />
                            <span className="text-sm font-medium text-white/50 group-hover/perk:text-white transition-colors leading-tight">
                                {perk}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="relative z-10 pt-6 border-t border-white/5">
                    <button className="w-full flex items-center justify-between group/btn text-xs font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                        <span>Check Requirements</span>
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default function Ranks() {
    return (
        <section className="relative py-32 bg-[#050508] overflow-hidden">
            {/* Immersive Accents */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute left-1/2 -top-1/4 -translate-x-1/2 w-full h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 max-w-[1400px] relative z-10">

                <div className="flex flex-col items-center text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-6"
                    >
                        <Shield size={12} className="animate-pulse" />
                        The Progression Path
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-8">
                        RANKS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-400 to-indigo-600">PRESTIGE</span>
                    </h2>
                    <div className="relative group max-w-2xl px-8 py-6 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl">
                        <div className="flex items-center justify-center gap-4 text-white font-black uppercase tracking-widest text-sm">
                            <Lock size={18} className="text-amber-500" />
                            <span>All ranks are <span className="text-cyan-400 italic">earned by gameplay</span> — never purchased</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {RANKS.map((rank, i) => (
                        <RankCard key={rank.id} rank={rank} index={i} />
                    ))}
                </div>

                {/* Footer Insight */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 flex flex-col md:flex-row items-center justify-center gap-12 p-8 rounded-[3rem] bg-white/[0.01] border border-white/5"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                            <Swords size={20} />
                        </div>
                        <div className="text-left">
                            <div className="text-[10px] font-black text-white/30 uppercase tracking-widest italic">Seasonal Bonus</div>
                            <div className="text-sm font-bold text-white tracking-tight leading-tight">First 10 players to hit Netherite <br /> receive the \"Unbroken\" prefix.</div>
                        </div>
                    </div>
                    <div className="h-10 w-px bg-white/10 hidden md:block" />
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                            <Crown size={20} />
                        </div>
                        <div className="text-left">
                            <div className="text-[10px] font-black text-white/30 uppercase tracking-widest italic">Prestige System</div>
                            <div className="text-sm font-bold text-white tracking-tight leading-tight">Netherite players can reset <br /> for a Permanent 1.2x Multiplier.</div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
