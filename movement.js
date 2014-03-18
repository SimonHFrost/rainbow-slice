var movement = {
  updateMovement : function() {
    var translationSpeed = 20;

    if (Key.isDown(Key.A)) {
      sceneObjects.player.position.x -= translationSpeed;
    }

    if (Key.isDown(Key.D)) {
      sceneObjects.player.position.x += translationSpeed;
    }

    if (Key.isDown(Key.W)) {
      sceneObjects.player.position.z -= translationSpeed;
    }

    if (Key.isDown(Key.S)) {
      sceneObjects.player.position.z += translationSpeed;
    }

    return;
  }
};
