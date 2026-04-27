import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Swords, Zap, Timer, Award, User, ChevronRight, BarChart2 } from 'lucide-react'
import { topPlayers, leaderboard } from '../lib/constants'

const ALL_PLAYERS = [...topPlayers, ...leaderboard].sort((a, b) => a.rank - b.rank)

function CompactPlayerCard({ player, index }) {
    const isTop3 = player.rank <= 3
    const colors = {
        1: 'from-amber-400 to-yellow-600',
        2: 'from-slate-300 to-gray-500',
        3: 'from-orange-500 to-amber-700'
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative group cursor-pointer"
        >
            <div className={`p-[1px] rounded-3xl bg-gradient-to-br ${isTop3 ? colors[player.rank] : 'from-white/10 to-transparent'} group-hover:from-cyan-500 group-hover:to-purple-500 transition-all duration-500`}>
                <div className="bg-[#0A0A0F] rounded-[1.7rem] p-5 h-full relative overflow-hidden">

                    {/* Background Shine */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-[40px] -mr-12 -mt-12 group-hover:bg-cyan-500/10 transition-colors" />

                    <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <img
                                    src={player.avatar}
                                    alt={player.name}
                                    className="w-14 h-14 rounded-2xl object-cover border border-white/10"
                                />
                                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black italic border-2 border-[#0A0A0F] ${isTop3 ? 'bg-white text-black' : 'bg-white/10 text-white'}`}>
                                    {player.rank}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-white font-black text-lg tracking-tight truncate max-w-[120px]">{player.name}</h3>
                                <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest flex items-center gap-1">
                                    <Zap size={10} className="text-purple-400" /> LVL {player.level}
                                </div>
                            </div>
                        </div>
                        {isTop3 && <Trophy size={18} className={player.rank === 1 ? 'text-yellow-400' : 'text-white/20'} />}
                    </div>

                    {/* Compact Stats */}
                    <div className="grid grid-cols-2 gap-2 relative z-10">
                        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all flex flex-col">
                            <span className="text-[8px] uppercase font-black text-white/20 mb-1">Kills</span>
                            <span className="text-sm font-black text-rose-400">{player.kills}</span>
                        </div>
                        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all flex flex-col">
                            <span className="text-[8px] uppercase font-black text-white/20 mb-1">Ratio</span>
                            <span className="text-sm font-black text-emerald-400">{player.winRate || '---'}</span>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">View Dossier</span>
                        <ChevronRight size={14} className="text-cyan-500" />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default function TopPlayers() {
    const scrollContainerRef = useRef(null)

    return (
        <section className="relative py-24 bg-[#050508] overflow-hidden">
            {/* Minimal Background Grid */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

            <div className="container mx-auto px-4 relative z-10">

                {/* Modern Dashboard Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <BarChart2 className="text-cyan-400" size={20} />
                            <span className="text-xs font-black text-white/40 uppercase tracking-[0.4em]">Combat Analytics</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                            ELITE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">DASHBOARD</span>
                        </h2>
                        <p className="text-white/30 font-medium text-sm md:text-base leading-relaxed">
                            A live-updating overview of the top performing agents sorted by combat efficiency and survival metrics.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-[10px] font-black text-white/20 uppercase">Total Capacity</div>
                            <div className="text-2xl font-black text-white flex items-center gap-2">
                                <User size={20} className="text-cyan-500" /> 14,290
                            </div>
                        </div>
                        <div className="h-12 w-px bg-white/10 mx-2" />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all"
                        >
                            Open Rankings
                        </motion.button>
                    </div>
                </div>

                {/* Staggered Bento Wall */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {/* Rank 1 Feature (Spans 2 columns) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="sm:col-span-2 group relative"
                    >
                        <div className="p-[1px] rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-600 h-full">
                            <div className="bg-[#0A0A0F] rounded-[1.7rem] p-8 h-full flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
                                <div className="absolute -right-20 -top-20 w-64 h-64 bg-yellow-500/10 blur-[80px] rounded-full group-hover:bg-yellow-500/20 transition-all duration-700" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="relative">
                                            <img
                                                src={ALL_PLAYERS[0].avatar}
                                                className="w-24 h-24 rounded-[2rem] border-2 border-yellow-500/50 shadow-2xl origin-bottom group-hover:rotate-[-5deg] transition-transform"
                                            />
                                            <div className="absolute -top-3 -right-3 w-10 h-10 bg-yellow-400 text-black rounded-2xl flex items-center justify-center font-black italic shadow-lg">
                                                01
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.3em] block mb-1">Global Champion</span>
                                            <h3 className="text-4xl font-black text-white tracking-tighter uppercase">{ALL_PLAYERS[0].name}</h3>
                                            <div className="flex items-center gap-4 mt-2">
                                                <div className="flex items-center gap-2 text-xs font-bold text-white/40">
                                                    <Timer size={12} className="text-cyan-400" /> {ALL_PLAYERS[0].playTime || '542h'}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs font-bold text-white/40">
                                                    <Award size={12} className="text-purple-400" /> MASTER TIER
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mb-8">
                                        {[
                                            { label: 'Kills', val: ALL_PLAYERS[0].kills, icon: Swords, col: 'text-rose-400' },
                                            { label: 'Level', val: ALL_PLAYERS[0].level, icon: Zap, col: 'text-yellow-400' },
                                            { label: 'Wins', val: ALL_PLAYERS[0].winRate || '98%', icon: Award, col: 'text-emerald-400' }
                                        ].map((s, i) => (
                                            <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col items-center gap-1 group-hover:bg-white/[0.05] transition-colors">
                                                <s.icon size={14} className={s.col} />
                                                <div className="text-[9px] uppercase font-black text-white/20 tracking-widest">{s.label}</div>
                                                <div className="text-xl font-black text-white">{s.val}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    className="w-full py-4 rounded-2xl bg-yellow-400 text-black font-black uppercase text-xs tracking-widest relative z-10"
                                >
                                    View Full Dossier
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Rest of Top Players in a Grid */}
                    {ALL_PLAYERS.slice(1, 10).map((player, i) => (
                        <CompactPlayerCard key={player.rank} player={player} index={i} />
                    ))}

                    {/* Final "View All" Tile */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex flex-col justify-center items-center p-8 rounded-3xl bg-white/[0.02] border border-white/5 border-dashed hover:bg-white/[0.04] transition-all group"
                    >
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 mb-4 group-hover:scale-110 transition-transform">
                            <ChevronRight className="text-white/20 group-hover:text-cyan-400 transition-colors" />
                        </div>
                        <div className="text-center">
                            <div className="text-xs font-black text-white/40 uppercase tracking-widest mb-1">The Rest</div>
                            <div className="text-2xl font-black text-white tracking-tighter uppercase whitespace-nowrap">View Global Rankings</div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    )
}
