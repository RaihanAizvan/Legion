import ParticleField from '../components/three/ParticleField'
import Hero from '../components/Hero'
import Dashboard from '../components/Dashboard'
import Welcome from '../components/Welcome'
import Footer from '../components/Footer'

export default function HomePage() {
    return (
        <main className="relative bg-[#050508] min-h-screen text-white overflow-hidden pb-32">
            {/* Global immersive 3D background */}
            <div className="fixed inset-0 z-0">
                <ParticleField showCubes={true} />
            </div>

            <Hero />
            <Welcome />
            <Dashboard />
            <Footer />
        </main>
    )
}
