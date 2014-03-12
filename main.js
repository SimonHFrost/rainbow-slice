var container;
var camera, scene, renderer, controls;
var mainCube, plane, clock;
var enemyMeshList = [];

var FLOOR_DIMENSIONS = 6000;

function init() {
  clock = new THREE.Clock();
  clock.start();

  var width = window.innerWidth;
  var height = window.innerHeight;

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 45, width / height, 1, 500000 );
  camera.position.y = 15000;
  camera.rotation.x = -Math.PI / 2;

  scene = new THREE.Scene();

  var pointLight = new THREE.PointLight( 0xffffff );
  pointLight.position.set( 500, 500, 500 );
  scene.add( pointLight );

  var ambientLight = new THREE.AmbientLight( 0x707070 );
  scene.add( ambientLight );

  initSceneObjects();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( width, height );

  container.appendChild( renderer.domElement );

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight - 100 );
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
