var scene = new THREE.Scene(),
 camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000),
 renderer = new THREE.WebGLRenderer({ antialias: true }),
 controls = new THREE.OrbitControls(camera, renderer.domElement);
 cube,
 planet,
 moon;


function init() {
  camera.position.z = 1000;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;

  /*crate
  var crateGeometry = new THREE.BoxGeometry(5, 5, 5);
  var crateTexture = new THREE.TextureLoader().load('crate.jpg');
  var crateMaterial = new THREE.MeshBasicMaterial( {  map: crateTexture -- color: 0x00ff00 --});
  crate = new THREE.Mesh(crateGeometry, crateMaterial);
  scene.add(crate); */

  //light
  var pointLight = new THREE.PointLight(0xFFFFF);
  pointLight.position.z = 100;

  //planet
  var planetGeometry = new THREE.SphereGeometry(35,32,32);
  var planetTexture = new THREE.TextureLoader().load('planet.jpg');
  var planetMaterial = new THREE.MeshBasicMaterial({ map: planetTexture });
  planet = new THREE.Mesh(planetGeometry, planetMaterial);

  //moon
  var moonGeometry = new THREE.SphereGeometry(10,32,32);
  var moonTexture = new THREE.TextureLoader().load('moon.jpg');
  var moonMaterial = new THREE.MeshBasicMaterial( { map: moonTexture });
  moon = new THREE.Mesh(moonGeometry, moonMaterial);
  moon.position.set(300, 50, 200);

  //particles
  var geometry = new THREE.Geometry();
	for ( var i = 0; i < 10000; i ++ ) {
		var vertex = new THREE.Vector3();
		vertex.x = THREE.Math.randFloatSpread( 5000 );
		vertex.y = THREE.Math.randFloatSpread( 5000 );
		vertex.z = THREE.Math.randFloatSpread( 5000 );
		geometry.vertices.push( vertex );
	}
	var particles = new THREE.Points( geometry, new THREE.PointsMaterial( { color: 0x888888 } ) );

  scene.add(pointLight);
	scene.add(particles);
  scene.add(planet);
  scene.add(moon);
}

function render() {
  requestAnimationFrame(render);

  var upVector = new THREE.Vector3(-3, 8, 4);
  var axis = planet.position.clone().sub(upVector).normalize();
  moon.position.applyAxisAngle(axis, .05);

  planet.rotation.y += 0.02;
  moon.rotation.y += 0.05;

  renderer.render(scene, camera);
}
