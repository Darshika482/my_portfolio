import { Box, Container, VStack, Heading, Text, Input, Textarea, Button, HStack, SimpleGrid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';

// 3D Geometric Shapes
const GeometricShape = ({ position, color, shape }: { position: [number, number, number]; color: string; shape: 'box' | 'sphere' | 'torus' }) => {
  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
      <mesh position={position}>
        {shape === 'box' && <boxGeometry args={[0.5, 0.5, 0.5]} />}
        {shape === 'sphere' && <sphereGeometry args={[0.3, 32, 32]} />}
        {shape === 'torus' && <torusGeometry args={[0.3, 0.1, 16, 100]} />}
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </Float>
  );
};

const ContactScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f687b3" />
      <GeometricShape position={[-1.5, 0, 0]} color="#4299e1" shape="box" />
      <GeometricShape position={[1.5, 0, 0]} color="#68d391" shape="sphere" />
      <GeometricShape position={[0, 1.5, 0]} color="#f687b3" shape="torus" />
      <GeometricShape position={[0, -1.5, 0]} color="#fbbf24" shape="box" />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
    </Canvas>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      alert('Message sent! (This is a demo)');
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    { name: 'Twitter', url: '#', icon: '🐦' },
    { name: 'Github', url: '#', icon: '💻' },
    { name: 'LinkedIn', url: '#', icon: '💼' },
    { name: 'Email', url: 'mailto:your@email.com', icon: '📧' },
  ];

  return (
    <Box
      id="contact"
      minH="100vh"
      display="flex"
      alignItems="center"
      py={20}
      bg="linear-gradient(180deg, #0f172a 0%, #000000 100%)"
      position="relative"
    >
      {/* Background 3D Scene */}
      <Box
        position="absolute"
        top="10%"
        right="5%"
        w="300px"
        h="300px"
        opacity={0.3}
        display={{ base: 'none', lg: 'block' }}
      >
        <ContactScene />
      </Box>

      <Container maxW="1200px" px={8} position="relative" zIndex={2}>
        <VStack gap={12}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Text fontSize="sm" color="blue.400" textTransform="uppercase" letterSpacing="wide" mb={4}>
              Say hello 👋
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="bold"
              color="white"
              textAlign="center"
            >
              Contact me
            </Heading>
          </motion.div>

          {/* Form and Social Links */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={12} w="100%" maxW="900px">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Box
                as="form"
                onSubmit={handleSubmit}
                bg="rgba(255,255,255,0.05)"
                borderRadius="lg"
                p={8}
                border="1px solid"
                borderColor="rgba(255,255,255,0.1)"
              >
                <VStack gap={6}>
                  <Box w="100%">
                    <Text color="gray.400" mb={2} fontSize="sm">
                      Name
                    </Text>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Please enter your name."
                      bg="rgba(255,255,255,0.05)"
                      border="1px solid"
                      borderColor="rgba(255,255,255,0.2)"
                      color="white"
                      _placeholder={{ color: 'gray.500' }}
                      _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px #4299e1' }}
                      required
                    />
                  </Box>

                  <Box w="100%">
                    <Text color="gray.400" mb={2} fontSize="sm">
                      Email
                    </Text>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Please enter a valid email address."
                      bg="rgba(255,255,255,0.05)"
                      border="1px solid"
                      borderColor="rgba(255,255,255,0.2)"
                      color="white"
                      _placeholder={{ color: 'gray.500' }}
                      _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px #4299e1' }}
                      required
                    />
                  </Box>

                  <Box w="100%">
                    <Text color="gray.400" mb={2} fontSize="sm">
                      Message
                    </Text>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please enter your message."
                      bg="rgba(255,255,255,0.05)"
                      border="1px solid"
                      borderColor="rgba(255,255,255,0.2)"
                      color="white"
                      _placeholder={{ color: 'gray.500' }}
                      _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px #4299e1' }}
                      rows={6}
                      resize="vertical"
                      required
                    />
                  </Box>

                  <Button
                    type="submit"
                    w="100%"
                    bg="blue.400"
                    color="white"
                    size="lg"
                    loading={isSubmitting}
                    loadingText="Delivering..."
                    _hover={{ bg: 'blue.500', transform: 'translateY(-2px)', boxShadow: '0 10px 30px rgba(66, 153, 225, 0.3)' }}
                    transition="all 0.3s"
                  >
                    Submit
                  </Button>
                </VStack>
              </Box>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <VStack gap={8} h="100%" justify="center">
                <HStack gap={6} flexWrap="wrap" justify="center">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Box
                        w="60px"
                        h="60px"
                        borderRadius="full"
                        bg="rgba(255,255,255,0.1)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="2xl"
                        border="1px solid"
                        borderColor="rgba(255,255,255,0.2)"
                        cursor="pointer"
                        transition="all 0.3s"
                        _hover={{
                          bg: 'rgba(66, 153, 225, 0.2)',
                          borderColor: 'blue.400',
                        }}
                      >
                        {social.icon}
                      </Box>
                    </motion.a>
                  ))}
                </HStack>
              </VStack>
            </motion.div>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Contact;

