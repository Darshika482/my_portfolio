import React from 'react';

const Gamification: React.FC = () => {
    return (
        <section className="gamification-section">
            <h2>Stay Motivated</h2>
            <div className="badges-container">
                <div className="game-badge">
                    <div className="badge-icon">🔥</div>
                    <span>Streak Master</span>
                </div>
                <div className="game-badge">
                    <div className="badge-icon">🏆</div>
                    <span>Quiz Ace</span>
                </div>
                <div className="game-badge">
                    <div className="badge-icon">⭐</div>
                    <span>Consistent</span>
                </div>
            </div>

            <style>{`
        .gamification-section {
          padding: 80px 40px;
          text-align: center;
        }

        .gamification-section h2 {
          font-size: 2rem;
          margin-bottom: 40px;
        }

        .badges-container {
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .game-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .badge-icon {
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          border: 2px solid var(--neon-green);
          box-shadow: 0 0 20px rgba(18, 230, 185, 0.2);
        }

        .game-badge span {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.9rem;
          color: var(--text-muted);
        }
      `}</style>
        </section>
    );
};

export default Gamification;
