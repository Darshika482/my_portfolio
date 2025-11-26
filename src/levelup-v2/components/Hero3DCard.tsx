import React, { useEffect, useRef, useState } from 'react';

interface Hero3DCardProps {
    isLowPower: boolean;
}

const Hero3DCard: React.FC<Hero3DCardProps> = ({ isLowPower }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (isLowPower || !containerRef.current || !canvasRef.current) return;

        let cleanupScene: (() => void) | undefined;

        const init = async () => {
            try {
                const { initHeroScene } = await import('../modules/heroScene');
                cleanupScene = initHeroScene(canvasRef.current!);
                setIsLoaded(true);
            } catch (err) {
                console.error("Failed to load 3D scene:", err);
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                init();
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
            if (cleanupScene) cleanupScene();
        };
    }, [isLowPower]);

    return (
        <div className="glass-card" ref={containerRef}>
            {(!isLoaded || isLowPower) && (
                <div className="fallback-image">
                    {/* Placeholder for fallback image */}
                    <div className="placeholder-orb"></div>
                </div>
            )}

            {!isLowPower && (
                <canvas
                    ref={canvasRef}
                    className="hero-canvas"
                    aria-hidden="true"
                />
            )}

            <div className="sr-only">
                Interactive 3D visualization of a learning orb, representing AI knowledge.
            </div>

            <style>{`
        .glass-card {
          width: 100%;
          aspect-ratio: 420/280;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
        }

        .hero-canvas {
          width: 100%;
          height: 100%;
          display: block;
          opacity: 0;
          animation: fadeIn 1s forwards;
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        .fallback-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at center, #1a1a2e 0%, #050508 70%);
        }

        .placeholder-orb {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--neon-green), var(--soft-purple));
          box-shadow: 0 0 30px rgba(18, 230, 185, 0.3);
          opacity: 0.8;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
        </div>
    );
};

export default Hero3DCard;
