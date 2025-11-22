import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Plane, Text, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const CodePad = () => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Editor Window Glass */}
            <Box args={[4, 3, 0.2]}>
                <MeshTransmissionMaterial
                    backside
                    samples={8}
                    thickness={0.5}
                    chromaticAberration={0.2}
                    anisotropy={0.1}
                    roughness={0.1}
                    color="#1e293b"
                    toneMapped={false}
                />
            </Box>

            {/* Screen Content (Slightly in front) */}
            <Plane args={[3.8, 2.8]} position={[0, 0, 0.11]}>
                <meshBasicMaterial color="#0f172a" opacity={0.9} transparent />
            </Plane>

            {/* Code Lines */}
            {Array.from({ length: 8 }).map((_, i) => (
                <Plane key={i} args={[2 + Math.random(), 0.1]} position={[-0.5, 1 - i * 0.3, 0.12]}>
                    <meshBasicMaterial color={i % 2 === 0 ? "#60a5fa" : "#c084fc"} toneMapped={false} />
                </Plane>
            ))}

            <Text position={[0, -1.8, 0]} fontSize={0.2} color="gray">
                Interactive Code Environment
            </Text>
        </group>
    );
};

export default CodePad;
