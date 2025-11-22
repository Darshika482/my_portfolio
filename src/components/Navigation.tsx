import { motion } from 'framer-motion';
import { Box, Flex, HStack, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const Navigation = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = ['home', 'about', 'work', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'work', label: 'Work' },
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <Box
            as="nav"
            position="fixed"
            top={0}
            left={0}
            right={0}
            zIndex={1000}
            bg={scrolled ? 'rgba(0, 0, 0, 0.9)' : 'transparent'}
            backdropFilter={scrolled ? 'blur(10px)' : 'none'}
            transition="all 0.3s ease"
            py={4}
        >
            <Flex
                maxW="1200px"
                mx="auto"
                px={8}
                justify="space-between"
                align="center"
            >
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Button
                        variant="ghost"
                        onClick={() => scrollToSection('home')}
                        fontSize="xl"
                        fontWeight="bold"
                        color="white"
                        _hover={{ color: 'blue.400' }}
                    >
                        Portfolio
                    </Button>
                </motion.div>

                <HStack gap={8}>
                    {navItems.map((item) => (
                        <motion.div
                            key={item.id}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="ghost"
                                onClick={() => scrollToSection(item.id)}
                                color={activeSection === item.id ? 'blue.400' : 'white'}
                                _hover={{ color: 'blue.400' }}
                                fontWeight={activeSection === item.id ? 'bold' : 'normal'}
                                position="relative"
                                _after={
                                    activeSection === item.id
                                        ? {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: '-4px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: '60%',
                                            height: '2px',
                                            bg: 'blue.400',
                                            borderRadius: 'full',
                                        }
                                        : {}
                                }
                            >
                                {item.label}
                            </Button>
                        </motion.div>
                    ))}
                </HStack>
            </Flex>
        </Box>
    );
};

export default Navigation;

