function BoundryCollisionDetector() {
  this.FLOOR_DIMENSIONS = 3000;
  this.directionStatus = {
    TOP : 0,
    RIGHT : 1,
    BOTTOM : 2,
    LEFT : 3,
  };
}

BoundryCollisionDetector.prototype.detectWallCollisions = function() {
  this.putBackInBounds(SceneObjects.player);
  this.detectBoundryCollisionsEnemies();
};

BoundryCollisionDetector.prototype.detectBoundryCollisionsEnemies = function() {
  for (var i = 0; i < SceneObjects.enemies.length; i++) {
    this.putBackInBounds(SceneObjects.enemies[i].threeObject);
  }
};

BoundryCollisionDetector.prototype.putBackInBounds = function(misbehavor) {
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
};

BoundryCollisionDetector.prototype.deleteIfOutOfBounds = function(misbehavor) {
  if (this.getOutOfBoundsStatus(misbehavor.position) !== null) {
    scene.remove(misbehavor);
    SceneObjects.removeBullet(misbehavor);
  }
};

BoundryCollisionDetector.prototype.getOutOfBoundsStatus = function(position) {
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
};
