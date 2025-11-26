import React, { useEffect, useRef } from 'react';

const Background3D: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        let cleanup: (() => void) | undefined;

        const init = async () => {
            try {
                const { initBackgroundScene } = await import('../modules/backgroundScene');
                cleanup = initBackgroundScene(canvasRef.current!);
            } catch (e) {
                console.error("Failed to init background", e);
            }
        };

        // Defer background init slightly
        setTimeout(init, 1000);

        return () => {
            if (cleanup) cleanup();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="bg-canvas"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0.4
            }}
        />
    );
};

export default Background3D;
