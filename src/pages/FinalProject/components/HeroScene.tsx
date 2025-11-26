import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Edges, Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useRef } from 'react';

const Stairs = () => {
    const steps = 12;
    const width = 5;
    const height = 0.4;
    const depth = 1.2;

    return (
        <group position={[0, -3, 5]} rotation={[0, 0, 0]}>
            {Array.from({ length: steps }).map((_, i) => (
                <mesh key={i} position={[0, i * height, -i * depth]} receiveShadow castShadow>
                    <boxGeometry args={[width, height, depth]} />
                    <meshStandardMaterial
                        color="#1e1b4b" // Dark indigo/purple
                        roughness={0.1}
                        metalness={0.9}
                        transparent
                        opacity={0.9}
                    />
                    {/* Glowing Edges - Cyan/Purple mix */}
                    <Edges scale={1} threshold={15} color="#8b5cf6" />
                </mesh>
            ))}
        </group>
    );
};

const Gate = () => {
    const frameColor = "#8b5cf6"; // Violet frame to match theme

    return (
        <group position={[0, 2.5, -10]}>
            {/* Gate Frame (4 bars) */}
            {/* Left */}
            <mesh position={[-3.5, 2, 0]}>
                <boxGeometry args={[1, 8, 1]} />
                <meshStandardMaterial color="#111" roughness={0.1} metalness={0.9} />
                <Edges color={frameColor} />
            </mesh>
            {/* Right */}
            <mesh position={[3.5, 2, 0]}>
                <boxGeometry args={[1, 8, 1]} />
                <meshStandardMaterial color="#111" roughness={0.1} metalness={0.9} />
                <Edges color={frameColor} />
            </mesh>
            {/* Top */}
            <mesh position={[0, 6.5, 0]}>
                <boxGeometry args={[8, 1, 1]} />
                <meshStandardMaterial color="#111" roughness={0.1} metalness={0.9} />
                <Edges color={frameColor} />
            </mesh>

            {/* Glowing Ring */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Outer Ring - Blue */}
                <mesh position={[0, 2, 0]}>
                    <torusGeometry args={[2, 0.1, 16, 100]} />
                    {/* Use meshBasicMaterial for consistent, lighting-independent glow */}
                    <meshBasicMaterial color={[2, 4, 10]} toneMapped={false} /> {/* Boosted values for Bloom */}
                </mesh>
                {/* Inner Ring - Purple */}
                <mesh position={[0, 2, 0]}>
                    <torusGeometry args={[2.2, 0.05, 16, 100]} />
                    <meshBasicMaterial color={[10, 2, 10]} toneMapped={false} /> {/* Boosted values for Bloom */}
                </mesh>
            </Float>

            {/* Inner Portal Light - Purple/Blue mix */}
            <pointLight position={[0, 2, 1]} intensity={5} distance={15} color="#8b5cf6" />
        </group>
    );
};

