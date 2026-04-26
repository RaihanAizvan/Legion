import LightRays from '../components/LightRays'
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
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#00ffff"
                    raysSpeed={1.5}
                    lightSpread={0.8}
                    rayLength={1.2}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0.1}
                    distortion={0.05}
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
