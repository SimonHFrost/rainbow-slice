window.Main = (function () {
  "use strict";
  Main.VIEWER_WIDTH = 1000;
  Main.VIEWER_HEIGHT = 562.5;
  Main.DEBUG_MODE = true;

  function Main() {
      // shouldn't have to instantiate this and then not use it...
      var materials = new Materials();
      var scene = new THREE.Scene();
      var sceneInitializer = new SceneInitializer(scene);

      var renderer = new THREE.WebGLRenderer();
      this.renderer = renderer;
      renderer.setSize(Main.VIEWER_WIDTH, Main.VIEWER_HEIGHT);
      renderer.shadowMapEnabled = true;
      renderer.shadowMapSoft = true;
      renderer.domElement.id = 'renderer';

      var container = $('#webglDiv')[0];
      container.insertBefore(renderer.domElement, container.firstChild);

      this.controls = new THREE.OrbitControls(SceneObjects.camera, renderer.domElement);
  }

  Main.prototype.render = function() {
    this.renderer.clear();
    this.renderer.render(SceneObjects.scene, SceneObjects.camera);

    for (var i = 0; i < SceneObjects.updatableObjects.length; i++){
      SceneObjects.updatableObjects[i].update();
    }

    this.controls.update();

    if (SceneObjects.movement.isMoving) {
        for (var i = 0; i < SceneObjects.morphs.length; i++) {
          var morph = SceneObjects.morphs[i];
          morph.updateAnimation(100000 * SceneObjects.clock.getDelta());
        }
    }
  };

  return Main;
})();
