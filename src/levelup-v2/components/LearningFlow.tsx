import React from 'react';
import { motion } from 'framer-motion';

const LearningFlow: React.FC = () => {
    const steps = [
        { title: 'Module', desc: 'Master a specific skill', icon: '📦' },
        { title: 'Lesson', desc: 'Broken down concepts', icon: '📝' },
        { title: 'Step', desc: 'Bite-sized actions', icon: '⚡' },
        { title: 'Topic', desc: 'Focused learning', icon: '🎯' },
        { title: 'AI Check', desc: 'Instant validation', icon: '🤖' },
    ];

    return (
        <section className="learning-flow-section">
            <div className="flow-header">
                <h2>Structured for Success</h2>
                <p>Stop watching. Start building. Our flow forces you to understand.</p>
            </div>

            <div className="flow-container">
                {steps.map((step, index) => (
                    <motion.div
                        key={step.title}
                        className="flow-step"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="step-icon">{step.icon}</div>
                        <div className="step-connector" />
                        <h3 className="step-title">{step.title}</h3>
                        <p className="step-desc">{step.desc}</p>
                    </motion.div>
                ))}
            </div>

            <style>{`
        .learning-flow-section {
          padding: 100px 40px;
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .flow-header h2 {
          font-size: 2.5rem;
          margin-bottom: 16px;
          background: linear-gradient(90deg, #fff, var(--neon-green));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .flow-header p {
          color: var(--text-muted);
          font-size: 1.1rem;
          margin-bottom: 60px;
        }

        .flow-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 20px;
          flex-wrap: wrap;
        }

        .flow-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 160px;
          position: relative;
        }

        .step-icon {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 16px;
          box-shadow: 0 0 20px rgba(0,0,0,0.2);
          z-index: 2;
        }

        .step-connector {
          display: none; /* Hidden on mobile/wrap */
        }

        @media (min-width: 900px) {
          .step-connector {
            display: block;
            position: absolute;
            top: 30px;
            left: 50%;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, var(--glass-border), transparent);
            z-index: 1;
          }
          
          .flow-step:last-child .step-connector {
            display: none;
          }
        }

        .step-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.1rem;
          margin-bottom: 8px;
          color: var(--text-main);
        }

        .step-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.4;
        }
      `}</style>
        </section>
    );
};

export default LearningFlow;
