function Main() {
    // shouldn't have to instantiate this and then not use it...
    var materials = new Materials();
    var sceneInitializer = new SceneInitializer();

    var network = new Network($('#connectionCount'));
    SceneObjects.network = network;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(Main.VIEWER_WIDTH, Main.VIEWER_HEIGHT);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    renderer.domElement.style.display = "inline";
    renderer.domElement.style.float = "left";
    renderer.domElement.style.borderRightStyle = "solid";
    renderer.domElement.style.borderRightColor = "white";

    var container = $('#webglDiv')[0];
    container.insertBefore(renderer.domElement, container.firstChild);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
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

  controls.update();

  if(SceneObjects.movement.isMoving) {
      for (var i = 0; i < SceneObjects.morphs.length; i++) {
        var morph = SceneObjects.morphs[i];
        morph.updateAnimation(100000 * SceneObjects.clock.getDelta());
      }
  }
};
