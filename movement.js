var movement = {
  updateMovement : function() {
    var translationSpeed = 20;

    if (Key.isDown(Key.A)) {
      mainCube.position.x -= translationSpeed;
    }

    if (Key.isDown(Key.D)) {
      mainCube.position.x += translationSpeed;
    }

    if (Key.isDown(Key.W)) {
      mainCube.position.z -= translationSpeed;
    }

    if (Key.isDown(Key.S)) {
      mainCube.position.z += translationSpeed;
    }

    return;
  }
};
