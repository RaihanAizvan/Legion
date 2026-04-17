import { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ChevronLeft, ChevronRight, Activity, Bell, Server, Zap, Shield, Crown } from 'lucide-react'
import { carouselSlides, serverInfo, topPlayers, features, notices, activity } from '../lib/constants'

// Bento Grid Animation Container
function BentoCard({ children, className, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay }}
            className={`bento-card flex flex-col ${className}`}
        >
            {children}
        </motion.div>
    )
}

function FeaturedSlideCard() {
    const [current, setCurrent] = useState(0)
    const total = carouselSlides.length

    useEffect(() => {
        const timer = setInterval(() => setCurrent(p => (p + 1) % total), 4000)
        return () => clearInterval(timer)
    }, [total])

    const slide = carouselSlides[current]

    return (
        <BentoCard className="bento-card-large group p-0 relative min-h-[350px] lg:min-h-full" delay={0.1}>
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold rounded-full mb-3 inline-block">
                    Featured
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">{slide.title}</h2>
                <p className="text-white/60 text-sm max-w-md">{slide.description}</p>

                <div className="flex gap-2 mt-4">
                    {carouselSlides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-cyan-400' : 'w-2 bg-white/20'}`}
                        />
                    ))}
                </div>
            </div>
        </BentoCard>
    )
}

function StatusCard() {
    return (
        <BentoCard className="bento-card-medium bg-gradient-to-br from-blue-900/40 to-[#050508]" delay={0.2}>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                        <Server size={18} className="text-blue-400" />
                        Live Status
                    </h3>
                    <p className="text-white/40 text-xs mt-1">Network currently operating nominally.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 text-green-400 rounded text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Online
                </div>
            </div>

            <div className="space-y-4 flex-1 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                    <div className="text-3xl font-display font-black text-white">{serverInfo.players}</div>
                    <div className="text-white/40 text-sm mb-1">/ {serverInfo.maxPlayers} Players</div>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(serverInfo.players / serverInfo.maxPlayers) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    />
                </div>
                <div className="flex justify-between text-xs text-white/30">
                    <span>Uptime: {serverInfo.uptime}</span>
                    <span>Ping: 24ms</span>
                </div>
            </div>
        </BentoCard>
    )
}

function PodiumCard() {
    const p1 = topPlayers[0]
    return (
        <BentoCard className="bento-card-tall border-t-2 border-t-yellow-500/50" delay={0.3}>
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2 mb-6">
                <Crown size={18} className="text-yellow-400" />
                Season MVP
            </h3>

            <div className="flex flex-col items-center flex-1 justify-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="relative mb-4">
                    <img src={p1.avatar} alt={p1.name} className="w-20 h-20 rounded-full border-2 border-yellow-500/50 relative z-10" />
                    <span className="absolute -bottom-2 -left-2 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded z-20">#1</span>
                </div>

                <h4 className="font-display font-bold text-white text-xl">{p1.name}</h4>
                <div className="text-yellow-400/80 text-sm font-semibold mb-6">Level {p1.level}</div>

                <div className="grid grid-cols-2 gap-2 w-full text-center">
                    <div className="bg-white/5 p-2 rounded">
                        <div className="text-white/40 text-xs mb-1">Kills</div>
                        <div className="text-white font-semibold text-sm">{p1.kills}</div>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <div className="text-white/40 text-xs mb-1">Win Rate</div>
                        <div className="text-white font-semibold text-sm">{p1.winRate}</div>
                    </div>
                </div>
            </div>
        </BentoCard>
    )
}

function NoticeCard() {
    return (
        <BentoCard className="bento-card-hero overflow-hidden" delay={0.4}>
            <div className="flex flex-col md:flex-row h-full">
                {/* Left: Notices */}
                <div className="md:w-1/2 pr-0 md:pr-6 md:border-r border-white/5 mb-6 md:mb-0">
                    <h3 className="font-display font-bold text-lg text-white flex items-center gap-2 mb-6">
                        <Bell size={18} className="text-violet-400" />
                        Recent Notices
                    </h3>
                    <div className="space-y-4">
                        {notices.slice(0, 2).map((n, i) => (
                            <div key={i} className="flex gap-4 group cursor-pointer">
                                <div className="w-1.5 rounded bg-violet-500/30 group-hover:bg-violet-400 transition-colors" />
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold text-violet-400">{n.badge}</span>
                                        <span className="text-xs text-white/30">• {n.date}</span>
                                    </div>
                                    <h4 className="font-semibold text-white/90 text-sm group-hover:text-white transition-colors">{n.title}</h4>
                                    <p className="text-white/50 text-xs mt-1 line-clamp-1">{n.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Activity */}
                <div className="md:w-1/2 pl-0 md:pl-6">
                    <h3 className="font-display font-bold text-lg text-white flex items-center gap-2 mb-6">
                        <Activity size={18} className="text-pink-400" />
                        Live Feed
                    </h3>
                    <div className="space-y-3">
                        {activity.slice(0, 3).map((a, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 rounded hover:bg-white/5 transition-colors">
                                <img src={a.avatar} alt={a.player} className="w-8 h-8 rounded" />
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm text-white truncate"><span className="font-semibold">{a.player}</span> <span className="text-white/60">{a.content}</span></div>
                                    <div className="text-xs text-white/30">{a.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </BentoCard>
    )
}

function FeatureSmallCard({ feature, index }) {
    const Icon = feature.icon === 'Zap' ? Zap : Shield; // Simplified mapping
    return (
        <BentoCard className="bento-card-small justify-center items-center text-center p-4 bg-gradient-to-br from-white/5 to-transparent" delay={0.5 + (index * 0.1)}>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3 text-cyan-400">
                <Icon size={20} />
            </div>
            <h4 className="font-semibold text-white text-sm mb-1">{feature.title}</h4>
            <p className="text-[10px] text-white/40 leading-tight">{feature.description}</p>
        </BentoCard>
    )
}

export default function Dashboard() {
    return (
        <section className="relative py-24 pb-48 z-10">
            <div className="container mx-auto px-4 max-w-[1200px]">
                <div className="bento-grid">
                    <FeaturedSlideCard />
                    <PodiumCard />
                    <StatusCard />
                    <FeatureSmallCard feature={features[0]} index={0} />
                    <FeatureSmallCard feature={features[1]} index={1} />
                    <NoticeCard />
                </div>
            </div>
        </section>
    )
}
