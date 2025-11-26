import { Canvas } from '@react-three/fiber';
import { Environment, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { type ReactNode, Suspense } from 'react';

interface Layout3DProps {
    children: ReactNode;
}

const Layout3D = ({ children }: Layout3DProps) => {
    return (
        <div className="fixed inset-0 z-0 bg-dark-bg">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: false }}>
                <Suspense fallback={null}>
                    <color attach="background" args={['#050505']} />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <Environment preset="city" />
                    <ambientLight intensity={0.2} />

                    {children}

                    <EffectComposer>
                        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.6} />
                        <Noise opacity={0.05} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Layout3D;
