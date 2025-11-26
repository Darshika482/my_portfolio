import { ScrollControls, Scroll } from '@react-three/drei';
import Layout3D from '../components/layout/Layout3D';
import HeroScene from '../components/3d/HeroScene';
import { motion } from 'framer-motion';

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`h-screen flex flex-col justify-center p-10 max-w-4xl mx-auto ${className}`}>
        {children}
    </div>
);

const LandingPage = () => {
    return (
        <Layout3D>
            <ScrollControls pages={3} damping={0.2}>
                {/* 3D Content */}
                <Scroll>
                    <HeroScene />
                    {/* Add more 3D scenes for other sections here */}
                </Scroll>

                {/* HTML Content */}
                <Scroll html style={{ width: '100%' }}>
                    <Section>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-7xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-purple mb-6"
                        >
                            LEVEL UP
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl text-gray-300 font-subheading max-w-2xl mb-8"
                        >
                            Don't just watch. <span className="text-neon-amber">Build.</span><br />
                            The AI-guided platform for project-based learning.
                        </motion.p>
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            className="px-8 py-4 bg-neon-cyan text-black font-bold rounded-full text-lg w-fit shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.8)] transition-all cursor-pointer"
                        >
                            Start Building
                        </motion.button>
                    </Section>

                    <Section className="items-end text-right">
                        <h2 className="text-5xl font-heading mb-6">Learn by Doing</h2>
                        <p className="text-xl text-gray-400 max-w-xl">
                            Forget passive tutorials. LevelUp breaks down complex projects into bite-sized steps.
                            Write code, get AI feedback, and build your portfolio.
                        </p>
                    </Section>

                    <Section>
                        <h2 className="text-5xl font-heading mb-6">Gamified Progress</h2>
                        <p className="text-xl text-gray-400 max-w-xl">
                            Earn XP, maintain streaks, and unlock badges. Learning shouldn't be boring.
                        </p>
                    </Section>
                </Scroll>
            </ScrollControls>
        </Layout3D>
    );
};

export default LandingPage;
