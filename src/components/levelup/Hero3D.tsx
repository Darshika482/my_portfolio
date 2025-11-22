import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, MeshTransmissionMaterial, Float, Center } from '@react-three/drei';
import * as THREE from 'three';

const Hero3D = () => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((_state, delta) => {
        if (groupRef.current) {
            // Slow rotation of the entire staircase
            groupRef.current.rotation.y += delta * 0.1;
        }
    });

    const numSteps = 12;
    const radius = 2;
    const height = 3;

    return (
        <group>
            <Center>
                <group ref={groupRef}>
                    {Array.from({ length: numSteps }).map((_, i) => {
                        const angle = (i / numSteps) * Math.PI * 1.5; // 3/4 circle spiral
                        const x = Math.cos(angle) * radius;
                        const z = Math.sin(angle) * radius;
                        const y = (i / numSteps) * height;

                        return (
                            <group key={i} position={[x, y - height / 2, z]} rotation={[0, -angle, 0]}>
                                <Box args={[1.2, 0.2, 0.6]}>
                                    <MeshTransmissionMaterial
                                        backside
                                        samples={8}
                                        thickness={0.5}
                                        chromaticAberration={0.3}
                                        anisotropy={0.1}
                                        distortion={0.1}
                                        roughness={0.1}
                                        color="#a78bfa"
                                        toneMapped={false}
                                    />
                                </Box>
                            </group>
                        );
                    })}

                    {/* The Goal / Success Orb at the top */}
                    <Float speed={2} floatIntensity={0.5} rotationIntensity={0.5}>
                        <group position={[0, height / 2 + 0.5, 0]}>
                            <Sphere args={[0.5, 32, 32]}>
                                <meshStandardMaterial
                                    color="#fbbf24"
                                    emissive="#fbbf24"
                                    emissiveIntensity={2}
                                    toneMapped={false}
                                />
                            </Sphere>
                            {/* Glow Halo */}
                            <Sphere args={[0.8, 32, 32]}>
                                <meshBasicMaterial color="#fbbf24" transparent opacity={0.2} />
                            </Sphere>
                        </group>
                    </Float>
                </group>
            </Center>
        </group>
    );
};

export default Hero3D;
