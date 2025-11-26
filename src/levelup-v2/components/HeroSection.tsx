import React from 'react';
import Hero3DCard from './Hero3DCard';

interface HeroSectionProps {
    isLowPower: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isLowPower }) => {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1 className="hero-headline">
                    Create. Build. Learn.<br />
                    <span className="text-gradient">Hands-on AI, made simple.</span>
                </h1>
                <p className="hero-subhead">
                    LevelUp guides you from concept to deployed project — practical lessons, live sandboxes, and AI-powered hints.
                </p>

                <div className="hero-ctas">
                    <button className="btn-primary">Start a Project</button>
                    <button className="btn-secondary">Watch 2-minute demo</button>
                </div>

                <div className="hero-stats">
                    <div className="stat-item">
                        <span className="stat-val">2M+</span>
                        <span className="stat-label">Exercises</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-val">50k+</span>
                        <span className="stat-label">Projects</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-val">99.9%</span>
                        <span className="stat-label">Uptime</span>
                    </div>
                </div>
            </div>

            <div className="hero-visual">
                <Hero3DCard isLowPower={isLowPower} />
            </div>

            <style>{`
        .hero-section {
          display: flex;
          flex-direction: column;
          padding: 120px 40px 60px;
          max-width: 1200px;
          margin: 0 auto;
          gap: 60px;
          align-items: center;
        }

        @media (min-width: 900px) {
          .hero-section {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            text-align: left;
            height: 90vh;
            min-height: 600px;
          }
        }

        .hero-content {
          flex: 1;
          max-width: 600px;
          z-index: 2;
        }

        .hero-headline {
          font-size: 2.5rem;
          line-height: 1.2;
          margin-bottom: 24px;
          font-weight: 700;
        }

        @media (min-width: 768px) {
          .hero-headline {
            font-size: 3.5rem;
          }
        }

        .text-gradient {
          background: linear-gradient(90deg, #fff, var(--neon-green));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subhead {
          font-size: 1.1rem;
          color: var(--text-muted);
          margin-bottom: 40px;
          line-height: 1.6;
          max-width: 480px;
        }

        .hero-ctas {
          display: flex;
          gap: 16px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          gap: 24px;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .stat-val {
          color: var(--text-main);
          font-weight: 600;
          margin-right: 6px;
        }

        .stat-divider {
          width: 4px;
          height: 4px;
          background: var(--glass-border);
          border-radius: 50%;
        }

        .hero-visual {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          width: 100%;
          max-width: 500px;
          z-index: 2;
        }
      `}</style>
        </section>
    );
};

export default HeroSection;
