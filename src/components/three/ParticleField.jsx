import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Stars({ scrollY }) {
    const ref = useRef()
    const sphere = useMemo(() => {
        const positions = new Float32Array(3000)
        for (let i = 0; i < 3000; i++) {
            positions[i] = (Math.random() - 0.5) * 35
        }
        return positions
    }, [])

    useFrame((state, delta) => {
        // Continuous rotation
        ref.current.rotation.x -= delta / 15
        ref.current.rotation.y -= delta / 20

        // Mouse Parallax (small movement based on mouse)
        ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, state.pointer.x * 2, 0.02)
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, state.pointer.y * 2, 0.02)

        // Scroll Parallax (rotate group based on scroll position)
        const scrollOffset = scrollY.current * 0.001
        ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, scrollOffset, 0.05)
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#6366f1"
                    size={0.04}
                    sizeAttenuation
                    depthWrite={false}
                />
            </Points>
        </group>
    )
}

function FloatingCube({ position, scale, speed, scrollY }) {
    const ref = useRef()
    const initialRotation = useMemo(() => [Math.random() * Math.PI, Math.random() * Math.PI, 0], [])
    const basePositionY = position[1]

    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speed

        // Auto rotation
        ref.current.rotation.x = initialRotation[0] + t * 0.3
        ref.current.rotation.y = initialRotation[1] + t * 0.2

        // Scroll offset
        const scrollOffset = scrollY.current * 0.002

        // Hover animation + Scroll offset + Mouse subtle reaction
        const targetY = basePositionY + Math.sin(t + position[0]) * 0.4 + scrollOffset
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, 0.05)

        ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, position[0] + state.pointer.x, 0.02)
    })

    return (
        <mesh ref={ref} position={position} scale={scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color="#1e1b4b"
                emissive="#3b82f6"
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
                wireframe={false}
                transparent
                opacity={0.7}
            />
        </mesh>
    )
}

function FloatingCubes({ scrollY }) {
    const cubes = useMemo(() => [
        { position: [-6, 2, -5], scale: 0.8, speed: 0.3 },
        { position: [5, -1, -4], scale: 0.5, speed: 0.4 },
        { position: [-3, -3, -6], scale: 1.2, speed: 0.2 },
        { position: [7, 3, -7], scale: 0.6, speed: 0.35 },
        { position: [-8, 0, -8], scale: 0.9, speed: 0.25 },
        { position: [2, 4, -5], scale: 0.4, speed: 0.45 },
        { position: [-5, -2, -3], scale: 0.7, speed: 0.3 },
        { position: [9, -2, -6], scale: 0.5, speed: 0.4 },
    ], [])

    return (
        <>
            {cubes.map((cube, i) => (
                <FloatingCube key={i} {...cube} scrollY={scrollY} />
            ))}
        </>
    )
}

export default function ParticleField({ showCubes = true }) {
    const scrollY = useRef(0)

    useEffect(() => {
        const handleScroll = () => {
            scrollY.current = window.scrollY
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
            dpr={[1, 1.5]}
        >
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={1} color="#3b82f6" />
            <pointLight position={[-5, -5, -5]} intensity={0.6} color="#8b5cf6" />
            <Stars scrollY={scrollY} />
            {showCubes && <FloatingCubes scrollY={scrollY} />}
        </Canvas>
    )
}
