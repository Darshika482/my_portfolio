import React, { useMemo, useRef } from 'react';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const LearningPath3D: React.FC = () => {
    const scroll = useScroll();
    const tubeRef = useRef<THREE.Mesh>(null);

    // Create a curved path
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, -2, 0),
            new THREE.Vector3(-2, -5, -2),
            new THREE.Vector3(2, -10, -5),
            new THREE.Vector3(0, -15, 0),
            new THREE.Vector3(-1, -20, 2),
        ]);
    }, []);

    useFrame(() => {
        if (!tubeRef.current) return;

        // Animate texture offset to simulate flow
        const material = tubeRef.current.material as THREE.MeshStandardMaterial;
        if (material.map) {
            material.map.offset.x -= 0.002;
        }

        // Visibility based on scroll (Page 1-2)
        const opacity = scroll.range(1 / 6, 2 / 6); // Visible during second section
        // We can also just keep it visible but fade it in/out
        material.opacity = THREE.MathUtils.lerp(material.opacity, opacity > 0 ? 0.6 : 0, 0.1);
        material.transparent = true;
        material.visible = material.opacity > 0.01;
    });

    return (
        <group>
            <mesh ref={tubeRef}>
                <tubeGeometry args={[curve, 64, 0.2, 8, false]} />
                <meshStandardMaterial
                    color="#12E6B9"
                    wireframe={true}
                    transparent
                    opacity={0}
                />
            </mesh>

            {/* Floating Nodes along the path */}
            <mesh position={[-2, -5, -2]}>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial color="#8F5CFF" emissive="#8F5CFF" emissiveIntensity={2} />
            </mesh>
            <mesh position={[2, -10, -5]}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color="#12E6B9" emissive="#12E6B9" emissiveIntensity={2} />
            </mesh>
        </group>
    );
};

export default LearningPath3D;
