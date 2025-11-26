import * as THREE from 'three';

export const initHeroScene = (canvas: HTMLCanvasElement) => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height, false);
    renderer.toneMapping = THREE.NoToneMapping;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x8F5CFF, 1.5);
    dirLight.position.set(2, 2, 5);
    scene.add(dirLight);

    // Objects
    // 1. Low-poly Sphere
    const sphereGeo = new THREE.IcosahedronGeometry(1, 2); // ~80 faces
    const sphereMat = new THREE.MeshStandardMaterial({
        color: 0x12E6B9,
        roughness: 0.3,
        metalness: 0.8,
        flatShading: true,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // 2. Glowing Ring
    const ringGeo = new THREE.RingGeometry(1.4, 1.45, 64);
    const ringMat = new THREE.MeshBasicMaterial({
        color: 0x8F5CFF,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ring);

    // Animation Loop
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
        const time = clock.getElapsedTime();

        // Slow rotation
        sphere.rotation.y = time * 0.2;
        sphere.rotation.x = Math.sin(time * 0.5) * 0.1;

        ring.rotation.x = Math.PI / 2 + Math.sin(time * 0.3) * 0.1;
        ring.rotation.y = time * 0.1;

        // Subtle float
        sphere.position.y = Math.sin(time) * 0.1;
        ring.position.y = Math.sin(time) * 0.1;

        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
        if (!canvas) return;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(frameId);
        renderer.dispose();
        sphereGeo.dispose();
        sphereMat.dispose();
        ringGeo.dispose();
        ringMat.dispose();
    };
};
