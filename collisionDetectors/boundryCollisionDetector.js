var boundryCollisionDetector = {
  FLOOR_DIMENSIONS : 3000,
  directionStatus : {
    TOP : 0,
    RIGHT : 1,
    BOTTOM : 2,
    LEFT : 3,
  },

  detectWallCollisions : function() {
    this.putBackInBounds(sceneObjects.player);
    this.detectBoundryCollisionsEnemies();
  },

  detectBoundryCollisionsEnemies : function() {
    for (var i = 0; i < sceneObjects.enemies.length; i++) {
      this.putBackInBounds(sceneObjects.enemies[i].threeObject);
    }
  },

  putBackInBounds : function(misbehavor) {
    var status = this.getOutOfBoundsStatus(misbehavor.position);
    var width = misbehavor.geometry.width / 2;

    if (misbehavor.position.x > this.FLOOR_DIMENSIONS - width) {
      misbehavor.position.x = this.FLOOR_DIMENSIONS - width;
    }

    if (misbehavor.position.x < -this.FLOOR_DIMENSIONS + width) {
      misbehavor.position.x = -this.FLOOR_DIMENSIONS + width;
    }

    if (misbehavor.position.z > this.FLOOR_DIMENSIONS - width) {
      misbehavor.position.z = this.FLOOR_DIMENSIONS - width;
    }

    if (misbehavor.position.z < -this.FLOOR_DIMENSIONS + width) {
      misbehavor.position.z = -this.FLOOR_DIMENSIONS + width;
    }
  },

  deleteIfOutOfBounds : function(misbehavor) {
    if (this.getOutOfBoundsStatus(misbehavor.position) !== null) {
      scene.remove(misbehavor);
      sceneObjects.removeBullet(misbehavor);
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
