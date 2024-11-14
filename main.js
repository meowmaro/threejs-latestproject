const gltfLoader = new THREE.GLTFLoader();

const myDiv = document.getElementById('myDiv');
const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
myDiv.appendChild(canvas);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true
});

const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);

let gltf;

const loader = new THREE.GLTFLoader();
loader.load('./model/gaysexfinal.gltf', (gltf) => {
  scene.add(gltf.scene);

  const box = new THREE.Box3().setFromObject(gltf.scene);
  const center = box.getCenter(new THREE.Vector3());
  camera.position.copy(center);
  camera.position.z += 5;

  const size = box.getSize(new THREE.Vector3());
  const maxSize = Math.max(size.x, size.y, size.z);
  camera.zoom = 1 / (maxSize / 2);
  camera.updateProjectionMatrix();

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 1, 1);
  scene.add(light);

  function animate() {
    requestAnimationFrame(animate);

    gltf.scene.rotation.z += 0.01;
    gltf.scene.rotation.x = THREE.MathUtils.degToRad(87);
    camera.lookAt(gltf.scene.position);
    renderer.render(scene, camera);
  }

  animate();
});