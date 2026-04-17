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
                            className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/10 drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]"
                            style={{ fontSize: 'clamp(7rem, 26vw, 26rem)' }}
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

            <div className="absolute -top-10 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            {/* Floating Action Widget - Bottom Left */}

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 w-full max-w-xl px-6"
            >
                <div className="relative group">
                    {/* Decorative technical corners/borders */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50" />
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50" />

                    <div className="glass-card bg-[#050508]/60 backdrop-blur-2xl border border-white/5 p-1 flex flex-col md:flex-row items-stretch gap-1 overflow-hidden">
                        {/* Server IP section */}
                        <div className="flex-1 bg-white/5 p-4 flex items-center justify-between border border-white/5">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-400/60 font-bold mb-1">
                                    Network Node
                                </span>
                                <span className="font-mono text-white text-lg tracking-widest flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                                    <TypingText text={serverInfo.ip} />
                                </span>
                            </div>

                            <button
                                onClick={copyIP}
                                className="group/copy relative p-2.5 rounded hover:bg-cyan-500/10 transition-all border border-transparent hover:border-cyan-500/20 active:scale-90"
                            >
                                {copied ? (
                                    <Check size={18} className="text-green-400" />
                                ) : (
                                    <Copy size={18} className="text-white/40 group-hover/copy:text-cyan-400" />
                                )}
                            </button>
                        </div>

                        {/* Status & Play section */}
                        <div className="w-full md:w-auto bg-cyan-500 p-4 flex md:flex-col items-center justify-between md:justify-center gap-4 cursor-pointer group/play transition-colors hover:bg-cyan-400 active:bg-cyan-600" onClick={() => window.location.href = '#store'}>
                            <div className="flex flex-col items-start md:items-center">
                                <span className="text-[10px] uppercase tracking-wider text-black/60 font-black">
                                    Play Now
                                </span>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="text-xs font-black text-black">
                                        {serverInfo.players}
                                    </span>
                                    <span className="text-[10px] font-black text-black/40">
                                        ONLINE
                                    </span>
                                </div>
                            </div>
                            <Play size={20} className="text-black fill-black md:mt-1 group-hover/play:scale-110 transition-transform" />
                        </div>
                    </div>

                    {/* Subtle underline scanline effect */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
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
