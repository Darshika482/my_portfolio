import React, { useEffect, useRef, useState } from 'react';
import { generateThumbnails } from '../modules/thumbnailRenderer';

const features = [
    {
        id: 'project-lessons',
        title: 'Project-first Lessons',
        desc: 'Real tasks, not just theory. Ship small projects and learn by doing.',
        iconType: 'cube'
    },
    {
        id: 'ai-assistant',
        title: 'AI Assistant',
        desc: 'Context-aware hints that help you debug and iterate.',
        iconType: 'wave'
    },
    {
        id: 'practice-sandbox',
        title: 'Practice Sandbox',
        desc: 'Run, test, and publish inside the browser — no setup.',
        iconType: 'node'
    }
];

const FeatureGrid: React.FC = () => {
    const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        // Generate thumbnails once
        const generate = async () => {
            try {
                const urls = await generateThumbnails(['cube', 'wave', 'node']);
                setThumbnails(urls);
            } catch (e) {
                console.error("Failed to generate thumbnails", e);
            }
        };

        // Defer generation to avoid blocking main thread during load
        requestIdleCallback(() => generate());
    }, []);

    return (
        <section className="feature-grid" id="features">
            {features.map((feature) => (
                <div key={feature.id} className="feature-card">
                    <div className="feature-icon-wrapper">
                        {thumbnails[feature.iconType] ? (
                            <img src={thumbnails[feature.iconType]} alt="" className="feature-icon-3d" />
                        ) : (
                            <div className={`feature-placeholder ${feature.iconType}`} />
                        )}
                    </div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-desc">{feature.desc}</p>
                </div>
            ))}

            <style>{`
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
          padding: 60px 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 32px;
          transition: transform 0.3s, background 0.3s, box-shadow 0.3s;
          cursor: default;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          border-color: var(--neon-green);
        }

        .feature-icon-wrapper {
          width: 64px;
          height: 64px;
          margin-bottom: 24px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .feature-icon-3d {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 0 10px rgba(18, 230, 185, 0.2));
          transition: transform 0.3s;
        }

        .feature-card:hover .feature-icon-3d {
          transform: scale(1.1) rotate(5deg);
        }

        .feature-title {
          font-size: 1.25rem;
          margin-bottom: 12px;
          color: var(--text-main);
        }

        .feature-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .feature-placeholder {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: var(--glass-border);
        }
      `}</style>
        </section>
    );
};

export default FeatureGrid;
