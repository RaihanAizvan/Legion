import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Activity, Zap, Shield, Crown, Globe, Radio, Database, Heart, MessageSquare, Share2, Info, Swords, Trophy, Users, Terminal, Megaphone, Server } from 'lucide-react'
import { notices, activity, serverInfo, topPlayers, carouselSlides } from '../lib/constants'
import Carousel from './Carousel'

// Map carousel slides to the new Carousel component format
const CAROUSEL_ITEMS = carouselSlides.map((slide, i) => ({
    id: i,
    title: slide.title,
    description: slide.description,
    image: slide.image,
    icon: <Zap className="text-cyan-400" size={16} /> // Default icon
}))

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

function NoticeItem({ notice, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group cursor-pointer"
        >
            <div className={`w-1.5 rounded-full ${notice.badge === 'Important' ? 'bg-rose-500' : 'bg-violet-500'} opacity-30 group-hover:opacity-100 transition-opacity`} />
            <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${notice.badge === 'Important' ? 'text-rose-400' : 'text-violet-400'}`}>{notice.badge}</span>
                    <span className="text-[10px] font-bold text-white/20">{notice.date}</span>
                </div>
                <h4 className="text-sm font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{notice.title}</h4>
                <p className="text-xs text-white/40 line-clamp-1 mt-1 font-medium">{notice.content}</p>
            </div>
        </motion.div>
    )
}

function ActivityFeedItem({ item, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.01] border border-white/5 hover:bg-white/5 transition-all"
        >
            <img src={item.avatar} alt={item.player} className="w-8 h-8 rounded-lg border border-white/10" />
            <div className="flex-1 min-w-0">
                <div className="text-xs text-white truncate"><span className="font-black text-cyan-400">{item.player}</span> <span className="text-white/60 font-medium">{item.content}</span></div>
                <div className="text-[9px] text-white/20 font-bold uppercase">{item.time}</div>
            </div>
        </motion.div>
    )
}

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('notices')

    return (
        <section className="relative py-32 bg-[#050508] overflow-hidden">
            {/* Background Texture Logic */}
            <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 max-w-[1400px] relative z-10">

                {/* Dashboard Unified Header */}
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-8 border-b border-white/5 pb-10">
                    <div className="max-w-3xl">
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center gap-3 mb-4">
                            <span className="w-12 h-px bg-cyan-500/50" />
                            <span className="text-xs font-black text-cyan-400 uppercase tracking-[0.4em]">Operations Center</span>
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6 uppercase">
                            COMMAND <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 italic">DASHBOARD</span>
                        </h2>

                        {/* Emergency Ticker */}
                        <div className="flex items-center gap-4 py-2.5 px-4 rounded-xl bg-rose-500/5 border border-rose-500/10 max-w-fit">
                            <Radio size={14} className="text-rose-500 animate-pulse" />
                            <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Global Alert:</span>
                            <div className="overflow-hidden relative w-48 md:w-64">
                                <motion.div
                                    animate={{ x: ["100%", "-200%"] }}
                                    transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                                    className="text-[10px] font-bold text-white/40 uppercase whitespace-nowrap"
                                >
                                    Network upgrade in progress • Server reboot in 4h • Double Coins event active...
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-right hidden md:block">
                            <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Live Population</div>
                            <div className="text-3xl font-black text-white italic flex items-center gap-2 justify-end">
                                <Users size={20} className="text-cyan-500" /> {serverInfo.players} <span className="text-white/20 text-sm">/ {serverInfo.maxPlayers}</span>
                            </div>
                        </div>
                        <div className="h-12 w-px bg-white/10 mx-2 hidden md:block" />
                        <div className="p-1 rounded-2xl bg-white/5 border border-white/5 flex">
                            <button onClick={() => setActiveTab('notices')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'notices' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-white/40 hover:text-white'}`}>Notices</button>
                            <button onClick={() => setActiveTab('intel')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'intel' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-white/40 hover:text-white'}`}>Intel Feed</button>
                        </div>
                    </div>
                </div>

                {/* Main Bento Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

                    {/* Row 1: Carousel (Spans 8 cols) | Status (Spans 4 cols) */}
                    <div className="lg:col-span-8 h-[400px] md:h-[500px]">
                        <Carousel
                            items={CAROUSEL_ITEMS}
                            baseWidth={800} // This will be constrained by the parent col
                            autoplay={true}
                            autoplayDelay={5000}
                            pauseOnHover={true}
                            loop={true}
                        />
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Server Health Snippet */}
                        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 h-full flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-8">
                                <div className="text-lg font-black text-white uppercase tracking-tight italic flex items-center gap-2">
                                    <Server className="text-cyan-500" size={18} /> Engine Status
                                </div>
                                <Shield className="text-green-500" size={20} />
                            </div>
                            <div className="space-y-4">
                                <StatusWidget label="Core Skyblock" value="Nominal" health={99} icon={Globe} color="text-cyan-400" />
                                <StatusWidget label="BedWars Arena" value="Synced" health={96} icon={Radio} color="text-rose-400" />
                                <StatusWidget label="Survival World" value="98.2%" health={98} icon={Database} color="text-emerald-400" />
                                <StatusWidget label="Arcade Hub" value="Low Latency" health={100} icon={Zap} color="text-purple-400" />
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                <div className="text-[10px] font-black text-white/30 uppercase tracking-widest whitespace-nowrap">Uptime Tracking</div>
                                <div className="text-xs font-black text-green-500 uppercase">{serverInfo.uptime} Guaranteed</div>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Notices/Feed (Spans 8 cols) | Community Snapshot (Spans 4 cols) */}
                    <div className="lg:col-span-8">
                        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 h-full">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black text-white uppercase tracking-tight italic flex items-center gap-3">
                                    {activeTab === 'notices' ? <Megaphone className="text-violet-400" size={20} /> : <Activity className="text-cyan-400" size={20} />}
                                    {activeTab === 'notices' ? 'Operational Notices' : 'Regional Intel Feed'}
                                </h3>
                                <button className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] hover:text-white transition-colors">View All Archive</button>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >
                                    {activeTab === 'notices' ? (
                                        notices.map((n, i) => <NoticeItem key={i} notice={n} index={i} />)
                                    ) : (
                                        activity.map((a, i) => <ActivityFeedItem key={i} item={a} index={i} />)
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/10 h-full flex flex-col justify-between relative overflow-hidden group">
                            {/* Decorative Background Icon */}
                            <Trophy size={200} className="absolute -bottom-10 -right-10 text-white/[0.02] rotate-12 group-hover:rotate-0 transition-transform duration-1000" />

                            <div className="relative z-10">
                                <div className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em] mb-4">Elite Spotlight</div>
                                <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-6 italic">Season 4 <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">Hall of Glory</span></h3>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <img src={topPlayers[0].avatar} className="w-12 h-12 rounded-xl border border-white/20 shadow-2xl" />
                                        <div>
                                            <div className="text-sm font-black text-white uppercase tracking-tight">{topPlayers[0].name}</div>
                                            <div className="text-[9px] text-cyan-400 font-bold uppercase tracking-widest">Current Sovereign</div>
                                        </div>
                                    </div>
                                    <div className="h-px bg-white/5" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-[8px] font-black text-white/20 uppercase">Total Agents</div>
                                            <div className="text-lg font-black text-white tracking-widest">14.3K</div>
                                        </div>
                                        <div>
                                            <div className="text-[8px] font-black text-white/20 uppercase">Network Health</div>
                                            <div className="text-lg font-black text-green-500 tracking-widest">GOOD</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-widest mt-12 relative z-10"
                            >
                                Open Full Stats
                            </motion.button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
