var main = {
  init : function() {
    clock = new THREE.Clock();
    clock.start();

    scene = new THREE.Scene();
    sceneInitializer.initCameraAndLights();
    sceneInitializer.initSceneObjects();

    meshLoader.load();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;

    var container = document.createElement('div');
    document.body.appendChild( container );
    container.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    sound.init();

    window.addEventListener('resize', this.onWindowResize, false);
  },

  onWindowResize : function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight);
  },

  render : function() {
    renderer.clear();
    renderer.render( scene, camera );

    for(var i = 0; i < sceneObjects.allBullets.length; i++){
      sceneObjects.allBullets[i].update();
    }

    for(var j = 0; j < sceneObjects.enemies.length; j++){
      sceneObjects.enemies[j].update();
    }

    boundryCollisionDetector.detectWallCollisions();

    controls.update();
    movement.updateMovement();
    movementCollisionDetector.detectEnemyCollisions();

    this.checkStoryChanges();
  },

  checkStoryChanges : function() {
    var nonDeadEnemies = sceneObjects.enemies.filter(function (el) {
      return el.threeObject.dead !== true;
    });
    if(nonDeadEnemies.length === 0) {
      story.triggerWin();
    }

    if(story.health <= 0) {
      story.triggerDead();
    }
  }
};
