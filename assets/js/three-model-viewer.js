// assets/js/three-model-viewer.js

function initializeThreeModelViewer(containerId, objPath) {
  const container = document.getElementById(containerId);
  const contentDiv = document.querySelector('.wrapper');
  const width = contentDiv.getBoundingClientRect().width;
  const height = width * 2 / 3;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 10, 100);
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

  // Load .obj model
  const loader = new THREE.OBJLoader();
  loader.load(objPath, function (object) {
    object.scale.set(1, 1, 1);
    scene.add(object);
  }, undefined, function (error) {
    console.error('OBJ Load Error:', error);
  });

  camera.position.z = 2;
  camera.position.x = 12;

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

  animate();
}