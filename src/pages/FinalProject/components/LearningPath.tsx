import { motion } from 'framer-motion';

const LearningPath = () => {
    return (
        <section style={{
            padding: '6rem 2rem',
            background: '#020205',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4rem'
        }}>
            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '800px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                {/* Horizontal Line */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'rgba(139, 92, 246, 0.3)',
                    transform: 'translateY(-50%)',
                    zIndex: 0
                }} />

                {/* Active Line Segment */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: '#8b5cf6',
                        transform: 'translateY(-50%)',
                        transformOrigin: 'left',
                        zIndex: 0,
                        boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
                    }}
                />

                {/* Node 1 */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: '#020205',
                        border: '3px solid #8b5cf6',
                        boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)'
                    }} />
                </div>

                {/* Node 2 (Center - Glowing) */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Pulse Effect */}
                    <motion.div
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: 'rgba(139, 92, 246, 0.2)',
                            transform: 'translate(-50%, -50%)',
                            zIndex: -1
                        }}
                    />
                    {/* Core Node */}
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#020205',
                        border: '4px solid #8b5cf6',
                        boxShadow: '0 0 20px rgba(139, 92, 246, 0.6)'
                    }} />
                </div>

                {/* Node 3 */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: '#020205',
                        border: '3px solid #8b5cf6',
                        boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)'
                    }} />
                </div>
            </div>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                    color: '#a0a0a0',
                    fontSize: '1rem',
                    letterSpacing: '0.05em',
                    fontWeight: 300
                }}
            >
                Your Learning Path
            </motion.p>
        </section>
    );
};

export default LearningPath;
