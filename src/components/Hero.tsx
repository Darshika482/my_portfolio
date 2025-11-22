import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sparkles, Environment } from '@react-three/drei';
import { Box, Container, VStack, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';


// 3D Animated Shape Component
const AnimatedShape = () => {
  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <MeshDistortMaterial
          color="#4299e1"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

// 3D Scene Component
const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#68d391" />

      <AnimatedShape />

      <Sparkles
        count={100}
        scale={12}
        size={4}
        speed={0.4}
        opacity={0.5}
        color="#68d391"
      />

      <Environment preset="city" />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};

const Hero = () => {
  return (
    <Box
      id="home"
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)"
      overflow="hidden"
    >
      {/* Background 3D Canvas */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.6}
        zIndex={1}
      >
        <Scene />
      </Box>

      {/* Content */}
      <Container
        maxW="1200px"
        position="relative"
        zIndex={2}
        px={8}
      >
        <VStack gap={8} align="center" textAlign="center" position="relative" minH="80vh" justify="center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Heading
              as="h1"
              fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
              fontWeight="bold"
              bgGradient="linear(to-r, #4299e1, #68d391, #f687b3)"
              bgClip="text"
              mb={4}
            >
              Hi, my name is{' '}
              <Box as="span" display="block" mt={2}>
                [Your Name]
              </Box>
            </Heading>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Text
              fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
              color="gray.300"
              maxW="800px"
            >
              I love creating beautiful user experiences.
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Box
              as="button"
              onClick={() => {
                const contact = document.getElementById('contact');
                contact?.scrollIntoView({ behavior: 'smooth' });
              }}
              px={8}
              py={4}
              bg="transparent"
              border="2px solid"
              borderColor="blue.400"
              color="blue.400"
              borderRadius="md"
              fontSize="lg"
              fontWeight="semibold"
              cursor="pointer"
              transition="all 0.3s"
              _hover={{
                bg: 'blue.400',
                color: 'white',
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 30px rgba(66, 153, 225, 0.3)',
              }}
            >
              Get in touch
            </Box>
          </motion.div>
        </VStack>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Text color="gray.400" fontSize="sm">
              Scroll ↓
            </Text>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Hero;

