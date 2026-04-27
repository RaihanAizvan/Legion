import { motion } from 'framer-motion'
import { ShieldCheck, Mail, MapPin, Copy, ExternalLink, MessageSquare, ChevronRight, Globe, Zap, Send, Share2 } from 'lucide-react'
import { useState } from 'react'

function DiscordIcon({ size = 20 }) {
    return (
        <svg width={size} height={size} fill="currentColor" viewBox="0 0 640 512">
            <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836Z" />
        </svg>
    )
}

function TwitterIcon({ size = 20 }) {
    return (
        <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    )
}

const FOOTER_LINKS = [
    {
        title: "Community",
        links: [
            { name: "Forums", href: "#" },
            { name: "Discord", href: "https://discord.gg/u8zDScQF" },
            { name: "Support Ticket", href: "#" },
            { name: "Member Search", href: "#" }
        ]
    },
    {
        title: "Information",
        links: [
            { name: "Server Rules", href: "#" },
            { name: "Staff Team", href: "#" },
            { name: "Official Wiki", href: "#" },
            { name: "Changelogs", href: "#" }
        ]
    },
    {
        title: "Store",
        links: [
            { name: "Ranks", href: "#" },
            { name: "Crates", href: "#" },
            { name: "Currency", href: "#" },
            { name: "Bundles", href: "#" }
        ]
    }
]

function SocialIcon({ icon: Icon, href, label }) {
    return (
        <motion.a
            whileHover={{ y: -5, scale: 1.1 }}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/5 text-white/40 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-400/10 transition-all shadow-xl group"
        >
            <Icon size={20} className="group-hover:rotate-12 transition-transform" />
        </motion.a>
    )
}

export default function Footer() {
    const [copied, setCopied] = useState(false)
    const serverIP = "play.legionmc.in"

    const copyIP = () => {
        navigator.clipboard.writeText(serverIP)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <footer className="relative bg-[#020203] pt-32 pb-12 overflow-hidden border-t border-white/5 rounded-t-[4rem]">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/[0.03] blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/[0.03] blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Massive IP Call-to-Action */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24 p-10 md:p-16 rounded-[4rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl relative group overflow-hidden">
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

                    <div className="text-center lg:text-left relative z-10">
                        <div className="flex items-center justify-center lg:justify-start gap-2 text-cyan-400 text-xs font-black uppercase tracking-[0.4em] mb-4">
                            <span className="w-8 h-px bg-cyan-500/50" />
                            Ready for Deployment
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight mb-2">
                            JOIN THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 italic">LEGION</span>
                        </h2>
                        <p className="text-white/30 text-sm font-medium">Experience the next generation of Skyblock performance.</p>
                    </div>

                    <div className="relative group/ip">
                        <button
                            onClick={copyIP}
                            className="flex items-center gap-6 px-8 py-6 rounded-[2.5rem] bg-white text-black font-black uppercase text-sm tracking-[0.2em] relative z-10 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all active:scale-95 group/btn"
                        >
                            <span>{copied ? "COPIED!" : serverIP}</span>
                            <div className="w-px h-6 bg-black/10" />
                            <Copy size={18} className="group-hover/btn:rotate-12 transition-transform" />
                        </button>
                        {/* Pulse effect */}
                        <div className="absolute inset-0 bg-white/20 blur-2xl rounded-[2.5rem] animate-pulse pointer-events-none opacity-0 group-hover/ip:opacity-100 transition-opacity" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
                    {/* Branding Col */}
                    <div className="lg:col-span-4 max-w-sm">
                        <div className="text-4xl font-black text-white uppercase tracking-tighter mb-6 flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-black">
                                <ShieldCheck size={24} />
                            </div>
                            <span className="font-[LegionCustom] tracking-[0.1em]">LEGION</span>
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed mb-8 font-medium">
                            The ultimate destination for competitive Skyblock, Dungeons, and Survival. Powered by a custom-engine optimized for high-performance and zero lag.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon={TwitterIcon} href="#" label="Twitter" />
                            <SocialIcon icon={DiscordIcon} href="https://discord.gg/u8zDScQF" label="Discord" />
                            <SocialIcon icon={Globe} href="#" label="Web" />
                            <SocialIcon icon={Share2} href="#" label="Share" />
                        </div>
                    </div>

                    {/* Nav Cols */}
                    {FOOTER_LINKS.map((section, i) => (
                        <div key={i} className="lg:col-span-2">
                            <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                                <span className="w-4 h-px bg-cyan-500" />
                                {section.title}
                            </h3>
                            <ul className="space-y-4">
                                {section.links.map((link, j) => (
                                    <li key={j}>
                                        <a href={link.href} className="text-sm font-bold text-white/30 hover:text-cyan-400 flex items-center gap-2 group transition-colors">
                                            <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-500" />
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter/Alerts Col */}
                    <div className="lg:col-span-2">
                        <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                            <span className="w-4 h-px bg-cyan-500" />
                            Network
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group cursor-help">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <div>
                                    <div className="text-[10px] font-black text-white uppercase tracking-widest">Global Status</div>
                                    <div className="text-[10px] font-medium text-white/30">Stable - 99.9% Uptime</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group cursor-help">
                                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                                <div>
                                    <div className="text-[10px] font-black text-white uppercase tracking-widest">Version Support</div>
                                    <div className="text-[10px] font-medium text-white/30">1.8.x - 1.20.x</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subfooter */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] italic">© {new Date().getFullYear()} LEGION MC NETWORK</span>
                        <div className="h-4 w-px bg-white/10 hidden md:block" />
                        <a href="#" className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] hover:text-white transition-colors">Terms of Service</a>
                    </div>

                    <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                        Handcrafted for the <span className="text-white">Elite Community</span>
                    </div>
                </div>

            </div>
        </footer>
    )
}

