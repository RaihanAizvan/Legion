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
                                        flex={false}
                                        stroke={true}
                                        width={false}
                                        weight={true}
                                        italic={false}
                                        alpha={false}
                                        textColor="#ffffff"
                                        strokeColor="rgba(0, 74, 201, 0.4)"
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
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-32 left-0 -translate-x-1/2 z-20 w-full max-w-2xl px-4"
            >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full sm:w-auto max-w-full sm:max-w-md">
                    {/* IP */}
                    <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto">

                        {/* Label */}
                        <span className="text-white/40 text-[10px] sm:text-xs uppercase tracking-widest">
                            Server
                        </span>

                        {/* IP + Copy */}
                        <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto">

                            <span className="font-mono text-white text-sm sm:text-lg tracking-wider break-all sm:break-normal">
                                <TypingText text={serverInfo.ip} />
                            </span>

                            <button
                                onClick={copyIP}
                                className="p-2 rounded-md hover:bg-white/10 transition shrink-0"
                            >
                                {copied ? (
                                    <Check size={16} className="text-green-400" />
                                ) : (
                                    <Copy size={16} className="text-white/60" />
                                )}
                            </button>

                        </div>

                    </div>
                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <a
                            href="#store"
                            className="bg-white text-black px-5 py-2 rounded-md font-semibold text-sm hover:scale-105 active:scale-95 transition"
                        >
                            Play
                        </a>

                        <div className="text-green-400 text-xs font-medium flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            {serverInfo.players}
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
