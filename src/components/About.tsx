import { Box, Container, VStack, Heading, Text, HStack, SimpleGrid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';

// 3D Skill Icons
const SkillIcon = ({ position, color }: { position: [number, number, number]; color: string }) => {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
      <mesh position={position}>
        <torusGeometry args={[0.3, 0.1, 16, 100]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  );
};

const SkillScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <SkillIcon position={[-1, 0, 0]} color="#4299e1" />
      <SkillIcon position={[1, 0, 0]} color="#68d391" />
      <SkillIcon position={[0, 1, 0]} color="#f687b3" />
      <SkillIcon position={[0, -1, 0]} color="#fbbf24" />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};

const About = () => {
  const skills = [
    { name: 'Web Development', level: 90 },
    { name: 'UI/UX Design', level: 85 },
    { name: 'Three.js', level: 80 },
    { name: 'React', level: 95 },
  ];

  return (
    <Box
      id="about"
      minH="100vh"
      display="flex"
      alignItems="center"
      py={20}
      bg="linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)"
    >
      <Container maxW="1200px" px={8}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={12} alignItems="center">
          {/* Left side - 3D Scene */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Box h="400px" borderRadius="lg" overflow="hidden" bg="rgba(0,0,0,0.3)">
              <SkillScene />
            </Box>
          </motion.div>

          {/* Right side - Content */}
          <VStack gap={8} align="start">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                fontWeight="bold"
                color="white"
                mb={6}
              >
                ABOUT
              </Heading>

              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color="gray.300"
                lineHeight="tall"
                mb={8}
              >
                At the age of 15, I first came in touch with UX Design and app development.
                During my years of learning and building, programming has always been a passion of mine.
                Now, after professional development and experience, I am looking for new challenges
                to work as a web developer, creating beautiful and interactive experiences.
              </Text>

              <VStack gap={4} align="stretch" w="100%">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <VStack align="start" gap={2}>
                      <HStack justify="space-between" w="100%">
                        <Text color="white" fontWeight="semibold">
                          {skill.name}
                        </Text>
                        <Text color="gray.400">{skill.level}%</Text>
                      </HStack>
                      <Box
                        w="100%"
                        h="8px"
                        bg="rgba(255,255,255,0.1)"
                        borderRadius="full"
                        overflow="hidden"
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, #4299e1, #68d391)',
                            borderRadius: 'full',
                          }}
                        />
                      </Box>
                    </VStack>
                  </motion.div>
                ))}
              </VStack>
            </motion.div>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default About;

