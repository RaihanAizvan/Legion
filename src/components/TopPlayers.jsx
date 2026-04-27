import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Crown, Trophy, Swords, Timer, Zap, Award, Users } from 'lucide-react'
import { topPlayers, leaderboard, onlinePlayers } from '../lib/constants'

const RANK_THEMES = {
    1: {
        color: 'from-yellow-400 via-amber-500 to-yellow-600',
        glow: 'rgba(251, 191, 36, 0.5)',
        border: 'border-yellow-500/50',
        shadow: 'shadow-[0_0_50px_rgba(251,191,36,0.3)]',
        label: 'Grand Champion'
    },
    2: {
        color: 'from-slate-300 via-gray-400 to-slate-500',
        glow: 'rgba(148, 163, 184, 0.5)',
        border: 'border-slate-400/40',
        shadow: 'shadow-[0_0_40px_rgba(148,163,184,0.2)]',
        label: 'Elite Sentinel'
    },
    3: {
        color: 'from-amber-600 via-orange-700 to-amber-800',
        glow: 'rgba(180, 83, 9, 0.5)',
        border: 'border-amber-700/40',
        shadow: 'shadow-[0_0_30px_rgba(180,83,9,0.2)]',
        label: 'Master Vanguard'
    }
}

function StatBadge({ icon: Icon, label, value, color }) {
    return (
        <div className="flex flex-col items-center p-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm group-hover:bg-white/10 transition-colors">
            <Icon size={14} className={`${color} mb-1 opacity-70`} />
            <span className="text-[10px] uppercase tracking-tighter text-white/40 mb-0.5">{label}</span>
            <span className="text-sm font-bold text-white leading-none">{value}</span>
        </div>
    )
}

function EliteCard({ player, isFocused, onMouseEnter }) {
    const theme = RANK_THEMES[player.rank]
    const isFirst = player.rank === 1

    return (
        <motion.div
            layout
            onMouseEnter={onMouseEnter}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className={`relative flex flex-col items-center group cursor-pointer transition-all duration-500 ${isFocused ? 'z-20 scale-105' : 'z-10 grayscale-[0.3] opacity-80'}`}
        >
            {/* Rank Badge */}
            <div className={`absolute -top-4 z-30 px-4 py-1 rounded-full bg-gradient-to-r ${theme.color} text-black font-black text-xs uppercase tracking-widest shadow-lg`}>
                Rank #{player.rank}
            </div>

            {/* Main Card */}
            <div className={`w-full max-w-[280px] p-1 rounded-[2rem] bg-gradient-to-b ${theme.color} ${theme.shadow}`}>
                <div className="w-full h-full p-6 rounded-[1.8rem] bg-[#0A0A0F] flex flex-col items-center overflow-hidden relative">

                    {/* Background Glow */}
                    <div className={`absolute inset-0 opacity-10 blur-3xl ${isFocused ? 'opacity-30' : ''} transition-opacity duration-700`}
                        style={{ backgroundColor: theme.glow }} />

                    {/* Character Visual */}
                    <div className="relative z-10 mb-6">
                        <motion.div
                            animate={isFocused ? { scale: [1, 1.05, 1], rotateY: [0, 5, 0] } : {}}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="relative"
                        >
                            <img
                                src={player.avatar}
                                alt={player.name}
                                className="w-28 h-28 rounded-2xl border-2 border-white/20 shadow-2xl relative z-10"
                            />
                            {/* Halo */}
                            <div className={`absolute inset-[-10px] rounded-full blur-xl opacity-40 animate-pulse ${isFirst ? 'bg-yellow-400' : 'bg-white/20'}`} />
                        </motion.div>
                        {isFirst && (
                            <motion.div
                                animate={{ y: [-5, 5, -5] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute -top-8 left-1/2 -translate-x-1/2 text-yellow-400"
                            >
                                <Crown size={32} fill="currentColor" />
                            </motion.div>
                        )}
                    </div>

                    <h3 className="text-2xl font-black text-white text-center mb-1 tracking-tighter uppercase">
                        {player.name}
                    </h3>
                    <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-6 ${isFirst ? 'text-yellow-500' : 'text-white/40'}`}>
                        {theme.label}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 w-full">
                        <StatBadge icon={Swords} label="Kills" value={player.kills} color="text-rose-400" />
                        <StatBadge icon={Timer} label="Time" value={player.playTime} color="text-cyan-400" />
                        <StatBadge icon={Zap} label="Level" value={player.level} color="text-purple-400" />
                        <StatBadge icon={Award} label="WinRate" value={player.winRate} color="text-emerald-400" />
                    </div>

                    {/* Clan Tag */}
                    <div className="mt-6 flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] uppercase font-bold text-white/40">
                        <Users size={10} />
                        {player.team || player.clan || 'Loner'}
                    </div>
                </div>
            </div>

            {/* Holographic Platform */}
            <div className={`mt-2 w-2/3 h-2 bg-gradient-to-r ${theme.color} blur-md opacity-50`} />
        </motion.div>
    )
}

function LeaderboardRow({ player, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
        >
            <div className="w-12 h-12 flex items-center justify-center font-black text-xl text-white/20 italic group-hover:text-cyan-400/50 transition-colors">
                #{player.rank}
            </div>

            <img src={player.avatar} alt={player.name} className="w-10 h-10 rounded-lg border border-white/10 shadow-lg" />

            <div className="flex-1">
                <div className="text-white font-bold tracking-tight">{player.name}</div>
                <div className="flex items-center gap-3 mt-1">
                    <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden max-w-[100px]">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(player.level / 100) * 100}%` }}
                            className="h-full bg-cyan-500/50"
                        />
                    </div>
                    <span className="text-[10px] text-white/40 font-bold uppercase">LVL {player.level}</span>
                </div>
            </div>

            <div className="text-right">
                <div className="text-xs font-black text-rose-500 uppercase tracking-tighter">{player.kills} KILLS</div>
                <div className="text-[10px] text-white/20 font-bold mt-0.5">ELITE TIER</div>
            </div>
        </motion.div>
    )
}

