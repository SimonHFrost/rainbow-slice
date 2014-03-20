var main = {
  init : function() {
    clock = new THREE.Clock();
    clock.start();

    scene = new THREE.Scene();
    sceneInitializer.initCameraAndLights();
    sceneInitializer.initSceneObjects();

    // meshLoader.load();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;

    var container = document.createElement('div');
    document.body.appendChild( container );
    container.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    sound.init();
    sound.playTheme();

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

    for(var i = 0; i < sceneObjects.allBullets.length; i++){
      sceneObjects.allBullets[i].update();
    }

    boundryCollisionDetector.detectWallCollisions();
    movementCollisionDetector.detectEnemyCollisions();
  }
};
