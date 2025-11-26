import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ProgressStrip: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        let renderer: THREE.WebGLRenderer;
        let scene: THREE.Scene;
        let camera: THREE.PerspectiveCamera;
        let frameId: number;
        let line: THREE.Line;

        const init = () => {
            const width = containerRef.current!.clientWidth;
            const height = 100;

            renderer = new THREE.WebGLRenderer({
                canvas: canvasRef.current!,
                alpha: true,
                antialias: true
            });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
            camera.position.z = 20;

            // Create a simple wave line
            const points = [];
            const segmentCount = 32;
            for (let i = 0; i <= segmentCount; i++) {
                const x = (i / segmentCount) * 40 - 20;
                const y = Math.sin(i * 0.5) * 2;
                points.push(new THREE.Vector3(x, y, 0));
            }

            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: 0x12E6B9,
                linewidth: 2,
                transparent: true,
                opacity: 0.6
            });

            line = new THREE.Line(geometry, material);
            scene.add(line);

            // Add some dots
            const dotGeo = new THREE.BufferGeometry();
            const dotPos = [];
            for (let i = 0; i < 5; i++) {
                dotPos.push((i / 4) * 40 - 20, Math.sin((i / 4) * 16) * 2, 0);
            }
            dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPos, 3));
            const dotMat = new THREE.PointsMaterial({
                color: 0x8F5CFF,
                size: 0.5,
                transparent: true,
                opacity: 0.8
            });
            const dots = new THREE.Points(dotGeo, dotMat);
            scene.add(dots);

            const animate = () => {
                const time = Date.now() * 0.001;

                // Animate line vertices
                const positions = line.geometry.attributes.position.array as Float32Array;
                for (let i = 0; i <= segmentCount; i++) {
                    positions[i * 3 + 1] = Math.sin(i * 0.5 + time) * 2;
                }
                line.geometry.attributes.position.needsUpdate = true;

                // Animate dots
                const dotPositions = dots.geometry.attributes.position.array as Float32Array;
                for (let i = 0; i < 5; i++) {
                    // Simple follow logic or independent wave
                    dotPositions[i * 3 + 1] = Math.sin((i / 4) * 16 + time) * 2;
                }
                dots.geometry.attributes.position.needsUpdate = true;

                renderer.render(scene, camera);
                frameId = requestAnimationFrame(animate);
            };

            animate();
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                init();
                observer.disconnect();
            }
        });

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
            if (frameId) cancelAnimationFrame(frameId);
            if (renderer) renderer.dispose();
        };
    }, []);

    return (
        <div className="progress-strip" ref={containerRef}>
            <div className="strip-label">Your Journey</div>
            <canvas ref={canvasRef} className="strip-canvas" />
            <style>{`
        .progress-strip {
          width: 100%;
          height: 120px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin: 40px 0;
        }
        .strip-label {
          position: absolute;
          left: 40px;
          color: var(--text-muted);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .strip-canvas {
          width: 100%;
          height: 100%;
        }
      `}</style>
        </div>
    );
};

export default ProgressStrip;
