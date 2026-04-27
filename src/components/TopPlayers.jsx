import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Swords, Zap, Timer, Award, Crown, Star, ChevronRight } from 'lucide-react'
import { topPlayers, leaderboard } from '../lib/constants'

const ALL_RANKINGS = [...topPlayers, ...leaderboard].sort((a, b) => a.rank - b.rank)

function BentoPlayerTile({ player, className, delay }) {
    const isTop3 = player.rank <= 3
    const themes = {
        1: { border: 'border-yellow-500/30', glow: 'bg-yellow-500/5', color: 'text-yellow-500', label: 'Grand Sovereign' },
        2: { border: 'border-slate-400/30', glow: 'bg-slate-400/5', color: 'text-slate-400', label: 'Prime Elite' },
        3: { border: 'border-amber-600/30', glow: 'bg-amber-600/5', color: 'text-amber-600', label: 'Battle Master' }
    }
    const theme = themes[player.rank] || { border: 'border-white/5', glow: 'bg-white/5', color: 'text-white/40', label: 'Veteran' }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay }}
            whileHover={{ y: -8, scale: 1.01 }}
            className={`group relative rounded-[2rem] border overflow-hidden bg-[#0A0A0F] transition-all duration-500 ${theme.border} ${className}`}
        >
            {/* Background Glow */}
            <div className={`absolute -right-12 -top-12 w-64 h-64 blur-[80px] opacity-10 transition-opacity group-hover:opacity-20 ${theme.glow}`} />

            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

            {/* Rank Watermark */}
            <div className="absolute bottom-4 right-6 text-9xl font-black text-white/[0.02] italic pointer-events-none group-hover:text-white/[0.04] transition-colors leading-none select-none">
                {player.rank}
            </div>

            <div className="p-8 h-full flex flex-col justify-between relative z-10">
                <div>
                    <div className="flex items-start justify-between mb-8">
                        <div className="relative group/avatar">
                            <div className={`absolute inset-[-4px] rounded-2xl blur-md opacity-20 group-hover:opacity-40 transition-opacity ${theme.glow}`} />
                            <img
                                src={player.avatar}
                                alt={player.name}
                                className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] border border-white/10 relative z-10 transition-transform group-hover/avatar:rotate-[-4deg]"
                            />
                            {isTop3 && (
                                <div className="absolute -top-3 -left-3 p-1.5 rounded-lg bg-black border border-white/10 z-20 shadow-2xl">
                                    {player.rank === 1 ? <Crown size={16} className="text-yellow-400" /> : <Trophy size={16} className={theme.color} />}
                                </div>
                            )}
                        </div>
                        <div className="text-right">
                            <div className={`text-[9px] font-black uppercase tracking-[0.4em] mb-1 ${theme.color}`}>{theme.label}</div>
                            <div className="text-2xl font-black text-white uppercase tracking-tighter">{player.name}</div>
                        </div>
                    </div>

                    {/* Stats Layout changes based on size (via parent class) */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 md:p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all flex flex-col">
                            <span className="text-[9px] uppercase font-black text-white/20 tracking-widest mb-1 flex items-center gap-1.5">
                                <Swords size={10} className="text-rose-400" /> Kills
                            </span>
                            <span className="text-xl font-black text-white tracking-tight">{player.kills}</span>
                        </div>
                        <div className="p-3 md:p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all flex flex-col">
                            <span className="text-[9px] uppercase font-black text-white/20 tracking-widest mb-1 flex items-center gap-1.5">
                                <Zap size={10} className="text-purple-400" /> Level
                            </span>
                            <span className="text-xl font-black text-white tracking-tight">{player.level}</span>
                        </div>
                        <div className="p-3 md:p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all flex flex-col">
                            <span className="text-[9px] uppercase font-black text-white/20 tracking-widest mb-1 flex items-center gap-1.5">
                                <Timer size={10} className="text-cyan-400" /> Time
                            </span>
                            <span className="text-sm font-black text-white/60 tracking-tight">{player.playTime || '---'}</span>
                        </div>
                        <div className="p-3 md:p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all flex flex-col">
                            <span className="text-[9px] uppercase font-black text-white/20 tracking-widest mb-1 flex items-center gap-1.5">
                                <Award size={10} className="text-emerald-400" /> Ratio
                            </span>
                            <span className="text-sm font-black text-white/60 tracking-tight">{player.winRate || 'MAX'}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[8px] font-black text-white uppercase tracking-widest">Active Player</span>
                    </div>
                    <ChevronRight size={18} className="text-white/20 group-hover:text-cyan-400" />
                </div>
            </div>
        </motion.div>
    )
}

export default function TopPlayers() {
    return (
        <section className="relative py-32 bg-[#050508] overflow-hidden">
            {/* Website Cohesion Elements */}
            <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-cyan-900/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10">

                {/* Header matches UniqueFeatures style */}
                <div className="text-center mb-24">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <Star size={12} className="animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                        Hall of Eternal Fame
                    </motion.span>
                    <h2 className="font-display font-black text-6xl md:text-8xl text-white uppercase tracking-tighter leading-[0.8] mb-6">
                        THE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">LEGENDS</span>
                    </h2>
                    <p className="text-white/40 max-w-xl mx-auto text-sm md:text-base font-medium leading-relaxed">
                        The definitive leaderboard. Every season, the top performing agents are etched into the server's history.
                    </p>
                </div>

                {/* Bento Grid Layout - Balanced with Website Aesthetic */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">

                    {/* Rank 1: Massive Featured Spanner (Left Side) */}
                    <BentoPlayerTile
                        player={ALL_RANKINGS[0]}
                        className="lg:col-span-8 lg:row-span-2 min-h-[400px]"
                        delay={0.1}
                    />

                    {/* Rank 2 & 3: Stacked Sidebar tiles */}
                    <BentoPlayerTile
                        player={ALL_RANKINGS[1]}
                        className="lg:col-span-4"
                        delay={0.2}
                    />
                    <BentoPlayerTile
                        player={ALL_RANKINGS[2]}
                        className="lg:col-span-4"
                        delay={0.3}
                    />

                    {/* Rank 4-9: Clean Mini-Grid below */}
                    {ALL_RANKINGS.slice(3, 9).map((player, i) => (
                        <BentoPlayerTile
                            key={player.rank}
                            player={player}
                            className="lg:col-span-4"
                            delay={0.4 + (i * 0.1)}
                        />
                    ))}

                    {/* Final Action Tile */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 }}
                        className="lg:col-span-12 p-10 rounded-[2.5rem] bg-gradient-to-r from-white/5 via-white/[0.02] to-transparent border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 mt-6"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                                <Trophy size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Think you have what it takes?</h3>
                                <p className="text-white/30 text-sm">Combat rankings refresh every 24 hours. Keep grinding to see your name here.</p>
                            </div>
                        </div>
                        <button className="px-10 py-5 rounded-2xl bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-cyan-400 transition-all hover:scale-105 shadow-2xl">
                            Register for Season
                        </button>
                    </motion.div>
                </div>

            </div>
        </section>
    )
}
