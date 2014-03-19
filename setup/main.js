var main = {
  // Globals
  camera : '',
  scene : '',
  renderer : '',
  controls : '',
  clock : '',

  init : function() {
    clock = new THREE.Clock();
    clock.start();

    scene = new THREE.Scene();
    sceneInitializer.initCameraAndLights();
    sceneInitializer.initSceneObjects();

    meshLoader.load();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    var container = document.createElement('div');
    document.body.appendChild( container );
    container.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', this.onWindowResize, false);
  },

  onWindowResize : function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight);
  },

  render : function() {
    movement.updateMovement();

    renderer.clear();
    renderer.render( scene, camera );

    controls.update();

    shooting.facePlayer();
    shooting.fire();
    shooting.updateBulletPosition();

    boundryCollisionDetector.detectWallCollisions();
    movementCollisionDetector.detectEnemyCollisions();
    bulletCollisionDetector.detectBulletCollisions();
  }
};
