import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Bell, Activity, Heart, MessageSquare, Share2, Info } from 'lucide-react'
import { notices, activity } from '../lib/constants'

export default function NoticeBoard() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section ref={ref} className="relative py-24 bg-[#050508] overflow-hidden">
            <div className="absolute top-0 left-0 right-0 section-divider" />
            <div className="absolute inset-0 grid-pattern opacity-10" />
            <div className="absolute left-20 top-20 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-xs tracking-widest text-violet-400 uppercase font-semibold">Server Notices</span>
                    <h2 className="font-display font-bold text-4xl text-white mt-2">Announcements & Activity</h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Notice Board (2/3 width) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-2"
                    >
                        <div className="glass-card overflow-hidden">
                            <div className="flex items-center space-x-2 p-5 border-b border-white/10">
                                <Bell size={18} className="text-violet-400" />
                                <h3 className="font-display font-bold text-lg text-white">Notice Board</h3>
                            </div>
                            <div className="p-5 space-y-4">
                                {notices.map((n, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={inView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                                        className="bg-white/3 border border-white/10 rounded-xl p-5 border-l-2 border-l-violet-500"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <h4 className="font-display font-bold text-white">{n.title}</h4>
                                            <span className="text-xs bg-violet-500/20 text-violet-300 border border-violet-500/30 px-2 py-0.5 rounded-full flex-shrink-0 ml-3">
                                                {n.badge}
                                            </span>
                                        </div>
                                        <p className="text-white/60 text-sm leading-relaxed mb-3">{n.content}</p>
                                        <div className="flex justify-between text-xs text-white/30">
                                            <span>Posted by {n.author}</span>
                                            <span>{n.date}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Latest Activity (1/3 width) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="glass-card overflow-hidden h-full">
                            <div className="flex items-center justify-between p-5 border-b border-white/10">
                                <div className="flex items-center space-x-2">
                                    <Activity size={18} className="text-green-400" />
                                    <h3 className="font-display font-bold text-lg text-white">Latest Activity</h3>
                                </div>
                                <span className="text-xs bg-green-500/20 text-green-300 border border-green-500/30 px-2 py-0.5 rounded-full">
                                    5 New
                                </span>
                            </div>
                            <div className="p-4 space-y-3">
                                {activity.map((a, i) => (
                                    <div key={i} className="bg-white/3 border border-white/10 rounded-xl p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <img src={a.avatar} alt={a.player} className="w-8 h-8 rounded" />
                                                <div>
                                                    <div className="font-semibold text-white text-sm">{a.player}</div>
                                                    <div className="text-white/30 text-xs">{a.time}</div>
                                                </div>
                                            </div>
                                            <button className="text-white/20 hover:text-white/60 p-1 transition-colors">
                                                <Info size={14} />
                                            </button>
                                        </div>
                                        <p className="text-white/60 text-sm mb-3">{a.content}</p>
                                        <div className="flex items-center gap-4 text-white/30 text-xs">
                                            <button className="flex items-center gap-1 hover:text-pink-400 transition-colors"><Heart size={12} /> {a.likes}</button>
                                            <button className="flex items-center gap-1 hover:text-blue-400 transition-colors"><MessageSquare size={12} /> {a.comments}</button>
                                            <button className="flex items-center gap-1 hover:text-violet-400 transition-colors ml-auto"><Share2 size={12} /></button>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full py-3 glass-card text-white/50 hover:text-white text-sm font-medium transition-colors hover:bg-white/10 flex items-center justify-center gap-2">
                                    <span>View More Posts</span>
                                    <span>↓</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
