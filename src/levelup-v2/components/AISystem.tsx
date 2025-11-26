import React from 'react';
import { motion } from 'framer-motion';

const AISystem: React.FC = () => {
    const personas = [
        { name: 'Mentor', role: 'Deep Explanations', color: '#12E6B9' },
        { name: 'Coach', role: 'Quick Hints', color: '#8F5CFF' },
        { name: 'Peer', role: 'Friendly Debugging', color: '#FF5C93' },
    ];

    return (
        <section className="ai-section">
            <div className="ai-content">
                <div className="ai-header">
                    <h2>Context-Aware Intelligence</h2>
                    <p>
                        It knows where you are. It knows what you're building.
                        It doesn't just give answers — it guides you.
                    </p>
                </div>

                <div className="personas-grid">
                    {personas.map((p, i) => (
                        <motion.div
                            key={p.name}
                            className="persona-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            viewport={{ once: true }}
                            style={{ borderColor: p.color }}
                        >
                            <div className="persona-glow" style={{ background: p.color }} />
                            <h3>{p.name}</h3>
                            <span>{p.role}</span>
                        </motion.div>
                    ))}
                </div>

                <div className="ai-features">
                    <div className="feature-pill">Global Knowledge Base</div>
                    <div className="feature-pill">Module Context</div>
                    <div className="feature-pill">Code Analysis</div>
                </div>
            </div>

            <style>{`
        .ai-section {
          padding: 100px 40px;
          position: relative;
        }

        .ai-content {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
        }

        .ai-header h2 {
          font-size: 2.5rem;
          margin-bottom: 16px;
          color: var(--text-main);
        }

        .ai-header p {
          color: var(--text-muted);
          font-size: 1.1rem;
          margin-bottom: 60px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .personas-grid {
          display: flex;
          justify-content: center;
          gap: 32px;
          flex-wrap: wrap;
          margin-bottom: 60px;
        }

        .persona-card {
          width: 200px;
          height: 240px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .persona-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          opacity: 0.1;
          filter: blur(40px);
          pointer-events: none;
        }

        .persona-card h3 {
          font-size: 1.5rem;
          margin-bottom: 8px;
          z-index: 2;
        }

        .persona-card span {
          font-size: 0.9rem;
          color: var(--text-muted);
          z-index: 2;
        }

        .ai-features {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .feature-pill {
          padding: 8px 24px;
          border-radius: 100px;
          border: 1px solid var(--glass-border);
          background: rgba(255, 255, 255, 0.02);
          font-size: 0.9rem;
          color: var(--text-muted);
        }
      `}</style>
        </section>
    );
};

export default AISystem;
