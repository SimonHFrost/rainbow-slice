var movement = {
  updateMovement : function() {
    var translationSpeed = 20;
    var fullRotation = 2 * Math.PI;


    if (Key.isDown(Key.A)) {
      sceneObjects.player.position.x -= translationSpeed;
      sceneObjects.playerModel.rotation.y = 0.75 * fullRotation;
    }

    if (Key.isDown(Key.D)) {
      sceneObjects.player.position.x += translationSpeed;
      sceneObjects.playerModel.rotation.y = 0.25 * fullRotation;
    }

    if (Key.isDown(Key.W)) {
      sceneObjects.player.position.z -= translationSpeed;
      sceneObjects.playerModel.rotation.y = 0.5 * fullRotation;
    }

    if (Key.isDown(Key.S)) {
      sceneObjects.player.position.z += translationSpeed;
      sceneObjects.playerModel.rotation.y = 0 * fullRotation;
    }

    return;
  }
};