const ClimbingCharacter = () => {
    const group = useRef<THREE.Group>(null);
    const body = useRef<THREE.Group>(null);
    const leftLeg = useRef<THREE.Group>(null);
    const rightLeg = useRef<THREE.Group>(null);
    const leftArm = useRef<THREE.Group>(null);
    const rightArm = useRef<THREE.Group>(null);

    // Stairs config
    const stepHeight = 0.4;
    const stepDepth = 1.2;

    // Animation config
    const startStep = -3; // Start from "below"
    // Gate is at world Z -10. Stairs start at Z 5. 
    // Step 0 is at Z 5. Step i is at 5 - i*1.2.
    // Gate Z -10 => 5 - i*1.2 = -10 => i = 12.5.
    // We want to walk 2 seconds past the gate. 2s / 0.8s/step = 2.5 steps.
    // So endStep should be around 12.5 + 2.5 = 15.
    const endStep = 15;
    const stepsToTravel = endStep - startStep;
    const durationPerStep = 0.8;

    useFrame((state) => {
        if (!group.current || !body.current || !leftLeg.current || !rightLeg.current || !leftArm.current || !rightArm.current) return;

        const t = state.clock.getElapsedTime();
        const totalDuration = stepsToTravel * durationPerStep;
        const progress = (t % totalDuration) / totalDuration;

        // Calculate current "virtual" step position
        const currentStep = startStep + (progress * stepsToTravel);
        const stepProgress = (currentStep % 1 + 1) % 1; // Normalized 0-1 for each step

        // Movement
        const yPos = currentStep * stepHeight;
        const zPos = -currentStep * stepDepth;

        // Hop effect (sine wave)
        const hopHeight = Math.sin(stepProgress * Math.PI) * 0.1;

        group.current.position.y = yPos + hopHeight + 0.95;
        group.current.position.z = zPos;

        // Animation (Limb swinging)
        const limbSwing = Math.sin(t * 12) * 0.6;
        const armSwing = Math.sin(t * 12) * 0.5;

        // Leg rotation
        leftLeg.current.rotation.x = limbSwing;
        rightLeg.current.rotation.x = -limbSwing;

        // Arm rotation
        leftArm.current.rotation.x = -armSwing;
        rightArm.current.rotation.x = armSwing;

        // Body tilt
        body.current.rotation.x = 0.3;
        body.current.position.y = Math.abs(Math.sin(t * 24)) * 0.02;

        // Smooth Fade In/Out Logic (Opacity)
        let opacity = 1;

        // Fade in: Start invisible, fade in as it approaches step -1
        if (currentStep < -1) {
            opacity = Math.max(0, (currentStep - startStep) / 2);
        }
        // Fade out: Start fading out AFTER passing the gate + buffer
        // Gate is at 12.5. Let's start fading at 14.
        else if (currentStep > 14) {
            opacity = Math.max(0, 1 - (currentStep - 14));
        }

        // Apply opacity to all meshes in the group
        group.current.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                if (child.material) {
                    // Handle both single material and array of materials
                    const materials = Array.isArray(child.material) ? child.material : [child.material];
                    materials.forEach((mat) => {
                        mat.transparent = true;
                        mat.opacity = opacity;
                    });
                }
            }
        });
    });

    // Materials
    // Inlined below to avoid reuse issues

    return (
        // Rotate 180 degrees (Math.PI) to face the stairs (negative Z)
        <group ref={group} position={[0, -3, 5]} rotation={[0, Math.PI, 0]}>
            <group ref={body}>
                {/* Torso - Jacket/Suit */}
                <mesh position={[0, 0.25, 0]} castShadow>
                    <boxGeometry args={[0.35, 0.45, 0.2]} />
                    <meshStandardMaterial color="#181025" roughness={0.4} metalness={0.6} />
                </mesh>
                {/* Backpack/Tech Pack */}
                <mesh position={[0, 0.3, -0.12]} castShadow> {/* Moved to back (negative Z relative to body) */}
                    <boxGeometry args={[0.25, 0.3, 0.1]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                {/* Chest Light */}
                <mesh position={[0, 0.35, 0.11]}> {/* Moved to front (positive Z relative to body) */}
                    <planeGeometry args={[0.1, 0.05]} />
                    <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={2} toneMapped={false} />
                </mesh>

                {/* Head - Helmet/Visor style */}
                <group position={[0, 0.65, 0]}>
                    <mesh castShadow>
                        <boxGeometry args={[0.2, 0.22, 0.22]} />
                        <meshStandardMaterial color="#181025" roughness={0.4} metalness={0.6} />
                    </mesh>
                    {/* Visor */}
                    <mesh position={[0, 0.02, 0.115]}> {/* Moved to front */}
                        <boxGeometry args={[0.18, 0.08, 0.02]} />
                        <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={2} toneMapped={false} />
                    </mesh>
                </group>

                {/* Left Arm */}
                <group ref={leftArm} position={[0.22, 0.4, 0]}> {/* Swapped side for correct orientation if needed, or just kept symmetric */}
                    <mesh position={[0, -0.2, 0]}>
                        <cylinderGeometry args={[0.06, 0.05, 0.45, 8]} />
                        <meshStandardMaterial color="#181025" roughness={0.4} metalness={0.6} />
                    </mesh>
                    <mesh position={[0, -0.45, 0]}> {/* Hand */}
                        <sphereGeometry args={[0.06, 8, 8]} />
                        <meshStandardMaterial color="#111" />
                    </mesh>
                </group>

                {/* Right Arm */}
                <group ref={rightArm} position={[-0.22, 0.4, 0]}>
                    <mesh position={[0, -0.2, 0]}>
                        <cylinderGeometry args={[0.06, 0.05, 0.45, 8]} />
                        <meshStandardMaterial color="#181025" roughness={0.4} metalness={0.6} />
                    </mesh>
                    <mesh position={[0, -0.45, 0]}> {/* Hand */}
                        <sphereGeometry args={[0.06, 8, 8]} />
                        <meshStandardMaterial color="#111" />
                    </mesh>
                </group>

                {/* Left Leg */}
                <group ref={leftLeg} position={[0.1, -0.1, 0]}>
                    <mesh position={[0, -0.3, 0]}>
                        <cylinderGeometry args={[0.07, 0.06, 0.6, 8]} />
                        <meshStandardMaterial color="#181025" roughness={0.4} metalness={0.6} />
                    </mesh>
                    <mesh position={[0, -0.6, 0.05]}> {/* Boot */}
                        <boxGeometry args={[0.1, 0.08, 0.25]} />
                        <meshStandardMaterial color="#000" />
                    </mesh>
                    {/* Boot Glow */}
                    <mesh position={[0, -0.6, 0.18]}>
                        <boxGeometry args={[0.08, 0.02, 0.01]} />
                        <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={2} toneMapped={false} />
                    </mesh>
                </group>

                {/* Right Leg */}
                <group ref={rightLeg} position={[-0.1, -0.1, 0]}>
                    <mesh position={[0, -0.3, 0]}>
                        <cylinderGeometry args={[0.07, 0.06, 0.6, 8]} />
                        <meshStandardMaterial color="#181025" roughness={0.4} metalness={0.6} />
                    </mesh>
                    <mesh position={[0, -0.6, 0.05]}> {/* Boot */}
                        <boxGeometry args={[0.1, 0.08, 0.25]} />
                        <meshStandardMaterial color="#000" />
                    </mesh>
                    {/* Boot Glow */}
                    <mesh position={[0, -0.6, 0.18]}>
                        <boxGeometry args={[0.08, 0.02, 0.01]} />
                        <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={2} toneMapped={false} />
                    </mesh>
                </group>
            </group>

            {/* Shadow blob */}
            <mesh position={[0, -0.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.35, 16]} />
                <meshBasicMaterial color="#000000" transparent opacity={0.6} />
            </mesh>
        </group>
    );
};

