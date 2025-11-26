import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

import LearningPath3D from './components/LearningPath3D';
import HoloScreen3D from './components/HoloScreen3D';
import AIParticles3D from './components/AIParticles3D';
import BadgeShowcase3D from './components/BadgeShowcase3D';

const HeroOrb = () => {
    const mesh = useRef<THREE.Mesh>(null);
    const scroll = useScroll();

    useFrame((state, delta) => {
        if (!mesh.current) return;
        // Rotate constantly
        mesh.current.rotation.y += delta * 0.5;

        // Fade out as we scroll down
        const opacity = 1 - scroll.range(0, 1 / 6);

        const material = mesh.current.material as THREE.MeshStandardMaterial;
        material.opacity = opacity;
        material.transparent = true;
        mesh.current.visible = opacity > 0;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={mesh} position={[2, 0, 0]}>
                <icosahedronGeometry args={[1.2, 2]} />
                <meshStandardMaterial
                    color="#12E6B9"
                    roughness={0.2}
                    metalness={0.8}
                    wireframe={true}
                />
            </mesh>
        </Float>
    );
};

const Experience: React.FC = () => {
    return (
        <>
            {/* Global Lights */}
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 5, 5]} intensity={1} color="#8F5CFF" />

            {/* Background */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Hero Section (Page 0-1) */}
            <HeroOrb />

            {/* Learning Flow (Page 1-2) */}
            <LearningPath3D />

            {/* Practice Env (Page 2-3) */}
            <HoloScreen3D />

            {/* AI System (Page 3-4) */}
            <AIParticles3D />

            {/* Gamification (Page 4-5) */}
            <BadgeShowcase3D />
        </>
    );
};

export default Experience;
