import { Torus, Cylinder, Sphere, Float, MeshTransmissionMaterial } from '@react-three/drei';

const Gamification = () => {
    return (
        <group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                {/* Badge */}
                <Torus args={[0.8, 0.2, 16, 32]} position={[-2, 0, 0]}>
                    <MeshTransmissionMaterial
                        backside
                        samples={8}
                        thickness={0.5}
                        chromaticAberration={0.5}
                        roughness={0.1}
                        color="#fbbf24"
                        toneMapped={false}
                        emissive="#fbbf24"
                        emissiveIntensity={0.5}
                    />
                </Torus>

                {/* Progress Bar */}
                <group position={[2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <Cylinder args={[0.3, 0.3, 3, 32]}>
                        <meshStandardMaterial color="#374151" transparent opacity={0.3} />
                    </Cylinder>
                    <Cylinder args={[0.25, 0.25, 2, 32]} position={[0, -0.5, 0]}>
                        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} toneMapped={false} />
                    </Cylinder>
                </group>

                {/* Streak Flame (Sphere for now) */}
                <Sphere args={[0.6, 32, 32]} position={[0, 1, 0]}>
                    <MeshTransmissionMaterial
                        backside
                        samples={8}
                        thickness={0.5}
                        chromaticAberration={0.5}
                        roughness={0.1}
                        color="#ef4444"
                        toneMapped={false}
                        emissive="#ef4444"
                        emissiveIntensity={1}
                    />
                </Sphere>
            </Float>
        </group>
    );
};

export default Gamification;
