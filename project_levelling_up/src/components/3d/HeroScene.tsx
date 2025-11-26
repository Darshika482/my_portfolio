import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshTransmissionMaterial, Float, Center } from '@react-three/drei';
import * as THREE from 'three';

const HeroScene = () => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((_state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <group>
            <Center>
                <group ref={groupRef}>
                    {/* Central Knowledge Orb */}
                    <Float speed={2} floatIntensity={0.5} rotationIntensity={0.5}>
                        <Sphere args={[1.5, 64, 64]}>
                            <MeshTransmissionMaterial
                                backside
                                samples={8}
                                thickness={0.5}
                                chromaticAberration={0.3}
                                anisotropy={0.1}
                                distortion={0.4}
                                distortionScale={0.3}
                                temporalDistortion={0.1}
                                roughness={0.1}
                                color="#22d3ee"
                                toneMapped={false}
                            />
                        </Sphere>
                        {/* Inner Glow */}
                        <Sphere args={[1.2, 32, 32]}>
                            <meshBasicMaterial color="#22d3ee" toneMapped={false} />
                        </Sphere>
                    </Float>

                    {/* Orbiting Rings */}
                    <group rotation={[Math.PI / 3, 0, 0]}>
                        <mesh>
                            <torusGeometry args={[3, 0.02, 16, 100]} />
                            <meshBasicMaterial color="#a78bfa" transparent opacity={0.3} />
                        </mesh>
                    </group>
                    <group rotation={[-Math.PI / 3, 0, 0]}>
                        <mesh>
                            <torusGeometry args={[3.5, 0.02, 16, 100]} />
                            <meshBasicMaterial color="#fbbf24" transparent opacity={0.3} />
                        </mesh>
                    </group>
                </group>
            </Center>
        </group>
    );
};

export default HeroScene;
