import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Preload } from '@react-three/drei';
import Experience from './Experience';

interface Scene3DProps {
    children: React.ReactNode;
}

const Scene3D: React.FC<Scene3DProps> = ({ children }) => {
    return (
        <div className="scene-container" style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 1.5]} // Cap DPR for performance
            >
                <Suspense fallback={null}>
                    <ScrollControls pages={6} damping={0.2}>
                        {/* The 3D World */}
                        <Experience />

                        {/* The HTML Overlay */}
                        <Scroll html style={{ width: '100%', height: '100%' }}>
                            {children}
                        </Scroll>
                    </ScrollControls>
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Scene3D;
