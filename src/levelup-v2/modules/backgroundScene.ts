import * as THREE from 'three';

export const initBackgroundScene = (canvas: HTMLCanvasElement) => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false // Disable AA for background to save perf
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1)); // Strict 1x for bg

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 10;

    // Low poly ribbon
    // Create a strip of triangles
    const geometry = new THREE.PlaneGeometry(40, 5, 20, 1);
    const material = new THREE.MeshBasicMaterial({
        color: 0x1a1a2e,
        wireframe: true,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide
    });

    const ribbon = new THREE.Mesh(geometry, material);
    scene.add(ribbon);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
        // Throttle background to 30fps equivalent if needed, but requestAnimationFrame is usually 60.
        // We can just move slowly.
        const time = clock.getElapsedTime();

        // Wave motion
        const positions = geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            // Original y is implicit, we modify z
            positions[i + 2] = Math.sin(x * 0.5 + time * 0.5) * 2;
        }
        geometry.attributes.position.needsUpdate = true;

        // Parallax
        ribbon.rotation.x = mouseY * 0.05;
        ribbon.rotation.y = mouseX * 0.05;

        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(frameId);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
    };
};
