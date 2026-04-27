import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, Shield, Globe, ShoppingCart, MessageSquare, Zap } from 'lucide-react'

const NAV_LINKS = [
    { label: "Home", href: "/", icon: Globe },
    { label: "Ranks", href: "/#ranks", icon: Shield },
    { label: "Community", href: "/#community", icon: MessageSquare },
    { label: "Store", href: "/store", icon: ShoppingCart },
]

export default function Navbar() {
    const [visible, setVisible] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious()

        // Conditions:
        // 1. Not in first section (latest > 500)
        // 2. Scrolling UP (latest < previous)
        if (latest > 500 && latest < previous) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    })

    return (
        <>
            <AnimatePresence>
                {visible && (
                    <motion.header
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-6 inset-x-0 z-[100] px-4 md:px-8"
                    >
                        <nav className="max-w-5xl mx-auto rounded-[2.5rem] bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                            <div className="px-8 py-4 flex items-center justify-between">

                                <Link to="/" className="flex items-center gap-3 group">
                                    <Zap size={20} className="text-cyan-400" />
                                    <span className="text-xl font-black text-white uppercase tracking-widest">LEGION</span>
                                </Link>

                                <div className="hidden md:flex items-center gap-1">
                                    {NAV_LINKS.map((link) => (
                                        <Link
                                            key={link.label}
                                            to={link.href}
                                            className="px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors relative group"
                                        >
                                            {link.label}
                                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-400 group-hover:w-4 transition-all" />
                                        </Link>
                                    ))}
                                </div>

                                <div className="flex items-center gap-3">
                                    <Link to="/play" className="px-6 py-2.5 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-cyan-400 transition-colors">
                                        Deploy
                                    </Link>

                                    <button
                                        onClick={() => setMenuOpen(!menuOpen)}
                                        className="lg:hidden p-2 text-white/50 hover:text-white"
                                    >
                                        <Menu size={20} />
                                    </button>
                                </div>
                            </div>
                        </nav>
                    </motion.header>
                )}
            </AnimatePresence>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-8 lg:hidden"
                    >
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="absolute top-10 right-10 p-4 text-white/30 hover:text-white transition-colors"
                        >
                            <X size={32} />
                        </button>

                        <div className="space-y-8 w-full max-w-sm text-center">
                            {NAV_LINKS.map((link, i) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        to={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="text-4xl font-black text-white uppercase tracking-tighter hover:text-cyan-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="pt-8"
                            >
                                <button className="w-full py-6 rounded-3xl bg-cyan-400 text-black font-black uppercase tracking-[0.2em]">
                                    Direct Connect
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}