import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

const PILL_COUNT = 9
const RADIUS = 4

function Pill({ index, total }: { index: number; total: number }) {
    const meshRef = useRef<THREE.Group>(null)
    const materialRef = useRef<THREE.MeshPhysicalMaterial>(null)

    // Calculate position in circle
    const angle = (index / total) * Math.PI * 2
    const x = Math.cos(angle) * RADIUS
    const y = Math.sin(angle) * RADIUS

    // Color gradient from Purple (#8B5CF6) to Blue (#3B82F6)
    const color = useMemo(() => {
        const c1 = new THREE.Color('#8B5CF6')
        const c2 = new THREE.Color('#3B82F6')
        return c1.lerp(c2, index / total)
    }, [index, total])

    // Random rotation speed and axis offset
    const speed = useMemo(() => 0.5 + Math.random() * 1.5, [])
    const axisOffset = useMemo(() => Math.random() * Math.PI, [])

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.getElapsedTime()

        // Rotate pill on its own axis
        meshRef.current.rotation.x = t * speed + axisOffset
        meshRef.current.rotation.z = t * speed * 0.5 + axisOffset

        // Subtle floating motion
        meshRef.current.position.z = Math.sin(t * 2 + index) * 0.2
    })

    return (
        <group position={[x, y, 0]} rotation={[0, 0, angle]}>
            <group ref={meshRef}>
                <mesh castShadow receiveShadow>
                    {/* CapsuleGeometry: radius, length, capSegments, radialSegments */}
                    <capsuleGeometry args={[0.6, 1.8, 4, 16]} />
                    <meshPhysicalMaterial
                        ref={materialRef}
                        color={color}
                        transmission={1.0}
                        thickness={1.0}
                        roughness={0.08}
                        metalness={0}
                        clearcoat={1.0}
                        clearcoatRoughness={0.05}
                        ior={1.5}
                        reflectivity={0.9}
                        attenuationColor={color}
                        attenuationDistance={2}
                    />
                </mesh>
            </group>
        </group>
    )
}

function PillsGroup() {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (!groupRef.current) return
        // Rotate the entire group
        groupRef.current.rotation.z = -state.clock.getElapsedTime() * 0.3
    })

    return (
        <group ref={groupRef}>
            {Array.from({ length: PILL_COUNT }).map((_, i) => (
                <Pill key={i} index={i} total={PILL_COUNT} />
            ))}
        </group>
    )
}

export function Scene() {
    return (
        <>
            <color attach="background" args={['#000000']} />

            {/* Lighting */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#8B5CF6" />
            <pointLight position={[-10, -10, 10]} intensity={1.5} color="#3B82F6" />
            <pointLight position={[0, 0, 5]} intensity={1} color="#ffffff" />

            {/* Environment for reflections */}
            <Environment preset="city" />

            {/* Main Objects */}
            <PillsGroup />

            {/* Center Text */}
            <Text
                position={[0, 0, 0]}
                fontSize={0.8}
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                color="white"
                anchorX="center"
                anchorY="middle"
                fontWeight="bold"
            >
                WANNATHIS.ONE
            </Text>

            {/* Post Processing */}
            <EffectComposer>
                <Bloom
                    luminanceThreshold={0.2}
                    mipmapBlur
                    intensity={0.8}
                    radius={0.4}
                />
            </EffectComposer>
        </>
    )
}
