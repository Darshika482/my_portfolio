import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const HowItWorks = () => {
    const [animationPhase, setAnimationPhase] = useState<'builder' | 'code' | 'roadmap'>('builder');

    // Cycle animation phases
    useEffect(() => {
        const cycle = async () => {
            // Builder Phase
            setAnimationPhase('builder');
            await new Promise(r => setTimeout(r, 4000)); // Wait for builder animation + click

            // Code Phase
            setAnimationPhase('code');
            await new Promise(r => setTimeout(r, 4000)); // Wait for typing animation

            // Roadmap Phase
            setAnimationPhase('roadmap');
            await new Promise(r => setTimeout(r, 4000)); // Wait for roadmap

            // Loop
            cycle();
        };

        cycle();
        return () => { }; // Cleanup not strictly needed for this simple loop but good practice
    }, []);

    const steps = [
        {
            id: "01",
            title: "Creators build structured projects",
            description: <>They organize content into <span style={{ color: '#c084fc' }}>modules, lessons, and steps</span>—making complex topics easy to follow.</>
        },
        {
            id: "02",
            title: "You follow the roadmap",
            description: <>Step by step, you build something real. Not theory—<span style={{ color: '#c084fc' }}>actual code, actual projects</span>, actual skills.</>
        },
        {
            id: "03",
            title: "Learn at your pace",
            description: <>Take breaks, come back later, track your progress. The roadmap shows <span style={{ color: '#c084fc' }}>exactly where you left off</span>.</>
        }
    ];

    // Typing animation variants
    const codeLines = [
        { text: "function LevelUp() {", indent: 0, color: "#c084fc" },
        { text: "// Build real projects", indent: 1, color: "#9ca3af" },
        { text: "return \"Skills\";", indent: 1, color: "#34d399" },
        { text: "}", indent: 0, color: "#c084fc" }
    ];

    return (
        <section style={{
            padding: '8rem 2rem',
            background: '#020205',
            color: 'white',
            position: 'relative',
            zIndex: 10,
            overflow: 'hidden'
        }}>
            {/* Background Blob */}
            <div style={{
                position: 'absolute',
                top: '20%',
                right: '-10%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(0,0,0,0) 70%)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{
                            fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                            fontWeight: '700',
                            marginBottom: '1rem',
                            background: 'linear-gradient(to right, #fff, #a5a5a5)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        LevelUp is where learning meets building
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            color: '#a0a0a0',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: '1.6',
                            fontSize: '1.1rem'
                        }}
                    >
                        A platform where creators share structured projects and learners follow along to build real things. No more watching endless tutorials—actually create something while you learn.
                    </motion.p>
                </div>

                {/* Content Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem',
                    alignItems: 'center'
                }}>
                    {/* Left Column: Steps */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', position: 'relative' }}>
                        {/* Connecting Line - Animated */}
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            style={{
                                position: 'absolute',
                                left: '24px',
                                top: '25px',
                                width: '2px',
                                background: 'linear-gradient(to bottom, #8b5cf6, rgba(139, 92, 246, 0.1))',
                                zIndex: 0
                            }}
                        />

                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.3 }}
                                whileHover={{ scale: 1.02, x: 10 }}
                                style={{
                                    display: 'flex',
                                    gap: '1.5rem',
                                    alignItems: 'flex-start',
                                    position: 'relative',
                                    zIndex: 1,
                                    cursor: 'default'
                                }}
                            >
                                {/* Icon/Number */}
                                <div style={{
                                    minWidth: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(145deg, #1a1a1a, #050505)', // Matte gradient
                                    border: '1px solid rgba(139, 92, 246, 0.3)', // Subtle purple border
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#c084fc',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    boxShadow: `
                                        5px 5px 10px rgba(0,0,0,0.5), 
                                        -2px -2px 5px rgba(255,255,255,0.05),
                                        inset 0 0 15px rgba(0,0,0,0.8)
                                    `, // 3D shadows
                                    position: 'relative',
                                    zIndex: 2
                                }}>
                                    {step.id}
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#fff' }}>{step.title}</h4>
                                    <p style={{ color: '#a0a0a0', fontSize: '1rem', lineHeight: '1.6' }}>
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Column: Animation Container */}
                    <div style={{
                        background: '#0f0f13',
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        aspectRatio: '4/3',
                        position: 'relative'
                    }}>
                        <AnimatePresence mode="wait">
                            {animationPhase === 'builder' ? (
                                <motion.div
                                    key="builder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    style={{ width: '100%', height: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                                >
                                    {/* Builder UI Header */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: '600' }}>Project Builder</div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399' }}></div>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbf24' }}></div>
                                        </div>
                                    </div>

                                    {/* Modules Populating */}
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '8px', padding: '1rem' }}
                                    >
                                        <div style={{ fontSize: '0.8rem', color: '#c084fc', marginBottom: '0.5rem' }}>Module 1: Fundamentals</div>
                                        {/* Lessons */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {[1, 2, 3].map(i => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ x: -20, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ delay: 0.5 + (i * 0.2) }}
                                                    style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                                >
                                                    <div style={{ width: '6px', height: '6px', background: '#fff', borderRadius: '50%' }}></div>
                                                    <div style={{ height: '4px', width: '60%', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}></div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Cursor Animation */}
                                    <motion.div
                                        initial={{ x: 200, y: 200, opacity: 0 }}
                                        animate={{
                                            x: [200, 100, 100],
                                            y: [200, 100, 100],
                                            opacity: [0, 1, 1],
                                            scale: [1, 1, 0.8, 1] // Click effect
                                        }}
                                        transition={{
                                            duration: 2,
                                            times: [0, 0.6, 1],
                                            delay: 1.5
                                        }}
                                        style={{ position: 'absolute', zIndex: 10 }}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="#c084fc" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                                        </svg>
                                    </motion.div>

                                </motion.div>
                            ) : animationPhase === 'code' ? (
                                <motion.div
                                    key="code"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                    style={{ width: '100%', height: '100%', padding: '2rem', display: 'flex', flexDirection: 'column' }}
                                >
                                    {/* Code Editor Header */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                                        <div style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>lesson_1.tsx</div>
                                    </div>

                                    {/* Code Content */}
                                    <div style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                                        {codeLines.map((line, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.5, duration: 0.3 }}
                                                style={{
                                                    paddingLeft: `${line.indent}rem`,
                                                    marginBottom: '0.4rem',
                                                    color: line.color
                                                }}
                                            >
                                                {line.text}
                                            </motion.div>
                                        ))}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: [0, 1, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.8 }}
                                            style={{ width: '2px', height: '14px', background: '#8b5cf6', display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }}
                                        />
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="roadmap"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    style={{ width: '100%', height: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    {/* Hierarchical Tree Container */}
                                    <div style={{ position: 'relative', width: '100%', height: '400px', display: 'flex', justifyContent: 'center' }}>

                                        {/* SVG Connectors */}
                                        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'visible' }}>
                                            {/* Module to Lesson 1 */}
                                            <motion.line
                                                x1="35%" y1="50"
                                                x2="15%" y2="180"
                                                stroke="#8b5cf6"
                                                strokeWidth="3"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.8, delay: 0.5 }}
                                            />
                                            {/* Module to Lesson 2 */}
                                            <motion.line
                                                x1="35%" y1="50"
                                                x2="55%" y2="180"
                                                stroke="#8b5cf6"
                                                strokeWidth="3"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.8, delay: 0.5 }}
                                            />
                                            {/* Lesson 1 to Step 1 */}
                                            <motion.line
                                                x1="15%" y1="180"
                                                x2="15%" y2="310"
                                                stroke="#8b5cf6"
                                                strokeWidth="3"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.6, delay: 1.3 }}
                                            />
                                            {/* Lesson 2 to Step 2 */}
                                            <motion.line
                                                x1="55%" y1="180"
                                                x2="55%" y2="310"
                                                stroke="#8b5cf6"
                                                strokeWidth="3"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.6, delay: 1.3 }}
                                            />
                                        </svg>

                                        {/* Level 1: Module */}
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            style={{
                                                position: 'absolute', top: '20px', left: '35%', transform: 'translateX(-50%)',
                                                background: 'linear-gradient(145deg, #1a1a1a, #050505)',
                                                border: '1px solid rgba(192, 132, 252, 0.3)',
                                                padding: '16px 32px', borderRadius: '16px',
                                                zIndex: 2,
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
                                                display: 'flex', alignItems: 'center', gap: '12px'
                                            }}
                                        >
                                            <div style={{ width: '16px', height: '16px', background: '#c084fc', borderRadius: '4px', boxShadow: '0 0 10px rgba(192, 132, 252, 0.5)' }} />
                                            <span style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 600 }}>Module 1</span>
                                        </motion.div>

                                        {/* Level 2: Lessons */}
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 1.0 }}
                                            style={{
                                                position: 'absolute', top: '150px', left: '15%', transform: 'translateX(-50%)',
                                                background: 'linear-gradient(145deg, #1a1a1a, #050505)',
                                                border: '1px solid rgba(167, 139, 250, 0.2)',
                                                padding: '12px 24px', borderRadius: '12px',
                                                zIndex: 2,
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                                                display: 'flex', alignItems: 'center', gap: '10px'
                                            }}
                                        >
                                            <div style={{ width: '10px', height: '10px', background: '#a78bfa', borderRadius: '50%' }} />
                                            <span style={{ fontSize: '0.9rem', color: '#e0e0e0' }}>Lesson A</span>
                                        </motion.div>

                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 1.0 }}
                                            style={{
                                                position: 'absolute', top: '150px', left: '55%', transform: 'translateX(-50%)',
                                                background: 'linear-gradient(145deg, #1a1a1a, #050505)',
                                                border: '1px solid rgba(167, 139, 250, 0.2)',
                                                padding: '12px 24px', borderRadius: '12px',
                                                zIndex: 2,
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                                                display: 'flex', alignItems: 'center', gap: '10px'
                                            }}
                                        >
                                            <div style={{ width: '10px', height: '10px', background: '#a78bfa', borderRadius: '50%' }} />
                                            <span style={{ fontSize: '0.9rem', color: '#e0e0e0' }}>Lesson B</span>
                                        </motion.div>

                                        {/* Level 3: Steps */}
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 1.8 }}
                                            style={{
                                                position: 'absolute', top: '280px', left: '15%', transform: 'translateX(-50%)',
                                                background: 'linear-gradient(145deg, #1a1a1a, #050505)',
                                                padding: '10px 20px', borderRadius: '10px',
                                                zIndex: 2, border: '1px solid rgba(75, 85, 99, 0.3)',
                                                boxShadow: '0 2px 10px rgba(0,0,0,0.4)'
                                            }}
                                        >
                                            <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Step 1.1</span>
                                        </motion.div>

                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 1.8 }}
                                            style={{
                                                position: 'absolute', top: '280px', left: '55%', transform: 'translateX(-50%)',
                                                background: 'linear-gradient(145deg, #1a1a1a, #050505)',
                                                padding: '10px 20px', borderRadius: '10px',
                                                zIndex: 2, border: '1px solid rgba(75, 85, 99, 0.3)',
                                                boxShadow: '0 2px 10px rgba(0,0,0,0.4)'
                                            }}
                                        >
                                            <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Step 2.1</span>
                                        </motion.div>
                                    </div>
                                    <div style={{ marginTop: '2rem', color: '#a0a0a0', fontSize: '0.9rem' }}>Hierarchical Learning Path</div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
