import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Crown } from 'lucide-react'
import { topPlayers, leaderboard, onlinePlayers } from '../lib/constants'

const RANK_COLORS = { 1: 'from-yellow-500 to-amber-400', 2: 'from-slate-400 to-gray-300', 3: 'from-amber-700 to-amber-600' }
const RANK_BORDER = { 1: 'border-yellow-500/50 glow-text-gold', 2: 'border-slate-400/40', 3: 'border-amber-700/40' }
function PodiumCard({ player, height }) {
    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.25 }}
            className={`glass-card border overflow-hidden ${RANK_BORDER[player.rank]} flex flex-col`}
            style={{ minWidth: '200px', flexGrow: 1 }}
        >
            {/* Rank top bar */}
            <div className={`h-1 w-full bg-gradient-to-r ${RANK_COLORS[player.rank]}`} />
            <div className="p-5 flex flex-col items-center flex-1">
                {player.rank === 1 && (
                    <Crown size={20} className="text-yellow-400 mb-2 animate-float" />
                )}
                <div className="relative mb-3">
                    <img
                        src={player.avatar}
                        alt={player.name}
                        className="w-20 h-20 rounded-full border-2 border-white/20"
                    />
                    <span className={`absolute -top-1 -right-1 text-xs font-bold px-1.5 py-0.5 rounded-full bg-gradient-to-r ${RANK_COLORS[player.rank]} text-black`}>
                        #{player.rank}
                    </span>
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-3">{player.name}</h3>
                <div className="grid grid-cols-2 gap-1 w-full text-xs">
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                        <div className="text-white/40">Kills</div>
                        <div className="text-white font-semibold">{player.kills}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                        <div className="text-white/40">Win Rate</div>
                        <div className="text-white font-semibold">{player.winRate}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                        <div className="text-white/40">Level</div>
                        <div className="text-white font-semibold">{player.level}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 text-center">
                        <div className="text-white/40">Time</div>
                        <div className="text-white font-semibold">{player.playTime}</div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default function TopPlayers() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-100px' })

    // Podium order: 3, 1, 2
    const podiumOrder = [topPlayers[2], topPlayers[0], topPlayers[1]]

    return (
        <section ref={ref} className="relative py-24 overflow-hidden mesh-bg">
            <div className="absolute top-0 left-0 right-0 section-divider" />
            <div className="absolute inset-0 grid-pattern opacity-10" />

            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-xs tracking-widest text-yellow-400 uppercase font-semibold">Season Champions</span>
                    <h2 className="font-display font-bold text-4xl text-white mt-2 glow-text-blue flex items-center justify-center gap-3">
                        <Star size={28} className="text-yellow-400" />
                        Top Players This Season
                        <Star size={28} className="text-yellow-400" />
                    </h2>
                </motion.div>

                {/* Podium */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-stretch mb-12 max-w-3xl mx-auto"
                >
                    {podiumOrder.map((player) => (
                        <PodiumCard key={player.rank} player={player} />
                    ))}
                </motion.div>

                {/* Leaderboard + Online Players */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Leaderboard grid */}
                    <div className="lg:w-3/4">
                        <h3 className="font-display font-bold text-xl text-cyan-300 mb-5 glow-text-blue">
                            Leaderboard Rankings
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {leaderboard.map((p, i) => (
                                <motion.div
                                    key={p.rank}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                                    className="glass-card-hover flex items-center gap-4 p-4"
                                >
                                    <span className="text-xs font-bold bg-white/10 text-white/60 px-2 py-1 rounded font-mono"># {p.rank}</span>
                                    <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full border border-white/20" />
                                    <div className="flex-1">
                                        <div className="font-semibold text-white">{p.name}</div>
                                        <div className="flex space-x-3 text-xs text-white/40 mt-0.5">
                                            <span>Lv. {p.level}</span>
                                            <span>⚔ {p.kills} kills</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="mt-6 text-center">
                            <a
                                href="/leaderboard"
                                className="btn-primary inline-flex items-center space-x-2 text-sm"
                            >
                                <span>View Full Leaderboard</span>
                                <span>→</span>
                            </a>
                        </div>
                    </div>

                    {/* Online players */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="lg:w-1/4"
                    >
                        <div className="glass-card p-5 h-full">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-display font-bold text-lg text-pink-300">Online Now</h3>
                                <span className="flex items-center space-x-1 text-xs text-green-400">
                                    <span className="online-dot" />
                                    <span>21</span>
                                </span>
                            </div>
                            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                                {onlinePlayers.map((p, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group"
                                    >
                                        <img src={p.avatar} alt={p.name} className="w-7 h-7 rounded" />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium text-white truncate group-hover:text-blue-300 transition-colors">{p.name}</div>
                                            <div className="text-xs text-white/30">Lv. {p.level}</div>
                                        </div>
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
