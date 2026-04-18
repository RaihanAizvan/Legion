import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../lib/constants'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className={`
                    fixed top-0 left-0 right-0 z-50
                    transition-all duration-300
                    ${scrolled
                        ? 'bg-black/70 backdrop-blur-xl border-b border-white/10'
                        : 'bg-transparent'
                    }
                `}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6">

                    <div className="flex items-center justify-between h-16">

                        {/* 🔥 LOGO */}
                        <Link to="/" className="group relative flex items-center">

                            <span className="
                                rubik-doodle-shadow-regular
                                text-xl sm:text-2xl
                                tracking-wider
                                text-white
                                transition-all duration-300
                                group-hover:text-cyan-400
                            ">
                                LEGION
                            </span>

                            {/* underline glow */}
                            <span className="
                                absolute -bottom-1 left-0 w-0 h-px
                                bg-gradient-to-r from-cyan-400 to-blue-500
                                transition-all duration-300
                                group-hover:w-full
                            " />
                        </Link>


                        {/* 🔥 DESKTOP NAV */}
                        <div className="hidden md:flex items-center gap-1">

                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    to={link.href}
                                    className="
                                        relative px-4 py-2
                                        text-sm text-white/60
                                        hover:text-white
                                        transition-all duration-200
                                        group
                                    "
                                >
                                    {link.label}

                                    {/* hover glow */}
                                    <span className="
                                        absolute bottom-0 left-1/2 -translate-x-1/2
                                        w-0 h-px bg-cyan-400
                                        transition-all duration-300
                                        group-hover:w-4/5
                                    " />
                                </Link>
                            ))}

                        </div>


                        {/* 🔥 RIGHT SIDE */}
                        <div className="flex items-center gap-2">

                            {/* CTA */}
                            <Link
                                to="/signup"
                                className="
                                    hidden sm:inline-flex
                                    px-4 py-1.5
                                    text-sm font-medium
                                    text-black
                                    bg-cyan-400
                                    rounded-md
                                    hover:scale-105 active:scale-95
                                    transition-all
                                    shadow-[0_0_20px_rgba(34,211,238,0.4)]
                                "
                            >
                                Play
                            </Link>

                            {/* Mobile menu */}
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="
                                    md:hidden p-2
                                    text-white/70 hover:text-white
                                    transition
                                "
                            >
                                {menuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>

                        </div>
                    </div>
                </div>

                {/* 🔥 MOBILE MENU */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="
                                md:hidden
                                bg-black/95 backdrop-blur-xl
                                border-t border-white/10
                                px-4 py-4 space-y-2
                            "
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    to={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="
                                        block px-4 py-2.5
                                        text-white/70
                                        hover:text-white
                                        hover:bg-white/5
                                        rounded-lg
                                        transition
                                    "
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <Link
                                to="/signup"
                                className="
                                    block text-center mt-3
                                    bg-cyan-400 text-black
                                    py-2 rounded-md font-medium
                                "
                            >
                                Play Now
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    )
}