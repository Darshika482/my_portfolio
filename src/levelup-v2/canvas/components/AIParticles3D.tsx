import React, { useMemo, useRef } from 'react';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AIParticles3D: React.FC = () => {
    const pointsRef = useRef<THREE.Points>(null);
    const scroll = useScroll();

    const particleCount = 1000;
    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const r = 4;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;

        // Active during Page 3-4
        const r = scroll.range(3 / 6, 1 / 6);

        // Rotate
        pointsRef.current.rotation.y += 0.002;

        // Pulse
        const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
        pointsRef.current.scale.set(s, s, s);

        // Fade in/out
        const material = pointsRef.current.material as THREE.PointsMaterial;
        material.opacity = THREE.MathUtils.lerp(material.opacity, r > 0 ? 0.8 : 0, 0.1);

        // Move into view
        pointsRef.current.position.y = -15;
    });

    return (
        <points ref={pointsRef} position={[0, -15, 0]}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#8F5CFF"
                transparent
                opacity={0}
                blending={THREE.AdditiveBlending}
                sizeAttenuation={true}
            />
        </points>
    );
};

export default AIParticles3D;
