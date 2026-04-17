import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageSquare, User, Calendar, BarChart2, Heart, Share2 } from 'lucide-react'
import { events, threads, profilePosts, stats } from '../lib/constants'

const EVENT_COLORS = {
    orange: 'border-orange-500 text-orange-300 bg-orange-900/20',
    blue: 'border-blue-500 text-blue-300 bg-blue-900/20',
    green: 'border-green-500 text-green-300 bg-green-900/20',
    purple: 'border-purple-500 text-purple-300 bg-purple-900/20',
}

const STAT_COLORS = ['text-blue-400', 'text-violet-400', 'text-cyan-400', 'text-pink-400']

function StatCounter({ value, label, colorClass }) {
    return (
        <div className="text-center">
            <div className={`font-display font-black text-3xl ${colorClass}`}>{value}</div>
            <div className="text-white/40 text-xs mt-1">{label}</div>
        </div>
    )
}

export default function Events() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section ref={ref} className="relative py-24 mesh-bg overflow-hidden">
            <div className="absolute top-0 left-0 right-0 section-divider" />
            <div className="absolute inset-0 grid-pattern opacity-10" />

            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-xs tracking-widest text-blue-400 uppercase font-semibold">Community Hub</span>
                    <h2 className="font-display font-bold text-4xl text-white mt-2">What's Happening</h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Latest Threads */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="flex items-center space-x-2 mb-4">
                            <MessageSquare size={18} className="text-blue-400" />
                            <h3 className="font-display font-bold text-lg text-white">Latest Threads</h3>
                        </div>
                        <div className="space-y-3">
                            {threads.map((t, i) => (
                                <div key={i} className="glass-card-hover p-4">
                                    <h4 className="font-semibold text-white text-sm mb-2">{t.title}</h4>
                                    <div className="flex justify-between text-xs text-white/40">
                                        <span className="flex items-center gap-1"><User size={11} /> {t.author}</span>
                                        <span className="flex items-center gap-1"><MessageSquare size={11} /> {t.replies}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a href="/forums" className="block mt-4 text-center py-2 glass-card text-white/60 hover:text-white text-sm font-medium transition-colors hover:bg-white/10">
                            View All Threads →
                        </a>
                    </motion.div>

                    {/* Profile Posts */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="flex items-center space-x-2 mb-4">
                            <User size={18} className="text-violet-400" />
                            <h3 className="font-display font-bold text-lg text-white">Profile Posts</h3>
                        </div>
                        <div className="space-y-3">
                            {profilePosts.map((p, i) => (
                                <div key={i} className="glass-card p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <img src={p.avatar} alt={p.player} className="w-8 h-8 rounded" />
                                        <div>
                                            <div className="font-semibold text-white text-sm">{p.player}</div>
                                            <div className="text-white/30 text-xs">{p.time}</div>
                                        </div>
                                    </div>
                                    <p className="text-white/60 text-xs leading-relaxed mb-2">{p.content}</p>
                                    <div className="flex gap-4 text-white/30 text-xs">
                                        <button className="flex items-center gap-1 hover:text-pink-400 transition-colors"><Heart size={12} /> {p.likes}</button>
                                        <button className="flex items-center gap-1 hover:text-blue-400 transition-colors"><MessageSquare size={12} /> {p.comments}</button>
                                        <button className="flex items-center gap-1 hover:text-violet-400 transition-colors ml-auto"><Share2 size={12} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Upcoming Events + Server Stats */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <div className="flex items-center space-x-2 mb-4">
                                <Calendar size={18} className="text-orange-400" />
                                <h3 className="font-display font-bold text-lg text-white">Upcoming Events</h3>
                            </div>
                            <div className="space-y-3">
                                {events.map((e, i) => (
                                    <div key={i} className={`glass-card border-l-2 p-3 ${EVENT_COLORS[e.color]}`}>
                                        <div className="flex justify-between items-center mb-1">
                                            <h4 className="font-semibold text-white text-sm">{e.title}</h4>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${EVENT_COLORS[e.color]}`}>{e.date}</span>
                                        </div>
                                        <p className="text-white/50 text-xs">{e.description}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Server Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="flex items-center space-x-2 mb-4">
                                <BarChart2 size={18} className="text-cyan-400" />
                                <h3 className="font-display font-bold text-lg text-white">Server Statistics</h3>
                            </div>
                            <div className="glass-card p-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <StatCounter value={stats.registeredPlayers} label="Registered Players" colorClass={STAT_COLORS[0]} />
                                    <StatCounter value={stats.onlineToday} label="Online Today" colorClass={STAT_COLORS[1]} />
                                    <StatCounter value={stats.forumPosts} label="Forum Posts" colorClass={STAT_COLORS[2]} />
                                    <StatCounter value={stats.blocksPlaced} label="Blocks Placed" colorClass={STAT_COLORS[3]} />
                                </div>
                                <div className="mt-5">
                                    <div className="flex justify-between text-xs text-white/40 mb-1">
                                        <span>Uptime this month</span>
                                        <span>99%</span>
                                    </div>
                                    <div className="w-full bg-white/5 rounded-full h-1.5">
                                        <div className="h-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-400" style={{ width: '99%' }} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
