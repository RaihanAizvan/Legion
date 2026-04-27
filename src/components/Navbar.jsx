import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Shield, Globe, ShoppingCart, MessageSquare, ExternalLink, Zap } from 'lucide-react'

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
        <header className="fixed top-6 inset-x-0 z-[100] px-4 md:px-8">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`
                    max-w-7xl mx-auto
                    rounded-[2rem] md:rounded-[3rem] 
                    transition-all duration-500 ease-out
                    border border-white/5 backdrop-blur-2xl
                    ${scrolled
                        ? 'py-3 bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/10'
                        : 'py-5 bg-white/[0.03]'
                    }
                `}
            >
                <div className="container mx-auto px-6 md:px-10 flex items-center justify-between">

                    {/* Logo Section */}
                    <Link to="/" className="group relative flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-[1px] group-hover:scale-110 transition-transform duration-500">
                            <div className="w-full h-full rounded-xl bg-black flex items-center justify-center">
                                <Zap size={20} className="text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl md:text-2xl font-black text-white tracking-widest uppercase group-hover:text-cyan-400 transition-colors">
                                LEGION
                            </span>
                            <span className="text-[7px] font-black tracking-[0.5em] text-white/30 uppercase -mt-1 group-hover:text-cyan-400/50 transition-colors">Commander</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-2">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                to={link.href}
                                className="relative px-6 py-2 group overflow-hidden"
                            >
                                <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-colors duration-300">
                                    {link.label}
                                </span>
                                {/* Hover background pill */}
                                <span className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" />
                                {/* Bottom indicator */}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-1/2" />
                            </Link>
                        ))}
                    </div>

                    {/* Action Hub */}
                    <div className="flex items-center gap-3">
                        {/* Status chip (desktop) */}
                        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mr-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">342 Online</span>
                        </div>

                        <Link
                            to="/play"
                            className="relative group px-8 py-3 rounded-2xl bg-white text-black text-xs font-black uppercase tracking-widest overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95"
                        >
                            <span className="relative z-10">Deploy</span>
                            {/* Animated scanning line */}
                            <motion.div
                                animate={{ x: ['-200%', '200%'] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-black/5 to-transparent skew-x-12 z-0"
                            />
                        </Link>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                        >
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                </div>
            </motion.nav>

            {/* Mobile Menu Modal */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        className="fixed inset-0 z-[90] lg:hidden bg-black/60 pt-32 px-6"
                    >
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="space-y-4"
                        >
                            {NAV_LINKS.map((link, i) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        to={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5 group active:bg-white/10 transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-cyan-400 group-hover:bg-cyan-400/10 transition-all">
                                                <link.icon size={24} />
                                            </div>
                                            <span className="text-xl font-black text-white uppercase tracking-tighter">{link.label}</span>
                                        </div>
                                        <ExternalLink size={20} className="text-white/20" />
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="pt-8"
                            >
                                <button className="w-full py-6 rounded-3xl bg-cyan-400 text-black font-black uppercase tracking-[0.2em] shadow-2xl shadow-cyan-400/20">
                                    Start Session
                                </button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}