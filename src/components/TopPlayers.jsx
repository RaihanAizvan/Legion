import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Swords, Zap, Timer, Award, Crown, Star, ChevronRight, BarChart, Shield, Target } from 'lucide-react'
import { topPlayers, leaderboard } from '../lib/constants'

const ALL_PLAYERS = [...topPlayers, ...leaderboard].sort((a, b) => a.rank - b.rank).slice(0, 8)

function LegendPillar({ player, isFocused, onMouseEnter }) {
    const isFirst = player.rank === 1
    const themeColor = isFirst ? 'border-yellow-500/50' : 'border-cyan-500/30'
    const glowColor = isFirst ? 'bg-yellow-500/5' : 'bg-cyan-500/5'

    return (
        <motion.div
            onMouseEnter={onMouseEnter}
            animate={{
                flex: isFocused ? 3 : 1,
                transition: { type: "spring", stiffness: 150, damping: 20 }
            }}
            className={`relative min-h-[500px] md:min-h-[700px] h-full overflow-hidden border-x border-white/5 bg-[#050508] transition-all duration-700 cursor-pointer group`}
        >
            {/* Background Image / Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={player.avatar}
                    alt={player.name}
                    className={`w-full h-full object-cover transition-all duration-1000 ${isFocused ? 'scale-110 opacity-40 blur-0' : 'scale-100 opacity-5 blur-sm grayscale'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/80 to-transparent" />
            </div>

            {/* Vertical Name (Collapsed) */}
            <AnimatePresence>
                {!isFocused && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-12"
                    >
                        <div className="text-white/10 font-black text-6xl rotate-[-90deg] whitespace-nowrap mb-24 opacity-20 group-hover:opacity-40 tracking-tighter uppercase transition-opacity">
                            {player.name}
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-black text-white/20 italic">
                            {player.rank}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Expanded Content */}
            <AnimatePresence>
                {isFocused && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.2 }}
                        className="absolute inset-0 z-20 p-8 md:p-12 flex flex-col justify-end"
                    >
                        <div className="mb-auto">
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl mb-6"
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black ${isFirst ? 'bg-yellow-400 text-black' : 'bg-cyan-500 text-white'}`}>
                                    {player.rank}
                                </div>
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Season Standing</span>
                            </motion.div>
                        </div>

                        <div className="relative">
                            {/* Rank Watermark */}
                            <div className="absolute -top-24 -left-12 text-[15rem] font-black text-white/[0.03] italic pointer-events-none tracking-tighter">
                                {player.rank}
                            </div>

                            <div className="relative z-10">
                                <motion.h3
                                    initial={{ x: -20 }}
                                    animate={{ x: 0 }}
                                    className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-4"
                                >
                                    {player.name}
                                </motion.h3>

                                <div className="flex flex-wrap gap-4 mb-10">
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white/40 italic uppercase tracking-widest">
                                        <Shield size={12} className="text-cyan-400" /> {player.team || 'Solo'}
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white/40 italic uppercase tracking-widest">
                                        <Target size={12} className="text-rose-400" /> Level {player.level}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { label: 'Combat Kills', val: player.kills, icon: Swords, col: 'text-rose-400' },
                                        { label: 'Playtime', val: player.playTime || '521h', icon: Timer, col: 'text-cyan-400' },
                                        { label: 'Win Rate', val: player.winRate || '98%', icon: Award, col: 'text-emerald-400' },
                                        { label: 'Prestige', val: 'IX', icon: Zap, col: 'text-yellow-400' }
                                    ].map((s, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + (i * 0.05) }}
                                            className="p-4 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all flex flex-col items-center md:items-start"
                                        >
                                            <s.icon size={16} className={`${s.col} mb-2`} />
                                            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">{s.label}</span>
                                            <span className="text-xl font-black text-white">{s.val}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`mt-10 w-full py-5 rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] transition-all shadow-2xl ${isFirst ? 'bg-yellow-400 text-black hover:bg-yellow-300' : 'bg-white text-black hover:bg-cyan-400'}`}
                        >
                            View Player Dossier
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Glowing Accent */}
            <div className={`absolute bottom-0 left-0 w-full h-1 transition-all duration-700 ${isFocused ? (isFirst ? 'bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.5)]' : 'bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]') : 'bg-white/5'}`} />
        </motion.div>
    )
}

export default function TopPlayers() {
    const [focusedIndex, setFocusedIndex] = useState(0)

    return (
        <section className="relative bg-[#050508] overflow-hidden min-h-screen">
            {/* Main Section Header */}
            <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-b border-white/5 pb-10">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <div className="h-px w-12 bg-cyan-500" />
                            <span className="text-xs font-black text-cyan-400 uppercase tracking-[0.5em]">The Eternal Vanguard</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl font-black text-white leading-[0.85] uppercase tracking-tighter mb-8"
                        >
                            LEADERBOARD <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">PANTHEON</span>
                        </motion.h2>
                        <p className="text-white/40 text-sm md:text-base max-w-xl font-medium leading-relaxed">
                            These aren't just players; they are the legends who defines Legion's history. Hover over each pillar to debrief on their tactical performance and seasonal achievements.
                        </p>
                    </div>

                    <div className="flex flex-col items-end text-right hidden lg:flex">
                        <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-2">Live Statistics</div>
                        <div className="text-4xl font-black text-white flex items-center gap-3">
                            <span className="text-cyan-500 italic">21K</span>
                            <div className="w-1.5 h-10 bg-white/5" />
                            <span className="text-white/20">TOTAL PLAYERS</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar Drag Indicator (Floating) */}
            <div className="absolute top-1/2 right-12 -translate-y-1/2 z-50 hidden lg:block pointer-events-none opacity-20">
                <div className="flex flex-col items-center gap-8">
                    <div className="h-24 w-px bg-white/20" />
                    <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] origin-right rotate-90 whitespace-nowrap">
                        Focus a pillar to expand
                    </div>
                    <div className="h-24 w-px bg-white/20" />
                </div>
            </div>

            {/* The Pillars Layout Container */}
            <div className="flex flex-col lg:flex-row w-full min-h-[600px] lg:h-[800px] overflow-hidden border-t border-white/5">
                {ALL_PLAYERS.map((player, i) => (
                    <LegendPillar
                        key={player.rank}
                        player={player}
                        isFocused={focusedIndex === i}
                        onMouseEnter={() => setFocusedIndex(i)}
                    />
                ))}
            </div>

            {/* Footer Summary Bar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-3 rounded-full bg-black/60 border border-white/5 backdrop-blur-3xl shadow-2xl pointer-events-none">
                <BarChart size={14} className="text-cyan-400" />
                <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">
                    Showing Top 8 Elite Personnel • Season 12 Active
                </span>
            </div>
        </section>
    )
}
