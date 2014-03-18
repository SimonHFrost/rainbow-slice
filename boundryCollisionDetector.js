var boundryCollisionDetector = {
  FLOOR_DIMENSIONS : 3000,
  health : 1000,
  directionStatus : {
    TOP : 0,
    RIGHT : 1,
    BOTTOM : 2,
    LEFT : 3,
  },

  detectWallCollisions : function() {
    this.putBackInBounds(sceneObjects.player);
    this.deleteBulletsIfOutOfBounds();
    this.detectBoundryCollisionsEnemies();
  },

  deleteBulletsIfOutOfBounds : function() {
    for (var i = 0; i < sceneObjects.allBullets.length; i++) {
      this.deleteIfOutOfBounds(sceneObjects.allBullets[i]);
    }
  },

  detectBoundryCollisionsEnemies : function() {
    for (var i = 0; i < sceneObjects.enemies.length; i++) {
      this.putBackInBounds(sceneObjects.enemies[i]);
    }
  },

  putBackInBounds : function(misbehavor) {
    var status = this.getOutOfBoundsStatus(misbehavor.position);

    switch(status) {
    case this.directionStatus.RIGHT:
      misbehavor.position.x = this.FLOOR_DIMENSIONS;
      break;
    case this.directionStatus.LEFT:
      misbehavor.position.x = -this.FLOOR_DIMENSIONS;
      break;
    case this.directionStatus.TOP:
      misbehavor.position.z = this.FLOOR_DIMENSIONS;
      break;
    case this.directionStatus.BOTTOM:
      misbehavor.position.z = -this.FLOOR_DIMENSIONS;
      break;
    }
  },

  deleteIfOutOfBounds : function(misbehavor) {
    if (this.getOutOfBoundsStatus(misbehavor.position) !== null) {
      scene.remove(misbehavor);
    }
  },

  getOutOfBoundsStatus : function(position) {
    if (position.x > this.FLOOR_DIMENSIONS) {
      return this.directionStatus.RIGHT;
    }

    if (position.x < -this.FLOOR_DIMENSIONS) {
      return this.directionStatus.LEFT;
    }

    if (position.z > this.FLOOR_DIMENSIONS) {
      return this.directionStatus.TOP;
    }

    if (position.z < -this.FLOOR_DIMENSIONS) {
      return this.directionStatus.BOTTOM;
    }

    return null;
  }
};
