import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface Step {
    title: string;
    desc: string;
    icon: string;
    color: string;
}

const steps: Step[] = [
    { title: 'Module', desc: 'Master a specific skill', icon: '📦', color: '#FF0080' },
    { title: 'Lesson', desc: 'Broken down concepts', icon: '📝', color: '#7928CA' },
    { title: 'Step', desc: 'Bite-sized actions', icon: '⚡', color: '#0070F3' },
    { title: 'Topic', desc: 'Focused learning', icon: '🎯', color: '#00DFD8' },
    { title: 'AI Check', desc: 'Instant validation', icon: '🤖', color: '#FF4D4D' },
];

const Card = ({ step, index, scrollYProgress, totalSteps }: { step: Step; index: number; scrollYProgress: MotionValue<number>; totalSteps: number }) => {
    const stepRange = 1 / totalSteps;
    const start = index * stepRange;
    const end = start + stepRange;

    // Enhanced Y Position: Starts higher, drops in, pauses, then drops into envelope
    // Stack Offset: Cards stack from back to front.
    // To match the "fanned" image:
    // - Back card (Index 0) should be highest (lowest Y value).
    // - Front card (Index 4) should be lowest (highest Y value).
    // So we ADD the offset.
    const stackOffset = index * 40; // Spacing between cards
    const y = useTransform(
        scrollYProgress,
        [start, start + stepRange * 0.4, start + stepRange * 0.8, end],
        ['-100vh', '0vh', '0vh', `calc(20vh + ${stackOffset}px)`] // Dropping to ~20vh + offset
    );

    // Scale: Starts slightly larger, normalizes, then shrinks into envelope
    const scale = useTransform(
        scrollYProgress,
        [start, start + stepRange * 0.3, end - 0.1, end],
        [0.9, 1, 1, 0.95]
    );

    // Opacity: NO FADE OUT. Stays visible.
    const opacity = useTransform(
        scrollYProgress,
        [start, start + 0.1],
        [0, 1]
    );

    // 3D Rotation + Fan Effect
    // Fan: Rotate based on index relative to center.
    // Center is index 2.
    // Index 0: -10deg, Index 4: +10deg
    const fanRotation = (index - 2) * 5;

    // Initial fall rotation (random) -> Final fan rotation
    // const randomRotate = (index % 2 === 0 ? 1 : -1) * (index * 2); // Unused
    const rotateX = useTransform(
        scrollYProgress,
        [start, start + stepRange * 0.3, end],
        [60, 0, 0] // Flatten out X rotation
    );

    const rotateZ = useTransform(
        scrollYProgress,
        [end - 0.1, end],
        [0, fanRotation] // Apply fan rotation at the end
    );

    return (
        <motion.div
            style={{
                y,
                scale,
                opacity,
                rotateX,
                rotateZ,
                position: 'absolute',
                top: '30%',
                left: 0,
                right: 0,
                margin: 'auto',
                perspective: '1200px',
                zIndex: index + 20 // Higher index = on top of previous cards
            }}
            className="flow-card-wrapper"
        >
            <div className="flow-card">
                <div className="card-content" style={{
                    '--card-color': step.color,
                    // boxShadow removed to allow CSS 3D effect
                } as React.CSSProperties}>
                    <div className="card-header">
                        <span className="card-icon" style={{ background: `${step.color}20`, borderColor: `${step.color}40` }}>{step.icon}</span>
                        <div className="card-title-group">
                            <span className="card-step-label">Step {index + 1}</span>
                            <h3 style={{ color: step.color, textShadow: `0 0 10px ${step.color}40` }}>{step.title}</h3>
                        </div>
                    </div>
                    <p>{step.desc}</p>
                </div>
            </div>
        </motion.div>
    );
};

