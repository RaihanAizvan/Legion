import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { serverInfo } from '../lib/constants'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'

import BorderGlow from './BorderGlow'

export default function Welcome() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })

    const copyIP = () => {
        navigator.clipboard.writeText(serverInfo.ip)
        toast.success('IP copied ⚡')
    }

    return (
        <section ref={ref} className="relative py-28 overflow-hidden">

            {/* 🔥 layered background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050508] to-transparent" />
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.1),transparent_60%)]" />

            <div className="relative max-w-7xl mx-auto px-4">

                {/* 🔥 TOP SYSTEM STRIP */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="
                        flex flex-col sm:flex-row items-start sm:items-center
                        justify-between gap-4
                        border border-white/10
                        bg-black/60 backdrop-blur-xl
                        px-6 py-4
                        rounded-xl
                        shadow-[0_0_40px_rgba(0,0,0,0.6)]
                    "
                >
                    {/* LEFT */}
                    <div className="flex items-center gap-5">

                        <span className="
                            rubik-doodle-shadow-regular
                            text-xl tracking-wider
                            text-white
                        ">
                            LEGION
                        </span>

                        <div className="hidden sm:flex items-center gap-3 text-xs text-white/40">
                            <span>/</span>
                            <span>Network Interface</span>
                            <span className="text-cyan-400">v2.0</span>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-6 text-sm">

                        <div className="flex items-center gap-2 text-green-400">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            ONLINE
                        </div>

                        <div className="text-white/60">
                            {serverInfo.players}/{serverInfo.maxPlayers}
                        </div>

                    </div>
                </motion.div>


                {/* 🔥 MAIN GRID */}
                <div className="mt-14 grid md:grid-cols-2 gap-14 items-center">

                    {/* LEFT */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                    >

                        <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                            Not for VELLAS.
                            <br />
                            <span className="text-cyan-400">But for MALLUS</span>
                        </h2>

                        <p className="mt-5 text-white/60 text-base leading-relaxed max-w-lg">
                            Legion is built for players who are from kerala and want more than survival.
                            Real progression, real community, real impact.
                        </p>

                        {/* feature bullets */}
                        <div className="mt-6 space-y-2 text-sm text-white/70">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                                Adipoli economy & progression
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                                Kidilam Events, Duels etc
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                                Better support for Bugrock also
                            </div>
                        </div>

                        {/* actions */}
                        <div className="mt-8 flex items-center gap-4">

                            <a
                                href=""
                                className="
                                    px-6 py-2.5
                                    bg-cyan-400 text-black
                                    text-sm font-semibold
                                    rounded-md
                                    hover:scale-105 active:scale-95
                                    transition
                                    shadow-[0_0_25px_rgba(34,211,238,0.4)]
                                "
                            >
                                Play Now
                            </a>

                            <a
                                href="#"
                                className="text-white/60 text-sm hover:text-white transition"
                            >
                                Learn more →
                            </a>

                        </div>

                    </motion.div>


                    {/* RIGHT PANEL */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                    >
                        <BorderGlow
                            edgeSensitivity={30}
                            glowColor="188 86 53" /* Cyan-ish (H=188 S=86% L=53%) */
                            backgroundColor="rgba(0, 0, 0, 0.6)"
                            borderRadius={16}
                            glowRadius={40}
                            glowIntensity={1.2}
                            coneSpread={25}
                            animated={true}
                            colors={['#22d3ee', '#8b5cf6', '#3b82f6']} /* Cyan, Violet, Blue */
                        >
                            <div className="
                                backdrop-blur-xl
                                p-6 rounded-[inherit]
                                relative h-full flex flex-col justify-center
                            ">
                                {/* subtle glow line */}
                                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

                                {/* IP */}
                                <div className="mb-6">
                                    <p className="text-white/40 text-xs mb-1">SERVER ADDRESS</p>

                                    <div className="
                                        flex items-center justify-between
                                        bg-black/40 border border-white/10
                                        px-4 py-3 rounded-md
                                    ">
                                        <span className="font-mono text-white text-base">
                                            {serverInfo.ip}
                                        </span>

                                        <button
                                            onClick={copyIP}
                                            className="text-white/50 hover:text-white transition"
                                        >
                                            <Copy size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* stats */}
                                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                                    <div>
                                        <p className="text-white/40 text-xs mb-1">Players</p>
                                        <p className="text-white text-lg">{serverInfo.players}</p>
                                    </div>

                                    <div>
                                        <p className="text-white/40 text-xs mb-1">Capacity</p>
                                        <p className="text-white text-lg">{serverInfo.maxPlayers}</p>
                                    </div>

                                    <div>
                                        <p className="text-white/40 text-xs mb-1">Uptime</p>
                                        <p className="text-white text-lg">{serverInfo.uptime}</p>
                                    </div>
                                </div>
                            </div>
                        </BorderGlow>
                    </motion.div>

                </div>

            </div>
        </section>
    )
}