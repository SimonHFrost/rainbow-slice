function Main() {
    var sceneInitializer = new SceneInitializer();

    var connectionCount = new ConnectionCount($('#connectionCount'));

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(Main.VIEWER_WIDTH, Main.VIEWER_HEIGHT);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    renderer.domElement.style.display = "inline";

    var container = document.getElementById('webglDiv');
    container.appendChild(renderer.domElement);

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

  for (var i = 0; i < SceneObjects.updatableObjects.length; i++){
    SceneObjects.updatableObjects[i].update();
  }

  if (Main.DEBUG_MODE) {
    controls.update();
  }

  if(SceneObjects.movement.isMoving) {
      for (var i = 0; i < SceneObjects.morphs.length; i++) {
        var morph = SceneObjects.morphs[i];
        morph.updateAnimation(50000 * SceneObjects.clock.getDelta());
      }
  }
};
