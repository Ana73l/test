var scene, camera,renderer, controls,cube;

function init() {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = false;

  var geometry = new THREE.BoxGeometry(1, 1, 1);
  /*var texture = new THREE.TextureLoader().load('crate.gif');*/
  var material = new THREE.MeshBasicMaterial( { /* map: texture */ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}

function render() {
  requestAnimationFrame(render);

  cube.rotation.x += 0.05;

  renderer.render(scene, camera);
}
