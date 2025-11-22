import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Environment, Stars, Float } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { Box, Heading, Text, Button, VStack, Container, ChakraProvider, defaultSystem } from '@chakra-ui/react';
import Hero3D from '../components/levelup/Hero3D';
import HowItWorks from '../components/levelup/HowItWorks';
import CodePad from '../components/levelup/CodePad';
import Gamification from '../components/levelup/Gamification';

const Section = ({ children, align = 'left', ...props }: any) => (
    <Container maxW="container.xl" h="100vh" display="flex" alignItems="center" justifyContent={align === 'left' ? 'flex-start' : 'flex-end'} pointerEvents="none" {...props}>
        <VStack alignItems={align === 'left' ? 'flex-start' : 'flex-end'} maxW="500px" pointerEvents="auto" textAlign={align === 'left' ? 'left' : 'right'}>
            {children}
        </VStack>
    </Container>
);

const LevelUpScene = () => {
    return (
        <>
            {/* Global Lighting & Environment */}
            <color attach="background" args={['#050505']} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Environment preset="city" />
            <ambientLight intensity={0.2} />

            <ScrollControls pages={4} damping={0.2}>
                {/* 3D Content Layer */}
                <Scroll>
                    {/* Page 1: Hero */}
                    <group position={[2, 0, 0]}>
                        <Hero3D />
                    </group>

                    {/* Page 2: How It Works */}
                    <group position={[-2, -7, 0]}>
                        <Float floatIntensity={1}>
                            <HowItWorks />
                        </Float>
                    </group>

                    {/* Page 3: CodePad */}
                    <group position={[2, -14, 0]}>
                        <Float floatIntensity={1}>
                            <CodePad />
                        </Float>
                    </group>

                    {/* Page 4: Gamification */}
                    <group position={[-2, -21, 0]}>
                        <Float floatIntensity={1}>
                            <Gamification />
                        </Float>
                    </group>
                </Scroll>

                {/* HTML Content Layer */}
                <Scroll html style={{ width: '100%' }}>
                    <ChakraProvider value={defaultSystem}>
                        {/* Section 1: Hero */}
                        <Section align="left">
                            <Heading
                                as="h1"
                                size="4xl"
                                color="white"
                                css={{
                                    background: "linear-gradient(to right, #c4b5fd, #67e8f9)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent"
                                }}
                            >
                                LevelUp
                            </Heading>
                            <Text fontSize="2xl" color="gray.300" fontWeight="medium">
                                Your AI-Guided Learning Platform.
                            </Text>
                            <Button
                                size="lg"
                                colorPalette="purple"
                                variant="solid"
                                css={{
                                    bgGradient: "to-r", gradientFrom: "purple.500", gradientTo: "blue.500",
                                    _hover: { bgGradient: "to-r", gradientFrom: "purple.400", gradientTo: "blue.400", transform: "scale(1.05)" }
                                }}
                            >
                                Get Started
                            </Button>
                        </Section>

                        {/* Section 2: How It Works */}
                        <Section align="right">
                            <Heading size="3xl" color="white" mb={4}>Structured Flow</Heading>
                            <Text fontSize="xl" color="gray.400">
                                Module → Lesson → Step. <br />
                                A proven path to mastery, guided by AI.
                            </Text>
                        </Section>

                        {/* Section 3: CodePad */}
                        <Section align="left">
                            <Heading size="3xl" color="white" mb={4}>Interactive CodePad</Heading>
                            <Text fontSize="xl" color="gray.400">
                                Write code, get instant feedback. <br />
                                The environment adapts to you.
                            </Text>
                        </Section>

                        {/* Section 4: Gamification */}
                        <Section align="right">
                            <Heading size="3xl" color="white" mb={4}>Stay Motivated</Heading>
                            <Text fontSize="xl" color="gray.400">
                                Streaks, badges, and progress. <br />
                                Level up your career.
                            </Text>
                        </Section>
                    </ChakraProvider>
                </Scroll>
            </ScrollControls>

            {/* Post Processing */}
            <EffectComposer>
                <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.6} />
                <Noise opacity={0.05} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
        </>
    );
};

const LevelUp = () => {
    return (
        <Box w="100%" h="100vh" bg="black">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: false }}>
                <Suspense fallback={null}>
                    <LevelUpScene />
                </Suspense>
            </Canvas>
        </Box>
    );
};

export default LevelUp;