const HeroScene = () => {
    // Responsive logic for 3D scene could go here (e.g. useThree viewport), 
    // but for now we'll just shift the model and use CSS for text.

    return (
        <div style={{ width: '100vw', height: '100vh', background: '#020205', position: 'relative', overflow: 'hidden' }}>
            <Canvas shadows camera={{ position: [0, 1, 9], fov: 50 }}>
                <fog attach="fog" args={['#020205', 10, 50]} /> {/* Pushed fog back to reveal gate */}
                <ambientLight intensity={0.2} />

                {/* Shifted 3D Content Group */}
                <group position={[8.5, -1, 0]}> {/* Moved further to the right */}
                    <Stairs />
                    <ClimbingCharacter />
                    <Gate />
                </group>

                <Environment preset="city" />

                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2 - 0.1}
                    minPolarAngle={Math.PI / 4}
                    target={[8.5, 2, -5]} // Target the new position
                    autoRotate
                    autoRotateSpeed={0.5}
                />

                {/* Post Processing for Glow */}
                <EffectComposer>
                    <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
                </EffectComposer>
            </Canvas>

            {/* Responsive Text Container */}
            <div className="hero-text-container">
                <style>{`
                    .hero-text-container {
                        position: absolute;
                        top: 50%;
                        left: 8%; /* Left aligned */
                        transform: translateY(-50%);
                        color: white;
                        pointer-events: none;
                        text-align: left; /* Left align text */
                        z-index: 10;
                        width: 90%;
                        max-width: 600px;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start; /* Align items to start */
                        gap: 1.5rem;
                    }

                    /* Mobile Responsive Styles */
                    @media (max-width: 768px) {
                        .hero-text-container {
                            left: 50%;
                            top: 60%; /* Push down slightly */
                            transform: translate(-50%, -50%);
                            text-align: center;
                            align-items: center;
                            width: 90%;
                            background: rgba(2, 2, 5, 0.6); /* Add backdrop for readability on mobile */
                            padding: 2rem;
                            border-radius: 20px;
                            backdrop-filter: blur(5px);
                        }
                        
                        /* Adjust 3D scene via canvas if needed, but CSS overlay changes often suffice */
                    }

                    @keyframes blurIn {
                        0% {
                            filter: blur(10px);
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        100% {
                            filter: blur(0);
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}</style>

                {/* Badge */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    marginBottom: '0.5rem',
                    animation: 'blurIn 0.8s ease-out forwards'
                }}>
                    Live Learning Arena
                </div>

                {/* Headline */}
                <h1 style={{
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)', /* Reduced font size */
                    lineHeight: '1.1',
                    margin: 0,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '700',
                    background: 'linear-gradient(to bottom, #ffffff, #a5a5a5)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    animation: 'blurIn 1s ease-out forwards',
                    animationDelay: '0.2s',
                    opacity: 0 // Start hidden for animation
                }}>
                    Learn by building,<br />not just watching
                </h1>

                {/* Subheadline */}
                <p style={{
                    fontSize: '1.1rem',
                    color: '#a0a0a0',
                    maxWidth: '500px',
                    lineHeight: '1.6',
                    margin: 0,
                    animation: 'blurIn 1s ease-out forwards',
                    animationDelay: '0.4s',
                    opacity: 0
                }}>
                    Turn ideas into shipped projects with structured roadmaps, rapid-fire challenges, and a coach that adapts to you in real time.
                </p>

                {/* Stats */}
                <div style={{
                    display: 'flex',
                    gap: '3rem',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    flexWrap: 'wrap', /* Allow wrapping on small screens */
                    justifyContent: 'flex-start'
                }}>
                    <div style={{ textAlign: 'left' }}> {/* Align left for desktop */}
                        <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>Active Learners</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>12,400+</div>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>Build-Ready Projects</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>320+</div>
                    </div>
                </div>

                {/* Buttons */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    pointerEvents: 'auto',
                    flexWrap: 'wrap'
                }}>
                    <button style={{
                        padding: '1rem 2.5rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.8), rgba(79, 70, 229, 0.8))', // Purple to Indigo gradient
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 0 20px rgba(147, 51, 234, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.2)', // Outer glow + Inner depth
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        letterSpacing: '0.02em'
                    }}
                        onClick={() => window.open('https://datasense-level-up-1fcf.vercel.app/', '_blank')}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 0 30px rgba(147, 51, 234, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.2)';
                        }}>
                        Start Learning Free
                    </button>
                    <button style={{
                        padding: '1rem 2rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                    }}>
                        Explore Projects
                    </button>
                </div>

                {/* Footer Text */}
                <p style={{
                    fontSize: '0.8rem',
                    color: '#666',
                    marginTop: '0.5rem'
                }}>
                    Built by creators, no credit card required to try
                </p>
            </div>
        </div>
    );
};

export default HeroScene;
