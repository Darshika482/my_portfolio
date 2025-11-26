import React from 'react';
import { motion } from 'framer-motion';

const PracticeEnvironment: React.FC = () => {
    return (
        <section className="practice-section">
            <div className="practice-content">
                <div className="practice-text">
                    <h2>Real Practice Environment</h2>
                    <p>
                        No more switching tabs. Code, debug, and take notes side-by-side.
                        Everything is auto-saved and context-aware.
                    </p>
                    <ul className="feature-list">
                        <li>⚡ Live Execution</li>
                        <li>🤖 AI Debugging Assistant</li>
                        <li>📝 Rich-text Notes & Tagging</li>
                        <li>💾 Auto-save & Cloud Sync</li>
                    </ul>
                </div>

                <motion.div
                    className="practice-mockup"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="mockup-header">
                        <div className="dots">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                        </div>
                        <div className="tab active">main.js</div>
                        <div className="tab">notes.md</div>
                    </div>
                    <div className="mockup-body">
                        <div className="editor-pane">
                            <div className="line-numbers">
                                {Array.from({ length: 10 }).map((_, i) => <div key={i}>{i + 1}</div>)}
                            </div>
                            <div className="code-content">
                                <span className="keyword">const</span> <span className="func">LevelUp</span> = () ={'>'} {'{'}<br />
                                &nbsp;&nbsp;<span className="keyword">const</span> progress = <span className="string">"unstoppable"</span>;<br />
                                &nbsp;&nbsp;<span className="comment">// AI Hint: Try logging the result</span><br />
                                &nbsp;&nbsp;<span className="func">console</span>.<span className="method">log</span>(progress);<br />
                                &nbsp;&nbsp;<span className="keyword">return</span> <span className="bool">true</span>;<br />
                                {'}'};
                            </div>
                        </div>
                        <div className="notes-pane">
                            <h3>My Notes</h3>
                            <p>Remember to use <code>const</code> for variables that don't change.</p>
                            <div className="ai-hint-box">
                                <strong>AI Assistant:</strong> Looks like you're mastering variables! Want a quick challenge?
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style>{`
        .practice-section {
          padding: 100px 40px;
          background: linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%);
        }

        .practice-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 60px;
        }

        @media (min-width: 900px) {
          .practice-content {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .practice-text {
          flex: 1;
          max-width: 500px;
        }

        .practice-text h2 {
          font-size: 2.5rem;
          margin-bottom: 24px;
          color: var(--text-main);
        }

        .practice-text p {
          color: var(--text-muted);
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .feature-list {
          list-style: none;
          padding: 0;
        }

        .feature-list li {
          margin-bottom: 12px;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .practice-mockup {
          flex: 1.2;
          width: 100%;
          max-width: 700px;
          background: #0f0f13;
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        .mockup-header {
          background: #1a1a2e;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          border-bottom: 1px solid var(--glass-border);
        }

        .dots {
          display: flex;
          gap: 6px;
        }

        .dot { width: 12px; height: 12px; border-radius: 50%; }
        .red { background: #ff5f56; }
        .yellow { background: #ffbd2e; }
        .green { background: #27c93f; }

        .tab {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          color: var(--text-muted);
          padding: 4px 12px;
          border-radius: 4px;
        }

        .tab.active {
          background: #0f0f13;
          color: var(--text-main);
        }

        .mockup-body {
          display: flex;
          height: 300px;
        }

        .editor-pane {
          flex: 1.5;
          padding: 20px;
          border-right: 1px solid var(--glass-border);
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          display: flex;
          gap: 16px;
        }

        .line-numbers {
          color: #444;
          text-align: right;
          user-select: none;
        }

        .code-content {
          color: #d4d4d4;
        }

        .keyword { color: #c678dd; }
        .func { color: #61afef; }
        .string { color: #98c379; }
        .comment { color: #5c6370; font-style: italic; }
        .bool { color: #d19a66; }
        .method { color: #e5c07b; }

        .notes-pane {
          flex: 1;
          padding: 20px;
          background: #13131a;
          font-family: 'Inter', sans-serif;
        }

        .notes-pane h3 {
          font-size: 1rem;
          margin-bottom: 12px;
          color: var(--text-muted);
        }

        .notes-pane p {
          font-size: 0.9rem;
          color: #ccc;
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .ai-hint-box {
          background: rgba(18, 230, 185, 0.1);
          border: 1px solid rgba(18, 230, 185, 0.2);
          padding: 12px;
          border-radius: 8px;
          font-size: 0.85rem;
          color: var(--neon-green);
        }
      `}</style>
        </section>
    );
};

export default PracticeEnvironment;
