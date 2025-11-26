import React, { useRef } from 'react';
import { useScroll, Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BadgeShowcase3D: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);
    const scroll = useScroll();

    useFrame(() => {
        if (!groupRef.current) return;

        // Active during Page 4-5
        const r = scroll.range(4 / 6, 1 / 6);

        // Rotate the whole group
        groupRef.current.rotation.y += 0.005;

        // Scale in
        const s = THREE.MathUtils.lerp(0, 1, r);
        groupRef.current.scale.set(s, s, s);

        // Position
        groupRef.current.position.y = -20;
    });

    return (
        <group ref={groupRef} position={[0, -20, 0]}>
            {/* Badge 1: Star */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <mesh position={[-2, 0, 0]}>
                    <icosahedronGeometry args={[0.8, 0]} />
                    <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} />
                </mesh>
            </Float>

            {/* Badge 2: Shield */}
            <Float speed={3} rotationIntensity={1} floatIntensity={1}>
                <mesh position={[0, 1, 0]}>
                    <octahedronGeometry args={[0.8, 0]} />
                    <meshStandardMaterial color="#12E6B9" metalness={0.8} roughness={0.2} />
                </mesh>
            </Float>

            {/* Badge 3: Flame */}
            <Float speed={2.5} rotationIntensity={1} floatIntensity={1}>
                <mesh position={[2, 0, 0]}>
                    <coneGeometry args={[0.6, 1.5, 4]} />
                    <meshStandardMaterial color="#FF5C93" metalness={0.6} roughness={0.2} />
                </mesh>
            </Float>
        </group>
    );
};

export default BadgeShowcase3D;
