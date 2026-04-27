import FloatingLines from '../components/FloatingLines'
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
                <FloatingLines
                    enabledWaves={["middle", "bottom", "top"]}
                    lineCount={1}
                    lineDistance={100}
                    bendRadius={30}
                    bendStrength={-15}
                    interactive={true}
                    parallax={true}
                    animationSpeed={1}
                    linesGradient={["#adacff", "#5b5192", "#6a6a6a"]}
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
