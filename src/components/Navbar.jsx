import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const NAV_LINKS = [
    { label: "Overview", href: "/" },
    { label: "Prestige", href: "/#ranks" },
    { label: "Community", href: "/#community" },
    { label: "Logistics", href: "/store" },
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
        <header className="fixed top-0 inset-x-0 z-[100] pointer-events-none">
            {/* The Sentinel Line */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="absolute top-12 md:top-16 left-8 right-8 h-[1px] bg-white/10 origin-left"
            />

            <div className="container mx-auto px-12 pt-12 md:pt-16 flex items-center justify-between">

                {/* Skeletal Branding */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="pointer-events-auto"
                >
                    <Link to="/" className="group flex flex-col pt-4">
                        <span className="text-xl font-black text-white uppercase tracking-[0.6em] group-hover:text-cyan-400 transition-colors duration-500">
                            LEGION
                        </span>
                        <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.4em] mt-1">Global Network</span>
                    </Link>
                </motion.div>

                {/* Linear Navigation */}
                <div className="hidden lg:flex items-center gap-16 pointer-events-auto pt-4 border-t border-transparent">
                    {NAV_LINKS.map((link, i) => (
                        <motion.div
                            key={link.label}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 + (i * 0.1) }}
                        >
                            <Link
                                to={link.href}
                                className="relative group block"
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 group-hover:text-white transition-all duration-500">
                                    {link.label}
                                </span>
                                {/* Dot indicator that slides on the line */}
                                <div className="absolute -top-[21px] left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Geometric Action */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="flex items-center gap-8 pointer-events-auto pt-4"
                >
                    <Link
                        to="/play"
                        className="group flex flex-col items-end"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 group-hover:text-cyan-400 transition-colors">Launch</span>
                            <ArrowUpRight size={12} className="text-white/20 group-hover:text-cyan-400 transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                        <span className="text-[6px] font-black text-emerald-500/50 uppercase tracking-widest mt-1">Uptime: 99.9%</span>
                    </Link>

                    {/* Minimalist Toggle */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden w-8 h-8 flex flex-col items-end justify-center gap-1.5"
                    >
                        <span className={`h-px bg-white transition-all ${menuOpen ? 'w-6 rotate-45 translate-y-1' : 'w-6'}`} />
                        <span className={`h-px bg-white transition-all ${menuOpen ? 'w-6 -rotate-45 -translate-y-1' : 'w-4'}`} />
                    </button>
                </motion.div>

            </div>

            {/* Architectural Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[150] bg-[#050505] backdrop-blur-3xl flex flex-col pointer-events-auto"
                    >
                        <div className="p-12 flex justify-between items-start">
                            <div className="text-xl font-black text-white italic uppercase tracking-tighter">Sentinel_Menu</div>
                            <button onClick={() => setMenuOpen(false)} className="px-6 py-2 border border-white/10 text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                                Close
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col justify-center px-12 md:px-32 space-y-8">
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
                                        className="text-5xl md:text-8xl font-black text-white/5 hover:text-white hover:pl-8 uppercase tracking-tighter transition-all duration-700 block"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="p-12 border-t border-white/5 flex items-center justify-between">
                            <div className="text-[10px] font-black text-white/20 uppercase tracking-widest leading-loose">
                                Authorized Session <br /> Legion Network v4.0
                            </div>
                            <Link to="/play" className="px-12 py-6 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-cyan-400 transition-colors">
                                Connect
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}