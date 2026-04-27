import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Ranks", href: "/#ranks" },
    { label: "Community", href: "/#community" },
    { label: "Store", href: "/store" },
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
        <header className={`fixed top-0 inset-x-0 z-[100] transition-all duration-700 ${scrolled ? 'py-4 bg-black/40 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
            <div className="container mx-auto px-8 max-w-[1400px]">
                <div className="flex items-center justify-between">

                    {/* Minimalist Logo */}
                    <Link to="/" className="group flex items-center relative">
                        <span className="text-xl font-black text-white uppercase tracking-[0.4em] group-hover:text-cyan-400 transition-colors duration-500">
                            LEGION
                        </span>
                        <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-700 ease-out" />
                    </Link>

                    {/* Refined Navigation */}
                    <div className="hidden lg:flex items-center gap-12">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                to={link.href}
                                className="relative group overflow-hidden py-1"
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-all duration-500">
                                    {link.label}
                                </span>
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-out opacity-20" />
                            </Link>
                        ))}
                    </div>

                    {/* Minimalist Action */}
                    <div className="flex items-center gap-8">
                        <Link
                            to="/play"
                            className="hidden sm:block text-[10px] font-black uppercase tracking-[0.4em] text-white/50 hover:text-white transition-all relative group"
                        >
                            <span>Join Alpha</span>
                            <span className="absolute -right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                        </Link>

                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden w-8 h-8 flex flex-col items-end justify-center gap-1.5 group"
                        >
                            <span className={`h-[1px] bg-white transition-all duration-300 ${menuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'}`} />
                            <span className={`h-[1px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0 w-0' : 'w-4'}`} />
                            <span className={`h-[1px] bg-white transition-all duration-300 ${menuOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-5'}`} />
                        </button>
                    </div>

                </div>
            </div>

            {/* Ultra-Minimal Overlay Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[150] bg-black backdrop-blur-3xl flex flex-col items-center justify-center lg:hidden"
                    >
                        <button onClick={() => setMenuOpen(false)} className="absolute top-10 right-10 text-white/40 hover:text-white transition-colors">
                            <X size={32} strokeWidth={1} />
                        </button>

                        <div className="flex flex-col items-center gap-12">
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
                                        className="text-4xl font-black text-white/20 hover:text-white uppercase tracking-tighter transition-all italic hover:scale-110"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-12"
                            >
                                <Link to="/play" className="text-xs font-black uppercase tracking-[0.5em] text-cyan-400">
                                    Start Session —&gt;
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}