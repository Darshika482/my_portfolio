import { Box, Container, VStack, Heading, Text, SimpleGrid, Badge, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { Link } from 'react-router-dom';

// 3D Card Component
const ProjectCard3D = ({ position }: { position: [number, number, number] }) => {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.2}>
      <mesh position={position}>
        <boxGeometry args={[2, 1.5, 0.2]} />
        <meshStandardMaterial color="#4299e1" metalness={0.7} roughness={0.3} />
      </mesh>
    </Float>
  );
};

const ProjectScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#68d391" />
      <ProjectCard3D position={[-2, 0, 0]} />
      <ProjectCard3D position={[2, 0, 0]} />
      <ProjectCard3D position={[0, 1.5, 0]} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};

interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
}

const Work = () => {
  const projects: Project[] = [
    {
      title: 'LevelUp Platform',
      description: 'AI-Guided Learning Platform with 3D interactive elements and structured learning paths.',
      tags: ['React', 'Three.js', 'AI', 'Education'],
      link: '/levelup',
    },
    {
      title: 'Project One',
      description: 'A beautiful web application built with React and Three.js showcasing modern UI/UX principles.',
      tags: ['React', 'Three.js', 'TypeScript'],
    },
    {
      title: 'Project Two',
      description: 'An interactive 3D experience that demonstrates advanced Three.js techniques and animations.',
      tags: ['Three.js', 'WebGL', 'Animation'],
    },
    {
      title: 'Project Three',
      description: 'A portfolio website featuring smooth animations and responsive design across all devices.',
      tags: ['React', 'Framer Motion', 'Responsive'],
    },
  ];

  return (
    <Box
      id="work"
      minH="100vh"
      display="flex"
      alignItems="center"
      py={20}
      bg="linear-gradient(180deg, #16213e 0%, #0f172a 100%)"
    >
      <Container maxW="1200px" px={8}>
        <VStack gap={16}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Text fontSize="sm" color="blue.400" textTransform="uppercase" letterSpacing="wide" mb={4}>
              Portfolio
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="bold"
              color="white"
              textAlign="center"
            >
              Some things I've worked on
            </Heading>
          </motion.div>

          {/* 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Box h="300px" borderRadius="lg" overflow="hidden" bg="rgba(0,0,0,0.3)" mb={12}>
              <ProjectScene />
            </Box>
          </motion.div>

          {/* Project Cards */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8} w="100%">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Box
                  as={project.link ? Link : 'div'}
                  to={project.link}
                  display="block"
                  textDecoration="none"
                  bg="rgba(255,255,255,0.05)"
                  borderRadius="lg"
                  p={6}
                  border="1px solid"
                  borderColor="rgba(255,255,255,0.1)"
                  h="100%"
                  transition="all 0.3s"
                  _hover={{
                    transform: 'translateY(-10px)',
                    borderColor: 'blue.400',
                    boxShadow: '0 20px 40px rgba(66, 153, 225, 0.2)',
                    cursor: project.link ? 'pointer' : 'default',
                  }}
                >
                  <VStack align="start" gap={4}>
                    <Box
                      w="100%"
                      h="200px"
                      bg="linear-gradient(135deg, #4299e1, #68d391)"
                      borderRadius="md"
                      mb={4}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text fontSize="4xl">
                        {project.title === 'LevelUp Platform' ? '🧠' : '🚀'}
                      </Text>
                    </Box>
                    <Heading as="h3" fontSize="xl" color="white">
                      {project.title}
                    </Heading>
                    <Text color="gray.400" lineHeight="tall">
                      {project.description}
                    </Text>
                    <HStack gap={2} flexWrap="wrap">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          colorScheme="blue"
                          variant="outline"
                          px={2}
                          py={1}
                          borderRadius="md"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </HStack>
                  </VStack>
                </Box>
              </motion.div>
            ))}
          </SimpleGrid>

        </VStack>
      </Container>
    </Box>
  );
};

export default Work;

