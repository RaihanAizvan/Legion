import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { serverInfo } from '../lib/constants'
import { Copy, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'

const LETTERS = ['L', 'E', 'G', 'I', 'O', 'N']

export default function Welcome() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-100px' })

    const copyIP = () => {
        navigator.clipboard.writeText(serverInfo.ip)
        toast.success('Server IP copied!', { icon: '⚔️' })
    }

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } }
    }

    const letterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }

    const textVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
    }

    return (
        <section ref={ref} className="relative py-24 overflow-hidden mesh-bg">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 right-0 section-divider" />
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="absolute left-10 top-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
            <div className="absolute right-10 bottom-20 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />

            <div className="relative container mx-auto px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header row */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                        {/* Left: subtitle */}
                        <motion.div
                            variants={textVariants}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                            className="md:w-2/5 text-center md:text-left"
                        >
                            <p className="text-xs tracking-widest text-blue-400 uppercase font-semibold mb-2">Minecraft Community</p>
                            <h2 className="font-display text-3xl font-bold text-white mb-3">Welcome to</h2>
                            <p className="text-white/50 border-l-2 border-blue-500 pl-4 italic text-sm">
                                The ultimate Minecraft experience — built for Mallu players with passion.
                            </p>
                        </motion.div>

                        {/* Right: LEGION title */}
                        <div className="md:w-3/5 text-right">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate={inView ? 'visible' : 'hidden'}
                                className="flex items-end justify-center md:justify-end"
                            >
                                {LETTERS.map((letter, i) => (
                                    <motion.span
                                        key={letter}
                                        variants={letterVariants}
                                        className="font-display font-black text-7xl sm:text-8xl md:text-9xl leading-none px-0.5 cursor-default select-none"
                                        style={{
                                            color: i % 2 === 0 ? '#ffffff' : 'rgba(255,255,255,0.3)',
                                        }}
                                        whileHover={{
                                            color: '#3b82f6',
                                            textShadow: '0 0 20px rgba(59,130,246,0.8)',
                                            scale: 1.1,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </motion.div>
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mt-2" />
                            <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent mt-1 ml-auto" />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Content panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="md:w-2/3 glass-card p-8"
                        >
                            <p className="text-white/70 leading-relaxed mb-4">
                                Join our thriving Minecraft community where adventure, creativity, and friendship await.
                                Whether you're a seasoned player or new to the game, Legion offers a unique gaming experience
                                with custom features, events, and a supportive community.
                            </p>
                            <p className="text-white/70 leading-relaxed">
                                Explore vast landscapes, build incredible structures, battle fearsome monsters, and forge
                                alliances with players. Your journey begins here — carve your name into the leaderboards.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-wrap gap-3 mt-6">
                                <a
                                    href="https://dsc.gg/legionmcnet"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn-primary flex items-center space-x-2 text-sm"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 640 512">
                                        <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836Z" />
                                    </svg>
                                    <span>Join Discord</span>
                                </a>
                                <a href="/server-info" className="btn-secondary flex items-center space-x-2 text-sm">
                                    <ExternalLink size={15} />
                                    <span>Learn More</span>
                                </a>
                            </div>
                        </motion.div>

                        {/* Server Info panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.5 }}
                            className="md:w-1/3"
                        >
                            <div className="glass-card p-6 h-full glow-violet">
                                <h3 className="font-display font-bold text-lg mb-4 gradient-text">Server Info</h3>

                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/50 text-sm">Status</span>
                                        <span className="flex items-center space-x-1.5 text-green-400 text-sm">
                                            <span className="online-dot" />
                                            <span>Online</span>
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/50 text-sm">Players</span>
                                        <span className="text-white text-sm font-medium">{serverInfo.players}/{serverInfo.maxPlayers}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/50 text-sm">Uptime</span>
                                        <span className="text-white text-sm font-medium">{serverInfo.uptime}</span>
                                    </div>
                                </div>

                                <div className="bg-black/40 border border-white/10 rounded-lg p-3 mb-4 text-center">
                                    <p className="text-white/40 text-xs mb-1">IP Address</p>
                                    <p className="font-display font-bold text-lg text-white">{serverInfo.ip}</p>
                                </div>

                                <button
                                    onClick={copyIP}
                                    className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg border border-blue-500/40 hover:border-blue-400 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-sm font-semibold transition-all duration-200 active:scale-95"
                                >
                                    <Copy size={14} />
                                    <span>Copy IP</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
