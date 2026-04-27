import { motion } from 'framer-motion'
import { Zap, Target, Award, Star, TrendingUp, Sparkles, Gamepad2, Compass } from 'lucide-react'

const LEVELS = [
    { level: 1, name: 'Newcomer', color: 'from-slate-400 to-slate-600', icon: <Compass size={20} />, description: 'The journey begins' },
    { level: 10, name: 'Apprentice', color: 'from-blue-400 to-blue-600', icon: <Gamepad2 size={20} />, description: 'Learning the ropes' },
    { level: 25, name: 'Veteran', color: 'from-teal-400 to-teal-600', icon: <Target size={20} />, description: 'Mastered the basics' },
    { level: 50, name: 'Elite', color: 'from-amber-400 to-orange-600', icon: <Award size={20} />, description: 'Proving your dominance' },
    { level: 100, name: 'Legend', color: 'from-rose-500 to-purple-600', icon: <Star size={20} />, description: 'The absolute pinnacle' }
]

export default function Leveling() {
    return (
        <section className="relative py-32 bg-[#050508] overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 max-w-[1200px] relative z-10">

                <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6"
                        >
                            <TrendingUp size={12} />
                            Progress System
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-8">
                            LEVELING <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 italic font-black">SYSTEM</span>
                        </h2>
                        <p className="text-white/40 text-lg max-w-xl font-medium leading-relaxed mb-10 mx-auto lg:mx-0">
                            Gain XP by playing, completing quests, winning games, and participating in events. Each level unlocks new cosmetics, perks, and titles that show off your dedication to the Legion.
                        </p>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            <div className="px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4">
                                <Zap className="text-yellow-400" size={24} />
                                <div>
                                    <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">Active Multiplier</div>
                                    <div className="text-xl font-black text-white">1.0x <span className="text-xs text-white/20">Base</span></div>
                                </div>
                            </div>
                            <div className="px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4">
                                <Sparkles className="text-cyan-400" size={24} />
                                <div>
                                    <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">Quest Bonus</div>
                                    <div className="text-xl font-black text-white">+500 XP</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Leveling Visual Track */}
                    <div className="flex-1 w-full max-w-xl relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[39px] top-6 bottom-6 w-px bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-transparent" />

                        <div className="space-y-8">
                            {LEVELS.map((milestone, i) => (
                                <motion.div
                                    key={milestone.level}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative flex items-center gap-8 group"
                                >
                                    {/* Level Node */}
                                    <div className={`relative z-10 w-20 h-20 shrink-0 rounded-2xl bg-[#0A0A0F] border border-white/10 flex flex-col items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-white/20`}>
                                        <div className={`text-2xl font-black bg-clip-text text-transparent bg-gradient-to-br ${milestone.color}`}>
                                            {milestone.level}
                                        </div>
                                        <div className="text-[8px] font-black text-white/20 uppercase tracking-widest">Level</div>

                                        {/* Glow */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${milestone.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity rounded-2xl`} />
                                    </div>

                                    {/* Content Card */}
                                    <div className="flex-1 p-6 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.05] transition-all group-hover:translate-x-2">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xl font-black text-white uppercase tracking-tight italic">{milestone.name}</h3>
                                            <div className="text-white/20 opacity-20 group-hover:opacity-100 group-hover:scale-125 transition-all">
                                                {milestone.icon}
                                            </div>
                                        </div>
                                        <p className="text-xs font-bold text-white/30 uppercase tracking-widest leading-relaxed">
                                            {milestone.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Rewards Preview Carousel-like Bar */}
                <div className="p-10 rounded-[3rem] bg-white/[0.01] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 flex items-center justify-center text-cyan-400">
                            <Star size={24} className="animate-pulse" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1 italic">Level Rewards</div>
                            <div className="text-xl font-black text-white tracking-widest uppercase">Unlocks & Cosmetics</div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {['Custom Chat Prefix', 'Rare Emotes', 'Kit Upgrade', 'Pet Unlock'].map((item, i) => (
                            <div key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black text-white/50 uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all cursor-crosshair">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}
