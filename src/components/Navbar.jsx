import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, User, LogIn } from 'lucide-react'
import { navLinks } from '../lib/constants'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                        ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
                        : 'bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="relative">
                                <span className="font-display text-2xl font-black tracking-widest gradient-text animate-glow">
                                    LEGION
                                </span>
                                <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-blue-500 to-violet-500" />
                            </div>
                        </Link>

                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    to={link.href}
                                    className="nav-link px-3 py-2 rounded-lg hover:bg-white/5"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Right actions */}
                        <div className="flex items-center space-x-2">
                            {/* Search toggle */}
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all hidden sm:flex"
                            >
                                <Search size={18} />
                            </button>

                            <Link
                                to="/login"
                                className="hidden sm:flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/30 rounded-lg transition-all hover:bg-white/5"
                            >
                                <LogIn size={15} />
                                <span>Login</span>
                            </Link>

                            <Link
                                to="/signup"
                                className="hidden sm:flex btn-primary text-sm py-1.5 px-4"
                            >
                                Sign Up
                            </Link>

                            <button className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all hidden sm:flex">
                                <User size={18} />
                            </button>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
                            >
                                {menuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Search bar - animated */}
                    <AnimatePresence>
                        {searchOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden pb-3"
                            >
                                <input
                                    type="text"
                                    placeholder="Search players, events, forums..."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                                    autoFocus
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 px-4 py-4 space-y-1"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    to={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="block w-full text-left px-4 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all font-medium"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-2 flex space-x-2">
                                <Link to="/login" className="flex-1 btn-secondary text-center text-sm py-2">Login</Link>
                                <Link to="/signup" className="flex-1 btn-primary text-center text-sm py-2">Sign Up</Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    )
}
