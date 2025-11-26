import React from 'react';

const TeacherTools: React.FC = () => {
    return (
        <section className="teacher-section">
            <div className="teacher-content">
                <div className="teacher-text">
                    <span className="badge">For Educators</span>
                    <h2>Build Your Own Curriculum</h2>
                    <p>
                        Create structured learning paths, quizzes, and projects.
                        Monitor student progress with detailed analytics.
                    </p>
                    <button className="btn-secondary">Explore Teacher Tools</button>
                </div>
                <div className="teacher-visual">
                    <div className="dashboard-card">
                        <div className="dash-header">Class Analytics</div>
                        <div className="dash-graph">
                            <div className="bar" style={{ height: '60%' }}></div>
                            <div className="bar" style={{ height: '80%' }}></div>
                            <div className="bar" style={{ height: '40%' }}></div>
                            <div className="bar" style={{ height: '90%' }}></div>
                            <div className="bar" style={{ height: '70%' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .teacher-section {
          padding: 100px 40px;
          background: #08080c;
        }

        .teacher-content {
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
          flex-wrap: wrap;
        }

        .teacher-text {
          flex: 1;
          min-width: 300px;
        }

        .badge {
          display: inline-block;
          padding: 6px 12px;
          background: rgba(143, 92, 255, 0.1);
          color: var(--soft-purple);
          border-radius: 4px;
          font-size: 0.8rem;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .teacher-text h2 {
          font-size: 2.5rem;
          margin-bottom: 24px;
        }

        .teacher-text p {
          color: var(--text-muted);
          margin-bottom: 32px;
          line-height: 1.6;
        }

        .teacher-visual {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .dashboard-card {
          width: 300px;
          height: 200px;
          background: #13131a;
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 24px;
          position: relative;
        }

        .dash-header {
          font-size: 1rem;
          color: var(--text-muted);
          margin-bottom: 24px;
        }

        .dash-graph {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 100px;
          padding-bottom: 10px;
          border-bottom: 1px solid #333;
        }

        .bar {
          width: 30px;
          background: var(--soft-purple);
          border-radius: 4px 4px 0 0;
          opacity: 0.8;
        }
      `}</style>
        </section>
    );
};

export default TeacherTools;
