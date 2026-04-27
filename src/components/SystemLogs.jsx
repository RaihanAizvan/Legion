import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Shield, Cpu, Activity, Database, Radio } from 'lucide-react'

const LOG_TYPES = [
    { label: 'SYSTEM', icon: Cpu, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'SECURITY', icon: Shield, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'NETWORK', icon: Radio, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'DATABASE', icon: Database, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'TRAFFIC', icon: Activity, color: 'text-rose-400', bg: 'bg-rose-500/10' },
]

const MOCK_LOGS = [
    "Secure handshake established with Legion-Node-01",
    "Allocating compute resources for Skyblock-Alpha",
    "Neural firewall: Blocked unauthorized packet from 182.xx.xx.xx",
    "Database sync complete. 1.2M records updated",
    "New player session initiated: EndWalker (v1.20.1)",
    "Legacy protocol support enabled for Bedrock-Connect",
    "Global economy tick occurred: +1,240,192 LegionCoins",
    "Anti-cheat: Heuristic analysis clean for Sector 7",
    "Load balancer: Redirecting traffic to US-EAST-02",
    "Maintenance mode: Scheduled for T-minus 48 hours",
]

export default function SystemLogs() {
    const [logs, setLogs] = useState([])
    const scrollRef = useRef(null)

    useEffect(() => {
        // Initial setup
        const initialLogs = MOCK_LOGS.slice(0, 6).map((content, i) => ({
            id: Date.now() - i * 1000,
            content,
            type: LOG_TYPES[Math.floor(Math.random() * LOG_TYPES.length)],
            timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
        })).reverse()
        setLogs(initialLogs)

        // Stream logs
        const interval = setInterval(() => {
            const newLog = {
                id: Date.now(),
                content: MOCK_LOGS[Math.floor(Math.random() * MOCK_LOGS.length)],
                type: LOG_TYPES[Math.floor(Math.random() * LOG_TYPES.length)],
                timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
            }
            setLogs(prev => [...prev.slice(-7), newLog]) // Keep last 8 logs
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="h-full flex flex-col font-mono text-[10px] sm:text-xs">
            <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-cyan-400" />
                    <span className="font-black text-white/40 uppercase tracking-widest italic">Live Operations Log</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-green-500 font-bold">STREAMING</span>
                </div>
            </div>

            <div className="flex-1 bg-black/40 rounded-2xl border border-white/5 p-4 overflow-hidden relative">
                {/* Background Grid */}
                <div className="absolute inset-0 grid-pattern opacity-[0.05] pointer-events-none" />

                <div className="relative z-10 space-y-2 h-full overflow-hidden">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {logs.map((log) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex gap-3 group"
                            >
                                <span className="text-white/20 shrink-0 select-none">[{log.timestamp}]</span>
                                <span className={`${log.type.color} font-black shrink-0 w-16`}>{log.type.label}:</span>
                                <span className="text-white/60 group-hover:text-white transition-colors truncate">
                                    {log.content}
                                </span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Scanline overlay */}
                <div className="absolute inset-x-0 top-0 h-4 bg-white/[0.03] animate-scanline pointer-events-none" />
            </div>
        </div>
    )
}
