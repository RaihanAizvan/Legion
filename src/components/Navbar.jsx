import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Plus } from 'lucide-react'

const NAV_LINKS = [
    { label: "Base", href: "/" },
    { label: "Tiers", href: "/#ranks" },
    { label: "Forum", href: "/#community" },
    { label: "Vault", href: "/store" },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 border-b ${scrolled ? 'py-3 bg-black/60 backdrop-blur-2xl border-white/10' : 'py-5 bg-transparent border-transparent'}`}>
            <div className="container mx-auto px-6 max-w-[1500px]">
                <div className="flex items-center justify-between">

                    {/* Flush Branding */}
                    <Link to="/" className="group flex items-center gap-2">
                        <span className="text-lg font-black text-white uppercase tracking-[0.2em] transition-all group-hover:tracking-[0.4em]">
                            LEGION
                        </span>
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>

                    {/* Integrated Navigation */}
                    <div className="hidden lg:flex items-center gap-10">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                to={link.href}
                                className="relative py-1 group overflow-hidden"
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-all duration-300">
                                    {link.label}
                                </span>
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right group-hover:origin-left" />
                            </Link>
                        ))}
                    </div>

                    {/* Flush Utils */}
                    <div className="flex items-center gap-6">
                        <Link
                            to="/play"
                            className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60 hover:text-white flex items-center gap-2 group"
                        >
                            <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                            Direct Entry
                        </Link>

                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                        >
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Clean Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-3xl lg:hidden flex flex-col items-center justify-center"
                    >
                        <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-white/30 hover:text-white">
                            <Plus size={32} className="rotate-45" />
                        </button>

                        <div className="flex flex-col items-center gap-10">
                            {NAV_LINKS.map((link, i) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        to={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="text-4xl font-black text-white/10 hover:text-white uppercase tracking-widest transition-all hover:scale-110"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}