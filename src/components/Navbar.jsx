import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Shield, Globe, ShoppingCart, MessageSquare, Zap, Target, Cpu, Wifi } from 'lucide-react'

const NAV_LINKS = [
    { label: "Alpha", href: "/", icon: Globe },
    { label: "Intel", href: "/#ranks", icon: Shield },
    { label: "Sector", href: "/#community", icon: MessageSquare },
    { label: "Market", href: "/store", icon: ShoppingCart },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header className="fixed top-0 inset-x-0 z-[100] px-6 py-8 pointer-events-none">
            <div className="max-w-[1600px] mx-auto flex items-center justify-between">

                {/* HUD Left: System Branding */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex items-center gap-6 pointer-events-auto"
                >
                    <div className="relative group">
                        {/* Corner Brackets */}
                        <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50 group-hover:border-cyan-400 group-hover:-top-3 group-hover:-left-3 transition-all" />
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50 group-hover:border-cyan-400 group-hover:-bottom-3 group-hover:-right-3 transition-all" />

                        <Link to="/" className="flex flex-col p-2 bg-white/[0.02] border border-white/5 backdrop-blur-md">
                            <div className="flex items-center gap-2">
                                <Zap size={14} className="text-cyan-400" />
                                <span className="text-lg font-black text-white tracking-[0.3em] uppercase">LEGION.SYS</span>
                            </div>
                            <div className="flex items-center justify-between mt-1 px-1">
                                <span className="text-[6px] font-black text-white/20 uppercase tracking-widest">VER: 4.0.8.2</span>
                                <span className="text-[6px] font-black text-emerald-500 uppercase tracking-widest">ENCRYPTED</span>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden md:flex flex-col gap-1 border-l border-white/10 pl-6">
                        <div className="flex items-center gap-2">
                            <Cpu size={10} className="text-white/30" />
                            <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">SVR_LOAD: 14.2%</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Wifi size={10} className="text-white/30" />
                            <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">LATENCY: 12MS</span>
                        </div>
                    </div>
                </motion.div>

                {/* HUD Center: Tactical Navigation (Floating Ghost Line) */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="hidden lg:flex items-center gap-12 pointer-events-auto px-12 py-3 relative"
                >
                    {/* Atmospheric Grid Background */}
                    <div className="absolute inset-x-0 h-px bg-white/10 top-1/2 -translate-y-1/2" />

                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            to={link.href}
                            className="relative group py-2"
                        >
                            <div className="flex flex-col items-center">
                                <span className="text-[8px] font-black text-cyan-500/50 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">0{NAV_LINKS.indexOf(link) + 1}</span>
                                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-all duration-300">
                                    {link.label}
                                </span>
                            </div>

                            {/* Hover Scan Bracket */}
                            <motion.div
                                className="absolute -inset-x-2 -inset-y-1 border border-cyan-500 opacity-0 group-hover:opacity-30 scale-110 group-hover:scale-100 transition-all"
                                style={{ borderRadius: '2px' }}
                            />
                        </Link>
                    ))}
                </motion.div>

                {/* HUD Right: Mission Controls */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex items-center gap-8 pointer-events-auto"
                >
                    <div className="hidden xl:flex flex-col items-end gap-1 text-right">
                        <div className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Sector 04 // Delta</div>
                        <div className="text-[8px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                            <Target size={10} />
                            Active Personnel: 1,429
                        </div>
                    </div>

                    <Link
                        to="/play"
                        className="relative group p-1 bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden"
                    >
                        <div className="px-10 py-3 bg-white text-black font-black uppercase text-[11px] tracking-[0.4em] relative z-10 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                            Connect
                        </div>
                        <div className="absolute inset-0 border border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>

                    {/* Mobile HUD Toggle */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden w-12 h-12 flex items-center justify-center border border-white/10 bg-white/[0.02] text-white hover:text-cyan-400 transition-colors"
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </motion.div>

            </div>

            {/* Tactical Mobile Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 150 }}
                        className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-[#020203]/95 backdrop-blur-2xl z-[150] border-l border-white/10 p-12 lg:hidden flex flex-col pointer-events-auto"
                    >
                        <div className="flex items-center justify-between mb-20">
                            <div className="text-2xl font-black text-white italic uppercase tracking-tighter">System Console</div>
                            <button onClick={() => setMenuOpen(false)} className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full text-white/50 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-4 flex-1">
                            {NAV_LINKS.map((link, i) => (
                                <Link
                                    key={link.label}
                                    to={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center justify-between group p-6 border-b border-white/5 hover:bg-white/[0.02]"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-cyan-500/40 uppercase tracking-[0.3em]">Module 0{i + 1}</span>
                                        <span className="text-3xl font-black text-white uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">{link.label}</span>
                                    </div>
                                    <motion.div
                                        animate={{ opacity: [0.2, 1, 0.2] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="text-white/20"
                                    >
                                        &gt;&gt;
                                    </motion.div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-auto space-y-6">
                            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                                <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-4">Diagnostics</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-[8px] font-black text-emerald-500 uppercase">SYS_HEAT: 34°C</div>
                                    <div className="text-[8px] font-black text-cyan-500 uppercase">THROUGHPUT: 1.2GB/S</div>
                                </div>
                            </div>
                            <button className="w-full py-6 bg-white text-black font-black uppercase text-xs tracking-[0.3em] hover:bg-cyan-400 transition-colors">
                                Authenticate Payload
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}