import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Swords, Zap, Timer, Award, User, ChevronRight, LayoutGrid, List } from 'lucide-react'
import { topPlayers, leaderboard } from '../lib/constants'

const ALL_RANKINGS = [...topPlayers, ...leaderboard].sort((a, b) => a.rank - b.rank)

function MasterTile({ player }) {
    const isFirst = player.rank === 1
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.01 }}
            className={`relative group overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0A0A0F] p-8 flex flex-col md:flex-row items-center gap-10 transition-all duration-500 hover:border-cyan-500/30 ${isFirst ? 'md:col-span-2' : ''}`}
        >
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-10 rounded-full -mr-20 -mt-20 transition-colors ${isFirst ? 'bg-yellow-500 group-hover:bg-yellow-500/20' : 'bg-cyan-500 group-hover:bg-cyan-500/20'}`} />

            {/* Rank ID */}
            <div className="absolute top-8 right-10 text-8xl font-black text-white/[0.03] italic pointer-events-none group-hover:text-white/[0.05] transition-colors leading-none">
                0{player.rank}
            </div>

            <div className="relative group/avatar">
                <div className={`absolute inset-[-4px] rounded-[2rem] blur-xl opacity-20 transition-opacity ${isFirst ? 'bg-yellow-500 group-hover:opacity-40' : 'bg-cyan-500 group-hover:opacity-40'}`} />
                <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-[2.2rem] object-cover border-2 border-white/10 relative z-10 transition-transform group-hover/avatar:scale-105"
                />
            </div>

            <div className="flex-1 text-center md:text-left relative z-10">
                <div className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 ${isFirst ? 'text-yellow-500' : 'text-cyan-400'}`}>
                    {isFirst ? 'Current Sovereign' : 'Elite Master'}
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">{player.name}</h3>

                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <div className="px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col items-center md:items-start min-w-[90px]">
                        <span className="text-[9px] uppercase font-bold text-white/20">Level</span>
                        <span className="text-lg font-black text-white">{player.level}</span>
                    </div>
                    <div className="px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col items-center md:items-start min-w-[90px]">
                        <span className="text-[9px] uppercase font-bold text-white/20">Kills</span>
                        <span className="text-lg font-black text-rose-500">{player.kills}</span>
                    </div>
                    <div className="px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col items-center md:items-start min-w-[90px]">
                        <span className="text-[9px] uppercase font-bold text-white/20">Team</span>
                        <span className="text-lg font-black text-white/60 truncate max-w-[100px]">{player.team || player.clan || 'SOLO'}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

function EliteRow({ player, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group flex items-center gap-6 p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all cursor-pointer"
        >
            <div className="w-10 h-10 flex items-center justify-center font-black text-2xl text-white/10 italic group-hover:text-cyan-400/30 transition-colors">
                {player.rank}
            </div>

            <img src={player.avatar} alt={player.name} className="w-14 h-14 rounded-2xl border border-white/10 shadow-lg group-hover:scale-105 transition-transform" />

            <div className="flex-1">
                <div className="text-xl font-black text-white tracking-tight uppercase group-hover:text-cyan-400 transition-colors">{player.name}</div>
                <div className="flex items-center gap-4 mt-1 text-[10px] font-bold uppercase tracking-widest text-white/30">
                    <span className="flex items-center gap-1.5"><Zap size={10} className="text-purple-500" /> LVL {player.level}</span>
                    <span className="w-1 h-1 rounded-full bg-white/10" />
                    <span className="flex items-center gap-1.5"><Swords size={10} className="text-rose-500" /> {player.kills} Kills</span>
                </div>
            </div>

            <div className="hidden sm:flex flex-col items-end mr-4">
                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Efficiency</span>
                <span className="text-sm font-black text-white/60 tracking-tighter">{player.winRate || 'MAX'}</span>
            </div>

            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={18} className="text-cyan-500" />
            </div>
        </motion.div>
    )
}

export default function TopPlayers() {
    const [viewMode, setViewMode] = useState('tiered') // 'tiered' or 'list'

    return (
        <section className="relative py-32 bg-[#050508] overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">

                {/* Header with Selector */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                    <div>
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center gap-2 mb-4">
                            <div className="h-px w-8 bg-cyan-500" />
                            <span className="text-xs font-black text-cyan-400 uppercase tracking-[0.5em]">Battle Metrics</span>
                        </motion.div>
                        <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.8] mb-6">
                            ELITE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 italic">RANKINGS</span>
                        </h2>
                    </div>

                    <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
                        <button
                            onClick={() => setViewMode('tiered')}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'tiered' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-white/40 hover:text-white'}`}
                        >
                            <LayoutGrid size={14} /> Tiered View
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'list' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-white/40 hover:text-white'}`}
                        >
                            <List size={14} /> Full Roster
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {viewMode === 'tiered' ? (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12"
                        >
                            {/* Master Tier */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <MasterTile player={ALL_RANKINGS[0]} />
                                <MasterTile player={ALL_RANKINGS[1]} />
                                <MasterTile player={ALL_RANKINGS[2]} />
                            </div>

                            {/* Elite Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {ALL_RANKINGS.slice(3, 11).map((player, i) => (
                                    <EliteRow key={player.rank} player={player} index={i} />
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white/[0.02] rounded-[3rem] border border-white/5 p-6 md:p-12"
                        >
                            <div className="space-y-2">
                                {ALL_RANKINGS.map((player, i) => (
                                    <EliteRow key={player.rank} player={player} index={i} />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer Insight */}
                <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 p-10 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-3xl">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                            <Trophy size={32} />
                        </div>
                        <div>
                            <div className="text-xl font-black text-white uppercase tracking-tight italic">Seasonal Reward</div>
                            <div className="text-sm text-white/40">The Top 10 agents will receive the <span className="text-cyan-400 font-bold">\"Legion-01\"</span> Elite Armor Set.</div>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-10 py-4 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-cyan-400 transition-colors"
                    >
                        Learn More about Ranks
                    </motion.button>
                </div>

            </div>
        </section>
    )
}
