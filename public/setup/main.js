window.Main = (function () {
  "use strict";
  Main.VIEWER_WIDTH = 1000;
  Main.VIEWER_HEIGHT = 562.5;
  Main.DEBUG_MODE = true;

  function Main() {
      // shouldn't have to instantiate this and then not use it...
      var materials = new Materials();
      this.scene = new THREE.Scene();
      this.sceneObjects = new SceneObjects(this.scene);

      var renderer = new THREE.WebGLRenderer();
      this.renderer = renderer;
      renderer.setSize(Main.VIEWER_WIDTH, Main.VIEWER_HEIGHT);
      renderer.shadowMapEnabled = true;
      renderer.shadowMapSoft = true;
      renderer.domElement.id = 'renderer';

      this.clock = new THREE.Clock();

      var container = $('#webglDiv')[0];
      container.insertBefore(renderer.domElement, container.firstChild);

      this.controls = new THREE.OrbitControls(this.sceneObjects.camera, renderer.domElement);
  }

  Main.prototype.render = function() {
    this.renderer.clear();
    this.renderer.render(this.scene, this.sceneObjects.camera);

    for (var i = 0; i < this.sceneObjects.updatableObjects.length; i++){
      this.sceneObjects.updatableObjects[i].update();
    }

    this.controls.update();

    if (this.sceneObjects.movement.isMoving) {
        for (var i = 0; i < SceneObjects.morphs.length; i++) {
          var morph = SceneObjects.morphs[i];
          morph.updateAnimation(1000 * this.clock.getDelta());
        }
    }
  };

  return Main;
})();
