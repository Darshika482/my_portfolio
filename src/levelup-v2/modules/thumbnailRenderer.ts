import * as THREE from 'three';

export const generateThumbnails = async (types: string[]): Promise<Record<string, string>> => {
    const width = 256;
    const height = 256;

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true // Important for toDataURL
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(1); // Keep it small

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4;

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0x12E6B9, 1.5);
    dir.position.set(2, 2, 5);
    scene.add(dir);

    const results: Record<string, string> = {};

    const material = new THREE.MeshStandardMaterial({
        color: 0x8F5CFF,
        roughness: 0.4,
        metalness: 0.6,
    });

    for (const type of types) {
        // Clear scene objects
        scene.children = scene.children.filter(c => c instanceof THREE.Light || c instanceof THREE.Camera);

        let mesh;
        if (type === 'cube') {
            mesh = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 1.5), material);
            mesh.rotation.set(0.5, 0.5, 0);
        } else if (type === 'wave') {
            // Simple wave shape using a twisted plane or torus
            mesh = new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.3, 64, 8), material);
            mesh.rotation.set(0.2, 0.4, 0);
        } else if (type === 'node') {
            // Group of spheres
            mesh = new THREE.Group();
            const center = new THREE.Mesh(new THREE.IcosahedronGeometry(0.6, 1), material);
            mesh.add(center);
            const sat1 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.3, 0), material);
            sat1.position.set(1.2, 0, 0);
            mesh.add(sat1);
            const sat2 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.3, 0), material);
            sat2.position.set(-0.8, 1, 0);
            mesh.add(sat2);
            mesh.rotation.set(0, 0.5, 0);
        }

        if (mesh) {
            scene.add(mesh);
            renderer.render(scene, camera);
            results[type] = renderer.domElement.toDataURL('image/webp', 0.8);
        }
    }

    renderer.dispose();
    return results;
};
