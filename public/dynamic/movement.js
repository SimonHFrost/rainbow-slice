window.Movement = (function () {
  "use strict";
  function Movement(player) {
    this.TRANSLATION_SPEED = 40;
    this.TRANSLATION_ANGLED_SPEED = Math.sqrt(Math.pow(this.TRANSLATION_SPEED, 2) / 2);

    this.FULL_ROTATION = 2 * Math.PI;
    this.isMoving = false;

    this.player = player;
  }

  Movement.prototype.update = function() {
    this.movePlayer();
    this.rotatePlayer();
    this.setMovementStatus();
  };

  Movement.prototype.movePlayer = function() {
    if (Key.isDown(Key.A) && Key.isDown(Key.W)) {
      this.player.position.x -= this.TRANSLATION_ANGLED_SPEED;
      this.player.position.z -= this.TRANSLATION_ANGLED_SPEED;
    } else if (Key.isDown(Key.A) && Key.isDown(Key.S)) {
      this.player.position.x -= this.TRANSLATION_ANGLED_SPEED;
      this.player.position.z += this.TRANSLATION_ANGLED_SPEED;
    } else if (Key.isDown(Key.D) && Key.isDown(Key.S)) {
      this.player.position.x += this.TRANSLATION_ANGLED_SPEED;
      this.player.position.z += this.TRANSLATION_ANGLED_SPEED;
    } else if (Key.isDown(Key.D) && Key.isDown(Key.W)){
      this.player.position.x += this.TRANSLATION_ANGLED_SPEED;
      this.player.position.z -= this.TRANSLATION_ANGLED_SPEED;
    } else if (Key.isDown(Key.A)) {
      this.player.position.x -= this.TRANSLATION_SPEED;
    } else if (Key.isDown(Key.D)) {
      this.player.position.x += this.TRANSLATION_SPEED;
    } else if (Key.isDown(Key.W)) {
      this.player.position.z -= this.TRANSLATION_SPEED;
    } else if (Key.isDown(Key.S)) {
      this.player.position.z += this.TRANSLATION_SPEED;
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
    SceneObjects.playerModel.rotation.y = amount * this.FULL_ROTATION;
  };

  Movement.prototype.setMovementStatus = function() {
    if (Key.isDown(Key.W) || Key.isDown(Key.S) || Key.isDown(Key.A) || Key.isDown(Key.D)) {
      this.isMoving = true;
    } else {
      this.isMoving = false;
    }
  };

  return Movement;
})();
