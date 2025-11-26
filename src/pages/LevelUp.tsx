import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Environment, Stars, Float } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { Box, Heading, Text, Button, VStack, Container } from '@chakra-ui/react';
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
                    {/* Section 1: Hero */}
                    <Section align="left">
                        {/* Badge */}
                        <Box
                            bg="rgba(255, 255, 255, 0.1)"
                            px={4}
                            py={2}
                            borderRadius="20px"
                            fontSize="sm"
                            letterSpacing="0.1em"
                            textTransform="uppercase"
                            border="1px solid rgba(255, 255, 255, 0.2)"
                            backdropFilter="blur(10px)"
                            mb={4}
                            color="white"
                            width="fit-content"
                        >
                            Live Learning Arena
                        </Box>

                        <Heading
                            as="h1"
                            size="4xl"
                            color="white"
                            lineHeight="1.1"
                            mb={6}
                            css={{
                                background: "linear-gradient(to bottom, #ffffff, #a5a5a5)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                textShadow: "0 10px 30px rgba(0,0,0,0.5)"
                            }}
                        >
                            Learn by building,<br />not just watching
                        </Heading>

                        <Text fontSize="lg" color="gray.400" mb={8} maxW="500px" lineHeight="1.6">
                            Turn ideas into shipped projects with structured roadmaps, rapid-fire challenges, and a coach that adapts to you in real time.
                        </Text>

                        {/* Stats */}
                        <Box display="flex" gap={12} mb={8}>
                            <Box>
                                <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="0.05em" mb={1}>Active Learners</Text>
                                <Text fontSize="2xl" fontWeight="bold" color="white">12,400+</Text>
                            </Box>
                            <Box>
                                <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="0.05em" mb={1}>Build-Ready Projects</Text>
                                <Text fontSize="2xl" fontWeight="bold" color="white">320+</Text>
                            </Box>
                        </Box>

                        {/* Buttons */}
                        <Box display="flex" gap={4} flexWrap="wrap">
                            <Button
                                size="lg"
                                px={8}
                                borderRadius="12px"
                                color="white"
                                fontWeight="600"
                                css={{
                                    background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.8), rgba(79, 70, 229, 0.8))',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: '0 0 20px rgba(147, 51, 234, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.2)',
                                    _hover: {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 0 30px rgba(147, 51, 234, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.4)'
                                    }
                                }}
                                onClick={() => window.open('https://datasense-level-up-1fcf.vercel.app/', '_blank')}
                            >
                                Start Learning Free
                            </Button>
                            <Button
                                size="lg"
                                px={8}
                                borderRadius="8px"
                                variant="outline"
                                color="white"
                                borderColor="whiteAlpha.200"
                                bg="blackAlpha.500"
                                _hover={{ bg: "blackAlpha.600" }}
                            >
                                Explore Projects
                            </Button>
                        </Box>

                        <Text fontSize="xs" color="gray.600" mt={4}>
                            Built by creators, no credit card required to try
                        </Text>
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
                </Scroll>
            </ScrollControls>

            {/* Post Processing */}
            <EffectComposer>
                <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
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
