import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Swords, Timer, Zap, Award, Users, ChevronRight, Target, ShieldCheck } from 'lucide-react'
import { topPlayers, leaderboard } from '../lib/constants'

// Combine topPlayers and leaderboard for a single list
const allRankings = [...topPlayers, ...leaderboard].sort((a, b) => a.rank - b.rank)

function StatBlock({ label, value, icon: Icon, color, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all group/stat"
        >
            <div className={`p-3 rounded-xl bg-white/5 ${color} group-hover/stat:scale-110 transition-transform`}>
                <Icon size={20} />
            </div>
            <div>
                <div className="text-[10px] uppercase font-black text-white/30 tracking-widest leading-none mb-1">{label}</div>
                <div className="text-xl font-black text-white tracking-tight">{value}</div>
            </div>
        </motion.div>
    )
}

function PlayerDetail({ player }) {
    if (!player) return null

    return (
        <div className="w-full h-full flex flex-col items-center lg:items-start">
            <div className="relative w-full aspect-square max-w-[320px] lg:max-w-none lg:h-[400px] mb-8 group/avatar">
                {/* Background Decor */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-[3rem] blur-3xl group-hover/avatar:opacity-40 transition-opacity" />

                {/* Main Avatar */}
                <motion.div
                    key={player.rank}
                    initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
                    animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="relative w-full h-full rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl backdrop-blur-sm"
                >
                    <img
                        src={player.avatar.replace('100', '500')} // Try to get higher res
                        alt={player.name}
                        className="w-full h-full object-cover"
                    />

                    {/* Rank Overlay */}
                    <div className="absolute top-6 left-6 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl font-black text-cyan-400">
                            {player.rank}
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
                            Current Standing
                        </div>
                    </div>
                </motion.div>

                {/* Floating Badges */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute -right-6 top-1/4 p-4 rounded-2xl bg-black/80 border border-white/10 shadow-2xl backdrop-blur-xl z-20"
                >
                    <Trophy className="text-yellow-500 mb-1" size={24} />
                    <div className="text-[10px] font-black text-white/50 uppercase">Tier</div>
                    <div className="text-xs font-bold text-white">LEGENDARY</div>
                </motion.div>
            </div>

            {/* Info Section */}
            <motion.div
                key={player.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full"
            >
                <h2 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-2">
                    {player.name}
                </h2>
                <div className="flex flex-wrap items-center gap-4 mb-8">
                    <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black uppercase tracking-widest">
                        {player.team || player.clan || 'Solo Agent'}
                    </span>
                    <span className="h-1 w-8 bg-white/10" />
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <Target size={14} /> Prestige Level {player.rank === 1 ? 'MAX' : '9'}
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <StatBlock label="Combat Kills" value={player.kills} icon={Swords} color="text-rose-400" delay={0.1} />
                    <StatBlock label="Progression" value={`Lv. ${player.level}`} icon={Zap} color="text-purple-400" delay={0.2} />
                    <StatBlock label="Survival Time" value={player.playTime || '---'} icon={Timer} color="text-cyan-400" delay={0.3} />
                    <StatBlock label="Win Ratio" value={player.winRate || '---'} icon={Award} color="text-emerald-400" delay={0.4} />
                </div>
            </motion.div>
        </div>
    )
}

function RankingItem({ player, isSelected, onClick, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={onClick}
            className={`group relative flex items-center gap-4 p-4 rounded-3xl cursor-pointer transition-all duration-300 ${isSelected ? 'bg-white/10 shadow-2xl scale-105' : 'hover:bg-white/[0.03]'}`}
        >
            {isSelected && (
                <motion.div
                    layoutId="active-bg"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-3xl"
                />
            )}

            <div className={`w-12 h-12 flex items-center justify-center font-black text-xl italic transition-colors ${isSelected ? 'text-cyan-400' : 'text-white/10 group-hover:text-white/30'}`}>
                {player.rank.toString().padStart(2, '0')}
            </div>

            <div className="relative">
                <img src={player.avatar} alt={player.name} className={`w-12 h-12 rounded-2xl transition-all duration-500 ${isSelected ? 'rotate-[-10deg] scale-110 shadow-xl' : 'grayscale group-hover:grayscale-0'}`} />
                {isSelected && <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 rounded-full border-2 border-[#050508] animate-pulse" />}
            </div>

            <div className="flex-1 min-w-0">
                <div className={`text-lg font-black tracking-tight truncate ${isSelected ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`}>
                    {player.name}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-black text-white/20 uppercase">Tier</span>
                    <div className="flex gap-0.5 opacity-30">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < (4 - player.rank) ? 'bg-cyan-500 opacity-100' : 'bg-white'}`} />
                        ))}
                    </div>
                </div>
            </div>

            <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${isSelected ? 'opacity-100' : ''}`}>
                <ChevronRight size={20} className="text-cyan-500" />
            </div>
        </motion.div>
    )
}

export default function TopPlayers() {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const selectedPlayer = allRankings[selectedIndex]

    return (
        <section className="relative py-32 bg-[#050508] overflow-hidden min-h-screen flex items-center">
            {/* Background Texture */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full transform translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-500/5 blur-[120px] rounded-full transform -translate-x-1/2 translate-y-1/2" />
                <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                    {/* Left: Interactive List */}
                    <div className="lg:col-span-5 order-2 lg:order-1">
                        <div className="mb-10">
                            <span className="text-xs font-black text-cyan-400 uppercase tracking-[0.5em] block mb-2">Live Rankings</span>
                            <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic flex items-center gap-4">
                                <ShieldCheck className="text-cyan-500" /> The Global Elite
                            </h2>
                        </div>

                        <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-4 scrollbar-hide">
                            {allRankings.map((player, i) => (
                                <RankingItem
                                    key={player.rank}
                                    player={player}
                                    index={i}
                                    isSelected={selectedIndex === i}
                                    onClick={() => setSelectedIndex(i)}
                                />
                            ))}
                        </div>

                        <div className="mt-8 flex items-center gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                            <div className="flex -space-x-3">
                                {allRankings.slice(0, 4).map((p, i) => (
                                    <img key={i} src={p.avatar} className="w-10 h-10 rounded-full border-2 border-[#050508]" />
                                ))}
                            </div>
                            <div className="text-[10px] font-black text-white/30 uppercase leading-tight tracking-[0.1em]">
                                Join +14K <br /> Registered Agents
                            </div>
                        </div>
                    </div>

                    {/* Right: Legend Detail Showcase */}
                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <AnimatePresence mode="wait">
                            <PlayerDetail player={selectedPlayer} />
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    )
}
