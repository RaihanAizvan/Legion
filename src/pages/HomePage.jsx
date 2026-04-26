import Hyperspeed from '../components/Hyperspeed'
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
                <Hyperspeed
                    effectOptions={{
                        distortion: "mountainDistortion",
                        length: 400,
                        roadWidth: 9,
                        islandWidth: 2,
                        lanesPerRoad: 3,
                        fov: 90,
                        fovSpeedUp: 150,
                        speedUp: 2,
                        carLightsFade: 0.4,
                        totalSideLightSticks: 50,
                        lightPairsPerRoadWay: 50,
                        shoulderLinesWidthPercentage: 0.05,
                        brokenLinesWidthPercentage: 0.1,
                        brokenLinesLengthPercentage: 0.5,
                        lightStickWidth: [0.12, 0.5],
                        lightStickHeight: [1.3, 1.7],
                        movingAwaySpeed: [60, 80],
                        movingCloserSpeed: [-120, -160],
                        carLightsLength: [20, 60],
                        carLightsRadius: [0.05, 0.14],
                        carWidthPercentage: [0.3, 0.5],
                        carShiftX: [-0.2, 0.2],
                        carFloorSeparation: [0.05, 1],
                        colors: {
                            roadColor: 0x080808,
                            islandColor: 0x0a0a0a,
                            background: 0x000000,
                            shoulderLines: 0x131318,
                            brokenLines: 0x131318,
                            leftCars: [0xff2d55, 0xebf2fa, 0xff2d55],
                            rightCars: [0x00ffff, 0x0e5ea5, 0x324555],
                            sticks: 0x00ffff
                        }
                    }}
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
