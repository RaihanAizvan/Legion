import FloatingLines from '../components/FloatingLines'
import Hero from '../components/Hero'
import Dashboard from '../components/Dashboard'
import Welcome from '../components/Welcome'
import Footer from '../components/Footer'
import UniqueFeatures from '../components/UniqueFeatures'
import FeatureList from '../components/FeatureList'
import TopPlayers from '../components/TopPlayers'
import Ranks from '../components/Ranks'
import Leveling from '../components/Leveling'
import AfkZone from '../components/AfkZone'
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
                    linesGradient={["#14b9ff", "#5b5192", "#6a6a6a"]}
                />
            </div>
            <Navbar />
            <Hero />
            <Welcome />
            <UniqueFeatures />
            <Ranks />
            <Leveling />
            <AfkZone />
            <TopPlayers />
            <FeatureList />
            <Dashboard />
            <Footer />
        </main>
    )
}
