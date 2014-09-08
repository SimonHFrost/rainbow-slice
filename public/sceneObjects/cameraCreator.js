window.CameraCreator = (function() {
  "use strict";

  function CameraCreator() {
  }

  CameraCreator.prototype.create = function(screenWidth, screenHeight) {
    var camera = new THREE.PerspectiveCamera(45, screenWidth / screenHeight, 1, 200000);
    camera.position.y = 5000;
    camera.position.z = 8000;
    camera.lookAt(new THREE.Vector3(0,0,0));

    return camera;
  };

  return CameraCreator;
})();
