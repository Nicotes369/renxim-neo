// assets/js/quantum-object.js

(function() {
    let scene, camera, renderer, loader, quantumObject;

    function init() {
        const container = document.getElementById('quantum-3d-object');

        // Create scene
        scene = new THREE.Scene();

        // Create camera
        camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        camera.position.z = 5;

        // Create renderer
        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        container.appendChild(renderer.domElement);

        // Add light
        const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        camera.add(pointLight);
        scene.add(camera);

        // Load 3D model
        loader = new THREE.GLTFLoader();
        loader.load('assets/models/quantum_model.glb', function(gltf) {
            quantumObject = gltf.scene;
            scene.add(quantumObject);
            animate();
        }, undefined, function(error) {
            console.error('An error happened while loading the 3D model.', error);
        });

        // Handle resizing
        window.addEventListener('resize', onWindowResize);
    }

    function animate() {
        requestAnimationFrame(animate);

        if (quantumObject) {
            quantumObject.rotation.y += 0.005; // Rotate the object
        }

        renderer.render(scene, camera);
    }

    function onWindowResize() {
        const container = document.getElementById('quantum-3d-object');
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    }

    // Initialize on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
        init();
    });
})();
