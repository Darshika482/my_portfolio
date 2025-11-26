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
    // Calculate start and end points for this card's animation
    // We want cards to flow one by one.
    // Range: [start, enterEnvelope]
    const stepRange = 1 / totalSteps;
    const start = index * stepRange;
    const end = start + stepRange;

    // Y Position: Starts off-screen top (-50vh), moves to center, then to envelope (bottom)
    const y = useTransform(
        scrollYProgress,
        [start, start + stepRange * 0.5, end], // Keyframes: Start, Center (Read), End (Envelope)
        ['-50vh', '0vh', '40vh'] // Positions relative to center
    );

    // Scale: Normal at center, shrinks into envelope
    const scale = useTransform(
        scrollYProgress,
        [start + stepRange * 0.5, end],
        [1, 0.2]
    );

    // Opacity: Fades in, stays visible, fades out as it enters envelope
    const opacity = useTransform(
        scrollYProgress,
        [start, start + 0.1, end - 0.1, end],
        [0, 1, 1, 0]
    );

    // Rotation: Slight random rotation for natural feel
    const rotate = useTransform(
        scrollYProgress,
        [start, end],
        [Math.random() * 10 - 5, Math.random() * 10 - 5]
    );

    return (
        <motion.div
            style={{
                y,
                scale,
                opacity,
                rotate,
                position: 'absolute',
                top: '40%', // Start centered vertically
                left: 0,
                right: 0,
                margin: 'auto',
                zIndex: totalSteps - index, // Earlier cards on top? No, later cards on top usually. Let's try reverse.
            }}
            className="flow-card"
        >
            <div className="card-content" style={{ borderColor: step.color, boxShadow: `0 0 20px ${step.color}40` }}>
                <span className="card-icon">{step.icon}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
            </div>
        </motion.div>
    );
};

const EnvelopeLearningFlow: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Envelope Animation
    // Opens as cards approach? Or just stays open?
    // Let's make it "pulse" when a card enters.

    return (
        <section ref={containerRef} className="envelope-scroll-section">
            <div className="sticky-container">
                <div className="header-content">
                    <h2>Structured for Success</h2>
                    <p>Every concept is broken down into digestible pieces.</p>
                </div>

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

                <div className="envelope-container">
                    <div className="envelope-back"></div>
                    <div className="envelope-front">
                        <div className="envelope-flap"></div>
                        <span className="envelope-label">Your Knowledge</span>
                    </div>
                </div>
            </div>

            <style>{`
                .envelope-scroll-section {
                    height: 400vh; /* Long scroll track */
                    position: relative;
                    background: #050508;
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
                    z-index: 10;
                    margin-top: 40px;
                }

                .header-content h2 {
                    font-size: 3rem;
                    background: linear-gradient(to right, #fff, #00DFD8);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 10px;
                }

                .header-content p {
                    color: #888;
                    font-size: 1.2rem;
                }

                .cards-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                }

                .flow-card {
                    width: 300px;
                    height: 180px;
                    /* Positioning handled by motion */
                }

                .card-content {
                    background: rgba(20, 20, 30, 0.9);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    padding: 24px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    transition: transform 0.3s ease;
                }

                .card-icon {
                    font-size: 2.5rem;
                    margin-bottom: 12px;
                }

                .card-content h3 {
                    font-size: 1.5rem;
                    margin-bottom: 8px;
                    color: #fff;
                }

                .card-content p {
                    font-size: 0.9rem;
                    color: #aaa;
                }

                .envelope-container {
                    position: relative;
                    width: 320px;
                    height: 200px;
                    margin-bottom: 60px;
                    z-index: 20;
                }

                .envelope-back {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 100%;
                    background: #1a1a2e;
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }

                .envelope-front {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 120px; /* Pocket height */
                    background: linear-gradient(135deg, #2a2a4e, #1a1a2e);
                    border-radius: 0 0 10px 10px;
                    border-top: 2px solid rgba(255,255,255,0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 30; /* In front of cards */
                }

                .envelope-flap {
                    position: absolute;
                    top: -60px; /* Flap height */
                    left: 0;
                    width: 0; 
                    height: 0; 
                    border-left: 160px solid transparent;
                    border-right: 160px solid transparent;
                    border-top: 100px solid #232342; /* Flap color */
                    transform-origin: top;
                    z-index: 5; /* Behind front, in front of back */
                }
                
                .envelope-label {
                    font-family: 'Orbitron', sans-serif;
                    color: rgba(255,255,255,0.5);
                    letter-spacing: 2px;
                    font-size: 0.9rem;
                }
            `}</style>
        </section>
    );
};

export default EnvelopeLearningFlow;
