import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Activity, Heart, MessageSquare, Share2, Info, Radio, Zap, ShieldCheck, Globe, Calendar, Megaphone, Terminal } from 'lucide-react'
import { notices, activity } from '../lib/constants'

function StatusWidget({ label, value, health, icon: Icon, color }) {
    return (
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all group/status">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg bg-white/5 ${color} group-hover/status:scale-110 transition-transform`}>
                        <Icon size={14} />
                    </div>
                    <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">{label}</span>
                </div>
                <div className="text-xs font-black text-white">{value}</div>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${health}%` }}
                    className={`h-full bg-gradient-to-r from-cyan-500 to-blue-500`}
                />
            </div>
        </div>
    )
}

function NoticeCard({ notice, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all overflow-hidden"
        >
            {/* Background Icon */}
            <div className="absolute -right-8 -bottom-8 opacity-[0.03] pointer-events-none group-hover:opacity-[0.07] transition-opacity">
                <Bell size={120} />
            </div>

            <div className="flex items-start justify-between mb-6 relative z-10">
                <div className="p-3 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
                    <Megaphone size={20} />
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">{notice.date}</span>
                    <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-400 text-[10px] font-black uppercase border border-violet-500/30">
                        {notice.badge}
                    </span>
                </div>
            </div>

            <div className="relative z-10 mb-8">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-3 group-hover:text-violet-400 transition-colors">
                    {notice.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed line-clamp-3">
                    {notice.content}
                </p>
            </div>

            <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/40">
                        {notice.author?.[0] || 'A'}
                    </div>
                    <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">Authored by <span className="text-white/60">{notice.author}</span></div>
                </div>
                <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/20 hover:text-white">
                    <Info size={16} />
                </button>
            </div>
        </motion.div>
    )
}

function FeedItem({ item, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <img src={item.avatar} alt={item.player} className="w-10 h-10 rounded-xl border border-white/5 group-hover:scale-105 transition-transform" />
                    <div>
                        <div className="text-sm font-black text-white tracking-tight">{item.player}</div>
                        <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{item.time}</div>
                    </div>
                </div>
                <div className="px-2 py-1 rounded-md bg-green-500/10 text-green-500 text-[8px] font-black uppercase tracking-widest">
                    Live
                </div>
            </div>

            <p className="text-xs text-white/60 leading-relaxed mb-4 italic">
                "{item.content}"
            </p>

            <div className="flex items-center gap-6">
                <button className="flex items-center gap-1.5 text-[10px] font-black text-white/20 hover:text-rose-500 transition-colors">
                    <Heart size={12} /> {item.likes}
                </button>
                <button className="flex items-center gap-1.5 text-[10px] font-black text-white/20 hover:text-blue-500 transition-colors">
                    <MessageSquare size={12} /> {item.comments}
                </button>
                <button className="ml-auto text-white/10 hover:text-white transition-colors">
                    <Share2 size={12} />
                </button>
            </div>
        </motion.div>
    )
}

export default function NoticeBoard() {
    const [activeTab, setActiveTab] = useState('announcements')
    const ref = useRef(null)

    return (
        <section ref={ref} className="relative py-32 bg-[#050508] overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-violet-900/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10">

                {/* Modern Header Tier */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-3xl">
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center gap-3 mb-4">
                            <span className="w-12 h-px bg-violet-500/50" />
                            <span className="text-xs font-black text-violet-400 uppercase tracking-[0.4em]">Intelligence Bureau</span>
                        </motion.div>
                        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.8] mb-6 uppercase">
                            COMMAND <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-600">CENTER</span>
                        </h2>
                        <div className="flex items-center gap-4 py-2 px-4 rounded-xl bg-violet-500/5 border border-violet-500/10 max-w-fit">
                            <Radio size={14} className="text-violet-500 animate-pulse" />
                            <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest whitespace-nowrap">Emergency Ticker:</span>
                            <div className="overflow-hidden relative flex-1">
                                <motion.div
                                    animate={{ x: ["100%", "-200%"] }}
                                    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                                    className="text-[10px] font-bold text-white/40 uppercase whitespace-nowrap"
                                >
                                    New patch (v1.4.2) scheduled for 22:00 PST tonight • Double XP weekend starts in 48 hours • Maintenance alert...
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
                            <button
                                onClick={() => setActiveTab('announcements')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'announcements' ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/20' : 'text-white/40 hover:text-white'}`}
                            >
                                <Megaphone size={14} /> Announcements
                            </button>
                            <button
                                onClick={() => setActiveTab('patch')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'patch' ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/20' : 'text-white/40 hover:text-white'}`}
                            >
                                <Terminal size={14} /> Patch Notes
                            </button>
                        </div>
                        <div className="text-[9px] font-black text-white/20 uppercase tracking-widest italic pr-2">Updates applied in Real-time</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Feed */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {notices.map((n, i) => (
                                <NoticeCard key={i} notice={n} index={i} />
                            ))}
                        </div>
                        {/* Featured Event Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="p-1 rounded-[2.5rem] bg-gradient-to-r from-violet-600/30 via-indigo-600/30 to-blue-600/30"
                        >
                            <div className="p-8 md:p-12 rounded-[2.4rem] bg-[#0A0A0F] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full" />

                                <div className="relative z-10 text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                                        <Calendar className="text-indigo-400" size={24} />
                                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">Upcoming Operation</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4 leading-none">
                                        THE LEGION <br /> <span className="text-indigo-500">TOURNAMENT</span>
                                    </h2>
                                    <p className="text-white/40 text-sm max-w-sm mb-8">
                                        Register your squadron for the first regional SkyBlock championship. Over $5,000 in rewards and seasonal prestige titles up for grabs.
                                    </p>
                                    <button className="px-10 py-4 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-indigo-400 transition-colors">
                                        Sign Up Now
                                    </button>
                                </div>

                                <div className="relative z-10 flex flex-col items-center justify-center gap-2 p-10 rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-3xl min-w-[200px]">
                                    <div className="text-5xl font-black text-white">48h</div>
                                    <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Remaining</div>
                                    <div className="w-12 h-1 bg-indigo-500 rounded-full mt-4" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar Roster & Stats */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Server Status Hub */}
                        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 relative overflow-hidden">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2 text-white font-black uppercase tracking-tight text-lg italic">
                                    <Zap className="text-cyan-400" size={18} /> Engine Status
                                </div>
                                <ShieldCheck className="text-green-500" size={20} />
                            </div>
                            <div className="space-y-4">
                                <StatusWidget label="Core SkyBlock" value="99.9%" health={99.9} icon={Globe} color="text-cyan-400" />
                                <StatusWidget label="BedWars Arena" value="Synced" health={95} icon={Radio} color="text-blue-400" />
                                <StatusWidget label="Database Latency" value="12ms" health={88} icon={Zap} color="text-purple-400" />
                            </div>
                        </div>

                        {/* Recent Activity Feed */}
                        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2 text-white font-black uppercase tracking-tight text-lg italic">
                                    <Activity className="text-green-400" size={18} /> Intel Feed
                                </div>
                                <span className="text-[10px] font-black text-green-500 uppercase tracking-widest animate-pulse">Live</span>
                            </div>
                            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
                                {activity.map((a, i) => (
                                    <FeedItem key={i} item={a} index={i} />
                                ))}
                            </div>
                            <button className="w-full mt-6 py-4 rounded-2xl border border-white/5 text-[10px] font-black text-white/20 uppercase tracking-widest hover:border-white/20 hover:text-white/40 transition-all">
                                Load Older Intel
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
