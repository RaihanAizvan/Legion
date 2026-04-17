import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Copy, Check } from 'lucide-react'
import { serverInfo } from '../lib/constants'
import toast from 'react-hot-toast'
import TextPressure from '../components/TextPressure'

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
                    <h1 className="font-display font-black leading-[0.85] tracking-tighter mix-blend-screen ">
                        <motion.span
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative block font-black tracking-tighter -mb-10 lg:mb-10"
                            style={{ fontSize: 'clamp(7rem, 26vw, 26rem)' }}
                        >
                            <div className="w-full flex justify-center md:justify-start">
                                <div className="relative w-full max-w-[1200px] h-[200px] sm:h-[260px] md:h-[360px]">

                                    <TextPressure
                                        text="LEGION"
                                        stroke={true}
                                        minFontSize={80}
                                        className="tracking-tight"
                                    />

                                </div>
                            </div>
                        </motion.span>
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
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 px-4 sm:px-12 w-full grid place-items-center md:flex md:justify-start"
            >
                <div className="
        relative w-fit max-w-full sm:max-w-md
        p-[1px] rounded-xl
        bg-gradient-to-r from-cyan-400/40 to-blue-500/30
    ">

                    <div className="
            flex items-center gap-2 sm:gap-3
            px-3 sm:px-5 py-2.5 sm:py-3

            bg-black/70 backdrop-blur-xl
            rounded-xl

            shadow-[0_6px_25px_rgba(0,0,0,0.7)]
        ">

                        {/* LEFT */}
                        <div className="flex items-center gap-2 min-w-0">

                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shrink-0" />

                            <span className="
                    font-mono text-white
                    text-xs sm:text-sm
                    tracking-wide
                    truncate
                ">
                                <TypingText text={serverInfo.ip} />
                            </span>

                            <button
                                onClick={copyIP}
                                className="
                        ml-1 flex items-center justify-center
                        w-7 h-7

                        bg-white/5 hover:bg-white/10
                        border border-white/10
                        rounded-md

                        transition active:scale-95 shrink-0
                    "
                            >
                                {copied ? (
                                    <Check size={14} className="text-green-400" />
                                ) : (
                                    <Copy size={14} className="text-white/60" />
                                )}
                            </button>
                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center gap-2 shrink-0">

                            <div className="
                    flex items-center gap-1.5
                    text-[10px] font-medium text-green-400
                    bg-green-400/10 px-2 py-1 rounded-md
                    border border-green-400/20
                ">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                                {serverInfo.players} / {serverInfo.maxPlayers}
                            </div>

                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Scroll indicator - Bottom Right */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                className="absolute bottom-20 right-6 md:right-12 z-20 flex flex-col items-center"
            >
                {/* Text */}
                <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[10px] tracking-[0.3em] uppercase rotate-90 translate-y-10 hidden md:block text-white/50"
                >
                    Scroll
                </motion.span>

                {/* Scroll Indicator Container */}
                <div className="relative flex flex-col items-center mt-10">

                    {/* Glow Pulse */}
                    <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute w-6 h-10 rounded-full border border-white/20"
                    />

                    {/* Mouse Shape */}
                    <div className="w-6 h-10 rounded-full border border-white/40 flex justify-center items-start p-1 backdrop-blur-sm">

                        {/* Scroll Wheel */}
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1 h-2 bg-white rounded-full"
                        />
                    </div>

                    {/* Trail Line */}
                    <motion.div
                        animate={{ height: [0, 60, 0], opacity: [0.2, 0.6, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-px bg-gradient-to-b from-white/40 to-transparent mt-4"
                    />
                </div>
            </motion.div>
        </section>
    )
}
