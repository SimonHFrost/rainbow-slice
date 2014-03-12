// Globals
var camera, scene, renderer, controls;
var mainCube, clock;
var enemyMeshList = [];

function init() {
  clock = new THREE.Clock();
  clock.start();

  scene = new THREE.Scene();
  initCameraAndLights();
  initSceneObjects();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  var container = document.createElement( 'div' );
  document.body.appendChild( container );
  container.appendChild( renderer.domElement );

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  updateMovement();

  renderer.render( scene, camera );

  controls.update();

  facePlayer();
  fire();
  updateBulletPosition();

  detectEnemyCollisions();
  detectWallCollisions();
  detectBulletCollisions();
}
