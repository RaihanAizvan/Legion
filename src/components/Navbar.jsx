import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Shield, Globe, ShoppingCart, MessageSquare, Zap, Activity } from 'lucide-react'

const NAV_LINKS = [
    { label: "Home", href: "/", icon: Globe },
    { label: "Ranks", href: "/#ranks", icon: Shield },
    { label: "Community", href: "/#community", icon: MessageSquare },
    { label: "Store", href: "/store", icon: ShoppingCart },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header className="fixed top-0 inset-x-0 z-[100] transition-all duration-500">
            {/* Top Border Glow Line */}
            <motion.div
                animate={{ opacity: scrolled ? 1 : 0 }}
                className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-[1px]"
            />

            <div className="container mx-auto px-6 py-6 flex items-center justify-between pointer-events-none">

                {/* Island 1: Branding (Clipped Geometric) */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="pointer-events-auto"
                >
                    <Link to="/" className="group flex items-center gap-4 px-6 py-3 bg-black/40 backdrop-blur-xl border border-white/10 [clip-path:polygon(0%_0%,100%_0%,90%_100%,0%_100%)] relative overflow-hidden">
                        {/* Background Scanline */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                        <div className="flex items-center gap-2">
                            <Zap size={18} className="text-cyan-400 group-hover:scale-125 transition-transform" />
                            <span className="text-xl font-black text-white uppercase tracking-[0.2em]">LEGION</span>
                        </div>
                    </Link>
                </motion.div>

                {/* Island 2: Navigation (Modular Floating) */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="hidden lg:flex items-center gap-1 p-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl pointer-events-auto shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                >
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            to={link.href}
                            className="relative px-6 py-2 group hover:text-cyan-400 transition-colors"
                        >
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-colors">
                                {link.label}
                            </span>
                            {/* Geometric Under-indicator */}
                            <motion.div
                                className="absolute bottom-0 left-2 right-2 h-0.5 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform"
                                style={{ borderRadius: '2px 2px 0 0' }}
                            />
                        </Link>
                    ))}
                </motion.div>

                {/* Island 3: Actions (Clipped Utility) */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex items-center gap-4 pointer-events-auto"
                >
                    <div className="hidden md:flex items-center gap-4 px-6 py-3 bg-black/40 backdrop-blur-xl border border-white/10 [clip-path:polygon(10%_0%,100%_0%,100%_100%,0%_100%)]">
                        <div className="flex items-center gap-2">
                            <Activity size={12} className="text-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">Core Synchronized</span>
                        </div>
                        <div className="w-px h-3 bg-white/20" />
                        <Link to="/play" className="text-[10px] font-black text-white hover:text-cyan-400 transition-colors uppercase tracking-widest">
                            Deploy Engine
                        </Link>
                    </div>

                    {/* Compact Play Button */}
                    <Link to="/play" className="w-12 h-12 flex items-center justify-center bg-cyan-500 hover:bg-white text-black transition-all hover:scale-110 active:scale-95 [clip-path:polygon(20%_0%,100%_0%,80%_100%,0%_100%)] shadow-lg shadow-cyan-500/20">
                        <Zap size={20} fill="currentColor" />
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </motion.div>

            </div>

            {/* Matrix Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="lg:hidden absolute top-24 inset-x-6 bg-[#0A0A0F]/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 overflow-hidden shadow-2xl"
                    >
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />

                        <div className="space-y-6 relative z-10">
                            {NAV_LINKS.map((link, i) => (
                                <Link
                                    key={link.label}
                                    to={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-6 group"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-cyan-400 group-hover:bg-cyan-400/10 transition-all">
                                        <link.icon size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-white/30 uppercase tracking-[0.2em]">{link.label}</span>
                                        <span className="text-xl font-black text-white uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">Access Portal</span>
                                    </div>
                                </Link>
                            ))}

                            <hr className="border-white/5 my-8" />

                            <button className="w-full py-5 bg-cyan-500 text-black font-black uppercase tracking-[0.2em] rounded-2xl [clip-path:polygon(5%_0%,100%_0%,95%_100%,0%_100%)] active:scale-95 transition-transform">
                                Connect to Terminal
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}