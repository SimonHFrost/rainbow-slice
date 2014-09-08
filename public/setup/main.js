window.Main = (function () {
  "use strict";
  Main.DEBUG_MODE = true;

  function Main() {
    this.VIEWER_WIDTH = 1000;
    this.VIEWER_HEIGHT = 562.5;

    var materials = new Materials();

    this.scene = new THREE.Scene();
    var camera = new CameraCreator().create(this.VIEWER_WIDTH, this.VIEWER_HEIGHT);
    this.sceneObjects = new SceneObjects(this.scene, camera, materials);

    this.clock = new THREE.Clock();

    this.renderer = this.createRenderer();
    var container = $('#webglDiv')[0];
    container.insertBefore(this.renderer.domElement, container.firstChild);

    this.controls = new THREE.OrbitControls(this.sceneObjects.camera, renderer.domElement);
  }

  Main.prototype.createRenderer = function() {
    var renderer = new THREE.WebGLRenderer();

    renderer.setSize(this.VIEWER_WIDTH, this.VIEWER_HEIGHT);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    renderer.domElement.id = 'renderer';

    return renderer;
  };

  Main.prototype.render = function() {
    this.renderer.clear();
    this.renderer.render(this.scene, this.sceneObjects.camera);

    for (var i = 0; i < this.sceneObjects.updatableObjects.length; i++){
      this.sceneObjects.updatableObjects[i].update();
    }

    this.controls.update();

    if (this.sceneObjects.movement.isMoving) {
      var morph = this.sceneObjects.morphs[0];
      morph.updateAnimation(1000 * this.clock.getDelta());
    }
  };

  return Main;
})();
