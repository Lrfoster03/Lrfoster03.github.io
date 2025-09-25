// assets/js/three-model-viewer.js

function initializeThreeModelViewer(containerId, objPath) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error("Three.js container not found:", containerId);
    return;
  }
  const contentDiv = document.querySelector('.wrapper');
  const width = contentDiv.getBoundingClientRect().width;
  const height = width * 2 / 3;
  // Set OrbitControls target to the center of the model
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);
  
  // Lighting
  const ambient = new THREE.AmbientLight(0xffffff, 0.8);
  const directional = new THREE.DirectionalLight(0xffffff, 1);
  directional.position.set(1, 1, 1);
  scene.add(ambient);
  scene.add(directional);
  
  // Controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  loadModel(scene, controls, objPath);
  animate();

  // Functions
  function loadModel(scene, controls, modelPath) {
    const extension = modelPath.split('.').pop().toLowerCase();

    if (extension === 'obj') {
      const loader = new THREE.OBJLoader();
      loader.load(modelPath, function (object) {
        scene.add(object);
        frameObject(scene, camera, controls, object);
      }, undefined, function (error) {
        console.error('OBJ Load Error:', error);
      });

    } else if (extension === 'gltf' || extension === 'glb') {
      const loader = new THREE.GLTFLoader();
      loader.load(modelPath, function (gltf) {
        const mesh = gltf.scene;
        mesh.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        scene.add(gltf.scene);
        frameObject(scene, camera, controls, mesh);
      }, undefined, function (error) {
        console.error('GLTF Load Error:', error);
      });

    } else {
      console.error('Unsupported file format:', extension);
    }
  }

function frameObject(scene, camera, controls, object) {
  // Compute the bounding box of the object
  object.scale.set(1, 1, 1);

  const box = new THREE.Box3().setFromObject(object);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  // Recenter the model
  object.position.sub(center);
  // Add the object to the scene
  controls.target.copy(new THREE.Vector3(0, 0, 0));
  controls.update();

  // Compute the distance the camera needs to be
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180); // convert vertical fov to radians
  let cameraZ = maxDim / (2 * Math.tan(fov / 2));

  // Adjust rotation
  object.rotation.y = -45; // rotate to face upwards
  object.rotation.x = 0;
  object.rotation.z = 0;

  cameraZ *= 1.75; // zoom out a bit further

  camera.position.set(2, 2, cameraZ);
  camera.position.add(center);
  
  camera.near = maxDim / 100;
  camera.far = maxDim * 100;
  camera.updateProjectionMatrix();

  // Ensure OrbitControls rotates around the model center
  controls.target.copy(new THREE.Vector3(0, 0, 0));
  controls.update();
}

  function animate() {
    requestAnimationFrame(animate);
    controls.update(); 
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', () => {
    const newWidth = contentDiv.getBoundingClientRect().width;
    const newHeight = newWidth * 2 / 3;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });
}