function OnlineStatus() {
    return (
        <div className="space-y-3 pr-2 scrollbar-hide overflow-y-auto max-h-[400px]">
            {onlinePlayers.map((player, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors group">
                    <div className="relative">
                        <img src={player.avatar} alt={player.name} className="w-8 h-8 rounded-lg" />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#050508] rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        </div>
                    </div>
                    <div>
                        <div className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">{player.name}</div>
                        <div className="text-[9px] text-white/30 uppercase font-black">Level {player.level}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default function TopPlayers() {
    const [focusedRank, setFocusedRank] = useState(1)
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

    return (
        <section ref={containerRef} className="relative py-32 bg-[#050508] overflow-hidden">
            {/* Dynamic Background */}
            <motion.div
                style={{ y: bgY }}
                className="absolute inset-0 z-0 pointer-events-none opacity-20"
            >
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-500/20 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full" />
            </motion.div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-xs font-black text-cyan-400 uppercase tracking-[0.4em] mb-4 block"
                        >
                            The Pantheon
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl font-black text-white leading-none uppercase tracking-tighter"
                        >
                            LEGION'S <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">ELITE</span>
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="max-w-xs"
                    >
                        <p className="text-white/40 text-sm font-medium leading-relaxed">
                            Only the most dedicated survivalists reach the Hall of Fame. Rankings are updated every 24 hours based on combat stats, playtime, and prestige levels.
                        </p>
                    </motion.div>
                </div>

                {/* Top 3 Focus Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mb-32">
                    {/* Rank 2 */}
                    <EliteCard
                        player={topPlayers[1]}
                        isFocused={focusedRank === 2}
                        onMouseEnter={() => setFocusedRank(2)}
                    />

                    {/* Rank 1 */}
                    <div className="order-first lg:order-none">
                        <EliteCard
                            player={topPlayers[0]}
                            isFocused={focusedRank === 1}
                            onMouseEnter={() => setFocusedRank(1)}
                        />
                    </div>

                    {/* Rank 3 */}
                    <EliteCard
                        player={topPlayers[2]}
                        isFocused={focusedRank === 3}
                        onMouseEnter={() => setFocusedRank(3)}
                    />
                </div>

                {/* Lower Leaderboard & Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Global Rankings */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center gap-4 mb-8">
                            <Trophy className="text-cyan-400" size={24} />
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Global Rankings</h3>
                            <div className="h-px flex-1 bg-white/10" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {leaderboard.map((p, i) => (
                                <LeaderboardRow key={p.rank} player={p} index={i} />
                            ))}
                        </div>
                        <div className="mt-8">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-all"
                            >
                                Unlock Full Leaderboard
                            </motion.button>
                        </div>
                    </div>

                    {/* Online Right Now */}
                    <div className="lg:col-span-4 self-start sticky top-32">
                        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-3xl shadow-2xl">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight italic">Live Players</h3>
                                </div>
                                <span className="text-xs font-black text-white/40 italic">21/100</span>
                            </div>
                            <OnlineStatus />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
