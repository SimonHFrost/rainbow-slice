var main = {
  init : function() {
    clock = new THREE.Clock();
    clock.start();

    meshLoader.load();

    scene = new THREE.Scene();
    sceneInitializer.initCameraAndLights();
    sceneInitializer.initSceneObjects();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(VIEWER_WIDTH, VIEWER_HEIGHT);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    renderer.domElement.style.display = "inline";

    var container = document.getElementById('webglDiv');
    container.appendChild( renderer.domElement );

    if (DEBUG_MODE) {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
    }

    sound.init();

    window.addEventListener('resize', this.onWindowResize, false);
  },

  render : function() {
    renderer.clear();
    renderer.render(scene, camera);

    for(var i = 0; i < sceneObjects.allBullets.length; i++){
      sceneObjects.allBullets[i].update();
    }

    for(var j = 0; j < sceneObjects.enemies.length; j++){
      sceneObjects.enemies[j].update();
    }

    sceneObjects.enemySpawner.update();

    boundryCollisionDetector.detectWallCollisions();

    if (DEBUG_MODE) {
      controls.update();
    }

    movement.updateMovement();
    movementCollisionDetector.detectEnemyCollisions();

    if(movement.isMoving) {
        for (var k = 0; k < sceneObjects.morphs.length; k++) {
          var morph = sceneObjects.morphs[k];
          morph.updateAnimation(50000 * clock.getDelta());
        }
    }

    this.checkStoryChanges();
  },

  checkStoryChanges : function() {
    if(story.health <= 0) {
      story.triggerDead();
    }
  }
};
