import React from 'react';
import Scene3D from './canvas/Scene3D';
import './styles/LevelUpV2.css';

// Content Components (Pure HTML/CSS now, 3D is handled by Scene3D)
import HeroSection from './components/HeroSection';
import LearningFlow from './components/LearningFlow';
import PracticeEnvironment from './components/PracticeEnvironment';
import AISystem from './components/AISystem';
import TeacherTools from './components/TeacherTools';
import Gamification from './components/Gamification';

const LevelUpV2Page: React.FC = () => {
  return (
    <div className="levelup-v2-container">
      <nav className="levelup-nav">
        <div className="logo">LEVELUP</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <button className="btn-secondary">Sign In</button>
        </div>
      </nav>

      <Scene3D>
        <main className="scroll-content">
          {/* Page 1: Hero */}
          <section className="page-section hero-wrapper">
            <HeroSection isLowPower={false} />
          </section>

          {/* Page 2: Learning Flow */}
          <section className="page-section">
            <LearningFlow />
          </section>

          {/* Page 3: Practice */}
          <section className="page-section">
            <PracticeEnvironment />
          </section>

          {/* Page 4: AI System */}
          <section className="page-section">
            <AISystem />
          </section>

          {/* Page 5: Teacher & Gamification */}
          <section className="page-section">
            <TeacherTools />
            <Gamification />
          </section>

          <footer className="levelup-footer">
            <div className="footer-content">
              <div className="footer-brand">
                <h3>LEVELUP</h3>
                <p>Do more than you watch.</p>
              </div>
            </div>
          </footer>
        </main>
      </Scene3D>

      <style>{`
        /* Reset some styles for the new layout */
        .levelup-v2-container {
          height: 100vh;
          width: 100vw;
          overflow: hidden; /* Scroll is handled by R3F ScrollControls */
          background: #050508;
        }
        
        .page-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px;
          /* Ensure content is visible over 3D */
          position: relative;
          z-index: 1;
          pointer-events: none; /* Let clicks pass through to 3D if needed, but we need buttons to work */
        }
        
        /* Re-enable pointer events for interactive elements */
        .page-section * {
          pointer-events: auto;
        }

        /* Hide the old 3D card in HeroSection since we have the global one now */
        .hero-visual {
          display: none !important;
        }
        
        /* Adjust Hero Content to be full width or centered */
        .hero-content {
          max-width: 100%;
          text-align: center;
          align-items: center;
        }
        .hero-ctas {
          justify-content: center;
        }
        .hero-stats {
          justify-content: center;
        }
      `}</style>
    </div >
  );
};

export default LevelUpV2Page;
