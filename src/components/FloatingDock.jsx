import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Home, MessageSquare, ShoppingCart, Info, User, LogIn } from 'lucide-react'

const DOCK_ITEMS = [
    { id: 'home', icon: Home, label: 'Home', href: '/' },
    { id: 'forums', icon: MessageSquare, label: 'Forums', href: '/forums' },
    { id: 'store', icon: ShoppingCart, label: 'Store', href: '/store' },
    { id: 'info', icon: Info, label: 'Info', href: '/info' },
    { separator: true },
    { id: 'login', icon: LogIn, label: 'Login', href: '/login' },
]

function DockIcon({ item, mouseX }) {
    const ref = useRef(null)

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
        return val - bounds.x - bounds.width / 2
    })

    // Magic values for the macOS dock effect
    const widthSync = useTransform(distance, [-150, 0, 150], [40, 70, 40])
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

    if (item.separator) {
        return <div className="w-px h-8 bg-white/10 mx-1 rounded-full" />
    }

    const Icon = item.icon

    return (
        <div className="group relative">
            {/* Tooltip */}
            <motion.div
                className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 backdrop-blur border border-white/10 rounded-lg text-xs font-bold text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap"
            >
                {item.label}
            </motion.div>

            <Link to={item.href}>
                <motion.div
                    ref={ref}
                    style={{ width, height: width }}
                    className="flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 group-hover:border-white/20 rounded-full transition-colors cursor-pointer text-white/50 group-hover:text-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] relative overflow-hidden"
                >
                    {/* Inner ambient glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* We shrink the icon proportionally */}
                    <Icon className="w-1/2 h-1/2 relative z-10" strokeWidth={2} />
                </motion.div>
            </Link>
        </div>
    )
}

export default function FloatingDock() {
    const mouseX = useMotionValue(Infinity)

    return (
        <motion.div
            className="fixed bottom-6 w-full flex justify-center z-50 pointer-events-none"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
        >
            <div
                className="flex items-center gap-3 px-4 py-3 bg-[#050508]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl pointer-events-auto"
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
            >
                {DOCK_ITEMS.map((item, idx) => (
                    <DockIcon key={idx} item={item} mouseX={mouseX} />
                ))}
            </div>
        </motion.div>
    )
}
