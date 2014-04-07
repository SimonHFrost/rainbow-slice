function Main() {
    var sceneInitializer = new SceneInitializer();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(Main.VIEWER_WIDTH, Main.VIEWER_HEIGHT);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    renderer.domElement.style.display = "inline";

    var container = document.getElementById('webglDiv');
    container.appendChild( renderer.domElement );

    if (Main.DEBUG_MODE) {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
    }
}

Main.VIEWER_WIDTH = 1000;
Main.VIEWER_HEIGHT = 562.5;
Main.DEBUG_MODE = true;

Main.prototype.render = function() {
  renderer.clear();
  renderer.render(scene, camera);

  for(var i = 0; i < sceneObjects.allBullets.length; i++){
    sceneObjects.allBullets[i].update();
  }

  for(var j = 0; j < sceneObjects.enemies.length; j++){
    sceneObjects.enemies[j].update();
  }

  for (var k = 0; k < sceneObjects.updatableObjects.length; k++){
    sceneObjects.updatableObjects[k].update();
  }

  new BoundryCollisionDetector().detectWallCollisions();
  new MovementCollisionDetector().detectEnemyCollisions();

  if (Main.DEBUG_MODE) {
    controls.update();
  }

  if(sceneObjects.movement.isMoving) {
      for (var k = 0; k < sceneObjects.morphs.length; k++) {
        var morph = sceneObjects.morphs[k];
        morph.updateAnimation(50000 * sceneObjects.clock.getDelta());
      }
  }
};
