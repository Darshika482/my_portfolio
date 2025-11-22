import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Block = ({ position, label, color }: { position: [number, number, number], label: string, color: string }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
            meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    return (
        <group position={position}>
            <Box ref={meshRef} args={[1.2, 1.2, 1.2]}>
                <MeshTransmissionMaterial
                    backside
                    samples={8}
                    thickness={1}
                    chromaticAberration={0.3}
                    anisotropy={0.1}
                    distortion={0.2}
                    distortionScale={0.1}
                    temporalDistortion={0.1}
                    roughness={0.2}
                    color={color}
                    toneMapped={false}
                />
            </Box>
            <Text position={[0, 1.5, 0]} fontSize={0.4} color="white" anchorX="center" anchorY="middle">
                {label}
            </Text>
        </group>
    );
};

const Connection = ({ start, end }: { start: [number, number, number], end: [number, number, number] }) => {
    const mid = [
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2,
        (start[2] + end[2]) / 2
    ] as [number, number, number];

    const dist = Math.sqrt(
        Math.pow(end[0] - start[0], 2) +
        Math.pow(end[1] - start[1], 2) +
        Math.pow(end[2] - start[2], 2)
    );

    return (
        <mesh position={mid} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, dist, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
    );
};

const HowItWorks = () => {
    return (
        <group>
            <Block position={[-3, 0, 0]} label="Module" color="#3b82f6" />
            <Connection start={[-2.4, 0, 0]} end={[-0.6, 0, 0]} />

            <Block position={[0, 0, 0]} label="Lesson" color="#8b5cf6" />
            <Connection start={[0.6, 0, 0]} end={[2.4, 0, 0]} />

            <Block position={[3, 0, 0]} label="Step" color="#ec4899" />
        </group>
    );
};

export default HowItWorks;
