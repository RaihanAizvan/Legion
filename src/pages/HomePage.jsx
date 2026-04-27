import DarkVeil from '../components/DarkVeil'
import Hero from '../components/Hero'
import Dashboard from '../components/Dashboard'
import Welcome from '../components/Welcome'
import Footer from '../components/Footer'
import NoticeBoard from '../components/NoticeBoard'
import UniqueFeatures from '../components/UniqueFeatures'
import TopPlayers from '../components/TopPlayers'
import Navbar from '../components/Navbar'
export default function HomePage() {
    return (
        <main className="relative bg-[#050508] min-h-screen text-white overflow-hidden pb-32">
            {/* Global immersive 3D background */}
            <div className="fixed inset-0 z-0">
                <DarkVeil
                    hueShift={30}
                    speed={1.4}
                    scanlineFrequency={0.5}
                    warpAmount={5}
                />
            </div>
            <Navbar />
            <Hero />
            <Welcome />
            <UniqueFeatures />
            <TopPlayers />
            <NoticeBoard />
            <Dashboard />
            <Footer />
        </main>
    )
}
