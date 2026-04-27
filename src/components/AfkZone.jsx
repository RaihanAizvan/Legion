import { motion } from 'framer-motion'
import { Moon, Coins, Package, Star, Gift, Clock, Zap, Shield, Sparkles } from 'lucide-react'

const AFK_REWARDS = [
    {
        title: 'Passive Coins',
        desc: 'Earn in-game currency just by staying in the AFK zone. Every minute counts.',
        icon: <Coins className="text-yellow-400" size={32} />,
        price: 'FREE',
        color: 'from-amber-400/20 to-yellow-600/5',
        accent: 'bg-yellow-400'
    },
    {
        title: 'Resource Drops',
        desc: 'Receive random resources — food, materials, and more — over time.',
        icon: <Package className="text-emerald-400" size={32} />,
        price: 'FREE',
        color: 'from-emerald-400/20 to-green-600/5',
        accent: 'bg-emerald-400'
    },
    {
        title: 'XP Trickle',
        desc: 'Gain slow but steady experience points to level up while AFK.',
        icon: <Star className="text-purple-400" size={32} />,
        price: 'FREE',
        color: 'from-purple-400/20 to-indigo-600/5',
        accent: 'bg-purple-400'
    },
    {
        title: 'Random Loot Boxes',
        desc: 'Chance to receive mystery loot boxes with rare and useful items inside.',
        icon: <Gift className="text-rose-400" size={32} />,
        price: 'FREE',
        color: 'from-rose-400/20 to-pink-600/5',
        accent: 'bg-rose-400'
    }
]

function RewardCard({ item, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            className="relative group"
        >
            <div className={`absolute -inset-px bg-gradient-to-br ${item.color} rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`} />

            <div className="relative h-full bg-transparent border border-white/5 rounded-[2rem] p-8 flex flex-col items-center text-center group-hover:border-white/10 transition-colors">
                <div className={`w-20 h-20 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative`}>
                    {item.icon}
                    <div className={`absolute -inset-2 rounded-2xl ${item.accent} opacity-0 group-hover:opacity-5 blur-xl transition-opacity`} />
                </div>

                <div className="mb-4">
                    <span className="px-3 py-1 rounded-full bg-white/5 text-[9px] font-black text-white/40 uppercase tracking-widest border border-white/5 inline-block mb-3 italic">Automatic Reward</span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{item.title}</h3>
                </div>

                <p className="text-sm font-medium text-white/40 leading-relaxed mb-8 flex-1">
                    {item.desc}
                </p>

                <div className="w-full pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">Tier: Core</div>
                    <div className={`text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-lg bg-white/5 text-white/80 group-hover:bg-white group-hover:text-black transition-all`}>
                        {item.price}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default function AfkZone() {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* Immersive Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.02),transparent)] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none opacity-50" />

            <div className="container mx-auto px-4 max-w-[1400px] relative z-10">

                <div className="flex flex-col items-center text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <Moon className="text-cyan-400 animate-pulse" size={18} />
                        <span className="text-xs font-black text-cyan-500 uppercase tracking-[0.4em]">Passive Operations</span>
                    </motion.div>

                    <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-8">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 italic">AFK ZONE</span>
                    </h2>

                    <div className="max-w-2xl bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-3xl relative group overflow-hidden">
                        {/* Interactive Clock Icon Anim */}
                        <Clock size={160} className="absolute -right-10 -bottom-10 text-white/[0.02] -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />

                        <p className="text-white/60 text-lg font-medium leading-relaxed relative z-10">
                            Step away from the keyboard and <span className="text-white font-bold">still earn!</span> Our AFK Zone rewards your time — get various items completely free while you're away.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-6 relative z-10">
                            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                                <Sparkles size={14} /> Go AFK
                            </div>
                            <div className="w-1.5 h-1.5 rounded-full bg-white/10 self-center" />
                            <div className="flex items-center gap-2 text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                                <Zap size={14} /> Earn Rewards
                            </div>
                            <div className="w-1.5 h-1.5 rounded-full bg-white/10 self-center" />
                            <div className="flex items-center gap-2 text-[10px] font-black text-purple-400 uppercase tracking-widest">
                                <Gift size={14} /> Claim & Enjoy
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {AFK_REWARDS.map((reward, i) => (
                        <RewardCard key={reward.title} item={reward} index={i} />
                    ))}
                </div>

                {/* Tactical Alert */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 flex items-center justify-center gap-4 py-4 px-8 rounded-full bg-emerald-500/5 border border-emerald-500/10 max-w-fit mx-auto"
                >
                    <Shield size={16} className="text-emerald-500" />
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">AFK Kick Prevention Enabled • 100% Anti-Cheat Policy</span>
                </motion.div>

            </div>
        </section>
    )
}
