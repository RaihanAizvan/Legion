import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Copy, Check } from 'lucide-react'
import { serverInfo } from '../lib/constants'
import toast from 'react-hot-toast'

function TypingText({ text, className }) {
    const [displayed, setDisplayed] = useState('')
    const [done, setDone] = useState(false)

    useEffect(() => {
        let i = 0
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayed(text.slice(0, i + 1))
                i++
            } else {
                setDone(true)
                clearInterval(timer)
            }
        }, 90)
        return () => clearInterval(timer)
    }, [text])

    return (
        <span className={className}>
            {displayed}
            {!done && <span className="animate-blink text-cyan-400">|</span>}
        </span>
    )
}

export default function Hero() {
    const [copied, setCopied] = useState(false)

    const copyIP = () => {
        navigator.clipboard.writeText(serverInfo.ip)
        setCopied(true)
        toast.success('IP Copied to clipboard!', {
            style: { background: '#050508', color: '#fff', border: '1px solid #22d3ee' }
        })
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
            {/* Background gradients for text popping */}
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent pointer-events-none" />

            {/* Main Massive Text */}
            <div className="relative z-10 w-full px-4 sm:px-8 mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center md:text-left select-none pointer-events-none"
                >
                    <h1 className="font-display font-black leading-[0.85] tracking-tighter mix-blend-screen">
                        <span
                            className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/20"
                            style={{ fontSize: 'clamp(5rem, 15vw, 15rem)' }}
                        >
                            LEGION
                        </span>
                        <span
                            className="block text-transparent outline-text text-stroke-cyan opacity-80"
                            style={{ fontSize: 'clamp(3rem, 8vw, 10rem)', WebkitTextStroke: '2px rgba(34, 211, 238, 0.4)' }}
                        >
                            NETWORK
                        </span>
                    </h1>
                </motion.div>
            </div>

            {/* Floating Action Widget - Bottom Left */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-32 left-4 md:left-12 z-20"
            >
                <div className="glass-card p-5 border-l-2 border-l-cyan-400 bg-black/40">
                    <div className="flex flex-col gap-4">
                        <div>
                            <p className="text-white/50 text-xs font-semibold tracking-wider uppercase mb-1">Server IP</p>
                            <div className="flex items-center gap-3">
                                <span className="font-display text-xl md:text-2xl font-bold tracking-widest text-white">
                                    <TypingText text={serverInfo.ip} />
                                </span>
                                <button
                                    onClick={copyIP}
                                    className="p-1.5 rounded-md hover:bg-white/10 text-white/50 hover:text-cyan-400 transition-colors"
                                >
                                    {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <a href="#store" className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-2.5 rounded hover:scale-105 active:scale-95 flex items-center gap-2 font-bold transition-all text-sm">
                                <Play size={16} fill="currentColor" />
                                Play Now
                            </a>
                            <div className="flex items-center gap-2 text-xs font-medium bg-green-500/10 text-green-400 px-3 py-1.5 rounded-full border border-green-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                {serverInfo.players} Online
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Scroll indicator - Bottom Right */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-32 right-8 md:right-12 z-20 flex flex-col items-center gap-2 text-white/30"
            >
                <span className="text-[10px] tracking-[0.2em] uppercase origin-left rotate-90 translate-y-10 whitespace-nowrap hidden md:block">
                    Scroll Down
                </span>
                <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent mt-12 md:mt-16" />
            </motion.div>
        </section>
    )
}
