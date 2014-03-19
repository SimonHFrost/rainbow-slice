var movement = {
  TRANSLATION_SPEED : 20,
  FULL_ROTATION : 2 * Math.PI,

  updateMovement : function() {
    this.movePlayer();
    this.rotatePlayer();
  },

  movePlayer : function() {
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
  },

  rotatePlayer : function() {
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
  },

  setRotation : function(amount) {
    sceneObjects.playerModel.rotation.y = amount * this.FULL_ROTATION;
  }
};
