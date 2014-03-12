var container;
var camera, scene, renderer, controls;
var mainCube, plane, clock;
var enemyMeshList = [];

var ASCIIFY = false;
var FLOOR_DIMENSIONS = 2000;

function init() {
  clock = new THREE.Clock();
  clock.start();

  var width = window.innerWidth || 2;
  var height = window.innerHeight || 2;

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 45, width / height, 1, 500000 );
  camera.position.y = 7000;
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

  // ASCII Effect
  effect = new THREE.AsciiEffect( renderer );
  effect.setSize( width, height );
  if(ASCIIFY) {
    container.appendChild( effect.domElement );
  } else {
    container.appendChild( renderer.domElement );
  }

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
  if(ASCIIFY) {
    effect.setSize( window.innerWidth, window.innerHeight );
  }
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  updateMovement();

  if (ASCIIFY) {
    effect.render( scene, camera );
  } else {
    renderer.render( scene, camera );
  }

  controls.update();

  facePlayer();
  fire();
  updateBulletPosition();

  detectEnemyCollisions();
  detectWallCollisions();
  detectBulletCollisions();
}
