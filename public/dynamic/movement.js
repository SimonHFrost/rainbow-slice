function Movement() {
  this.TRANSLATION_SPEED = 20;
  this.FULL_ROTATION = 2 * Math.PI;
  this.isMoving = false;
}

Movement.prototype.update = function() {
  this.movePlayer();
  this.rotatePlayer();
  this.setMovementStatus();
};

Movement.prototype.movePlayer = function() {
  if (Key.isDown(Key.A)) {
    sceneObjects.player.position.x -= this.TRANSLATION_SPEED;
    this.setRotation(0.75);
  }

  if (Key.isDown(Key.D)) {
    sceneObjects.player.position.x += this.TRANSLATION_SPEED;
    this.setRotation(0.25);
  }

  if (Key.isDown(Key.W)) {
    sceneObjects.player.position.z -= this.TRANSLATION_SPEED;
    this.setRotation(0.5);
  }

  if (Key.isDown(Key.S)) {
    sceneObjects.player.position.z += this.TRANSLATION_SPEED;
    this.setRotation(0);
  }
};

Movement.prototype.rotatePlayer = function() {
  if (Key.isDown(Key.A)) {
    this.setRotation(0.75);
  }

  if (Key.isDown(Key.D)) {
    this.setRotation(0.25);
  }

  if (Key.isDown(Key.W)) {
    this.setRotation(0.5);
  }

  if (Key.isDown(Key.S)) {
    this.setRotation(0);
  }

  if (Key.isDown(Key.A) && Key.isDown(Key.W)) {
    this.setRotation(0.6125);
  }

  if (Key.isDown(Key.A) && Key.isDown(Key.S)) {
    this.setRotation(0.8625);
  }

  if (Key.isDown(Key.D) && Key.isDown(Key.S)) {
    this.setRotation(0.1125);
  }

  if (Key.isDown(Key.D) && Key.isDown(Key.W)){
    this.setRotation(0.3625);
  }
};

Movement.prototype.setRotation = function(amount) {
  sceneObjects.playerModel.rotation.y = amount * this.FULL_ROTATION;
};

Movement.prototype.setMovementStatus = function() {
  if (Key.isDown(Key.W) || Key.isDown(Key.S) || Key.isDown(Key.A) || Key.isDown(Key.D)) {
    this.isMoving = true;
  } else {
    this.isMoving = false;
  }
};
