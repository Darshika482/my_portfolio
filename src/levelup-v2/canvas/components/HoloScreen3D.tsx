import React, { useRef } from 'react';
import { useScroll, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const HoloScreen3D: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);
    const scroll = useScroll();

    useFrame(() => {
        if (!groupRef.current) return;

        // Active during Page 2-3
        // const r1 = scroll.range(2 / 6, 1 / 6);
        const r2 = scroll.curve(2 / 6, 1 / 6);

        // Slide in from bottom
        groupRef.current.position.y = THREE.MathUtils.lerp(-20, -5, r2);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(Math.PI / 2, 0, r2);

        // Scale up
        const s = THREE.MathUtils.lerp(0, 1, r2);
        groupRef.current.scale.set(s, s, s);
    });

    return (
        <group ref={groupRef} position={[0, -10, 0]}>
            {/* The Screen Frame */}
            <mesh>
                <boxGeometry args={[6, 4, 0.1]} />
                <meshStandardMaterial
                    color="#000"
                    metalness={0.9}
                    roughness={0.1}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* The Holographic Glow */}
            <mesh position={[0, 0, 0.06]}>
                <planeGeometry args={[5.8, 3.8]} />
                <meshBasicMaterial
                    color="#12E6B9"
                    transparent
                    opacity={0.1}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* HTML Content projected onto the screen */}
            <Html transform position={[0, 0, 0.1]} occlude>
                <div style={{
                    width: '580px',
                    height: '380px',
                    background: 'rgba(0,0,0,0.8)',
                    color: '#12E6B9',
                    fontFamily: 'monospace',
                    padding: '20px',
                    fontSize: '14px',
                    overflow: 'hidden'
                }}>
                    &gt; initializing practice_env...<br />
                    &gt; loading modules... [OK]<br />
                    &gt; connecting to AI assistant... [OK]<br />
                    <br />
                    <span style={{ color: '#fff' }}>function</span> <span style={{ color: '#8F5CFF' }}>LevelUp</span>() {'{'}<br />
                    &nbsp;&nbsp;<span style={{ color: '#fff' }}>return</span> <span style={{ color: '#F5A623' }}>"Mastery"</span>;<br />
                    {'}'}
                </div>
            </Html>
        </group>
    );
};

export default HoloScreen3D;
