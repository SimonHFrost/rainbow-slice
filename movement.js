function updateMovement() {
  var translationSpeed = 15;
  
  if (Key.isDown(Key.A)) {
    sphere.position.x -= translationSpeed;
  }

  if (Key.isDown(Key.D)) {
    sphere.position.x += translationSpeed;
  }

  if (Key.isDown(Key.W)) {
    sphere.position.z -= translationSpeed;
  }

  if (Key.isDown(Key.S)) {
    sphere.position.z += translationSpeed;
  }
}