const EnvelopeLearningPath: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Envelope Flap Animation
    const flapRotate = useTransform(
        scrollYProgress,
        [0, 0.1, 0.9, 1],
        [0, 180, 180, 0] // 0 = Closed, 180 = Open
    );

    const envelopeGlow = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        ['0px 0px 0px rgba(0,223,216,0)', '0px 0px 100px rgba(0,223,216,0.2)', '0px 0px 0px rgba(0,223,216,0)']
    );

    // Flap Z-Index: Behind cards when open, in front when closed
    const flapZIndex = useTransform(
        scrollYProgress,
        (v) => (v > 0.1 && v < 0.9 ? 15 : 50) // Higher than cards (index+20 max is ~25)
    );

    return (
        <section ref={containerRef} className="envelope-scroll-section">
            <div className="sticky-container">
                <div className="header-content">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="badge"
                    >
                        LEARNING PIPELINE
                    </motion.div>
                    <h2>Structured for Success</h2>
                    <p>Every concept is broken down into digestible pieces.</p>
                </div>

                {/* Layer 1: Envelope Back & Flap (Dynamic Z) */}
                <div className="envelope-wrapper back-layer">
                    <div className="envelope-back"></div>
                    <motion.div
                        className="envelope-flap"
                        style={{ rotateX: flapRotate, zIndex: flapZIndex }}
                    ></motion.div>
                </div>

                {/* Layer 2: Cards */}
                <div className="cards-container">
                    {steps.map((step, index) => (
                        <Card
                            key={index}
                            step={step}
                            index={index}
                            scrollYProgress={scrollYProgress}
                            totalSteps={steps.length}
                        />
                    ))}
                </div>

                {/* Layer 3: Envelope Front */}
                <div className="envelope-wrapper front-layer">
                    <div className="envelope-front">
                        <span className="envelope-label">COLLECTED KNOWLEDGE</span>
                    </div>
                    <motion.div
                        className="envelope-glow"
                        style={{ boxShadow: envelopeGlow }}
                    />
                </div>
            </div>

            <style>{`
                .envelope-scroll-section {
                    height: 500vh;
                    position: relative;
                    background: #020205;
                    font-family: 'Aclonica', sans-serif;
                }

                .sticky-container {
                    position: sticky;
                    top: 0;
                    height: 100vh;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    padding: 40px 20px;
                }

                .header-content {
                    text-align: center;
                    z-index: 50; /* Ensure header is on top */
                    margin-top: 40px;
                }

                .badge {
                    display: inline-block;
                    padding: 6px 12px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    letter-spacing: 2px;
                    color: #00DFD8;
                    margin-bottom: 16px;
                }

                .header-content h2 {
                    font-size: 3.5rem;
                    font-weight: 700;
                    background: linear-gradient(to right, #fff, #a5a5a5);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 16px;
                    letter-spacing: -1px;
                }

                .header-content p {
                    color: #888;
                    font-size: 1.2rem;
                    font-weight: 400;
                    max-width: 500px;
                    margin: 0 auto;
                }

                /* Envelope Positioning */
                .envelope-wrapper {
                    position: absolute;
                    bottom: -20px; /* Lowered even more */
                    left: 50%;
                    transform: translateX(-50%);
                    width: 800px; /* Increased from 600px */
                    height: 450px; /* Increased from 340px */
                    perspective: 1000px;
                    pointer-events: none;
                }

                .back-layer {
                    z-index: 10;
                }

                .front-layer {
                    z-index: 40; /* Higher than cards */
                }

                .cards-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    perspective: 1000px;
                    z-index: 20; /* Between back and front */
                }

                .flow-card-wrapper {
                    width: 750px; /* Increased from 560px */
                    height: 400px; /* Increased from 300px */
                }

                .flow-card {
                    width: 100%;
                    height: 100%;
                    transform-style: preserve-3d;
                }

                .card-content {
                    background: #1a1a24;
                    border-radius: 32px;
                    padding: 50px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    text-align: left;
                    position: relative;
                    overflow: hidden;
                    border: 1px solid rgba(255,255,255,0.05);
                    background-clip: padding-box;
                    /* 3D Thickness & Matte Look */
                    box-shadow: 
                        0 10px 0 #0f0f16, /* Solid shadow for thickness */
                        0 25px 50px rgba(0,0,0,0.5), /* Soft drop shadow */
                        inset 0 1px 0 rgba(255,255,255,0.1); /* Top edge highlight */
                }

                .card-content::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: -1;
                    margin: -1px;
                    border-radius: inherit;
                    background: linear-gradient(135deg, var(--card-color), transparent 50%);
                    opacity: 0.1; /* Reduced opacity for matte feel */
                }

                .card-header {
                    display: flex;
                    align-items: center;
                    gap: 32px;
                    margin-bottom: 32px;
                }

                .card-icon {
                    width: 90px; /* Larger icon */
                    height: 90px;
                    border-radius: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 3.5rem;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                }

                .card-title-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .card-step-label {
                    font-family: 'Montserrat', sans-serif;
                    font-size: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: #888;
                    font-weight: 600;
                }

                .card-content h3 {
                    font-family: 'Aclonica', sans-serif;
                    font-size: 3rem; /* Larger title */
                    margin: 0;
                    line-height: 1.2;
                    text-shadow: 0 0 20px rgba(var(--card-rgb), 0.5);
                }

                .card-content p {
                    font-family: 'Montserrat', sans-serif;
                    font-size: 1.4rem;
                    color: #ccc;
                    line-height: 1.6;
                    font-weight: 400;
                    max-width: 90%;
                }

                .envelope-back {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 100%;
                    background: #151525;
                    border-radius: 24px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                    border: 1px solid rgba(255,255,255,0.05);
                }

                .envelope-front {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 280px; /* Increased front height */
                    background: linear-gradient(165deg, #252545, #1a1a2e);
                    border-radius: 0 0 24px 24px;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 40;
                    box-shadow: 0 -5px 20px rgba(0,0,0,0.2);
                }

                .envelope-flap {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #1e1e35;
                    clip-path: polygon(0 0, 50% 55%, 100% 0);
                    transform-origin: top;
                    transition: all 0.5s ease;
                    border-top: 1px solid rgba(255,255,255,0.1);
                }
                
                .envelope-label {
                    font-family: 'Orbitron', sans-serif;
                    color: rgba(255,255,255,0.4);
                    letter-spacing: 3px;
                    font-size: 1rem;
                    font-weight: 600;
                    margin-top: 60px;
                }

                .envelope-glow {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 10;
                }
            `}</style>
        </section>
    );
};

export default EnvelopeLearningPath;
