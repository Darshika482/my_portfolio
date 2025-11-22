import { Box, Container, Text, HStack, Link } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="black"
      py={8}
      borderTop="1px solid"
      borderColor="rgba(255,255,255,0.1)"
    >
      <Container maxW="1200px" px={8}>
        <HStack justify="space-between" flexWrap="wrap" gap={4}>
          <Text color="gray.400" fontSize="sm">
            © {new Date().getFullYear()} Your Name
          </Text>
          <HStack gap={6}>
            <Link
              href="#"
              color="gray.400"
              fontSize="sm"
              _hover={{ color: 'blue.400' }}
              transition="color 0.3s"
            >
              Legal Notice
            </Link>
            <Link
              href="#"
              color="gray.400"
              fontSize="sm"
              _hover={{ color: 'blue.400' }}
              transition="color 0.3s"
            >
              Privacy Policy
            </Link>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default Footer;

