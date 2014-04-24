function BoundryCollisionDetector() {
  this.FLOOR_DIMENSIONS = 3000;
  this.RAY_OFFSET = -200;
  this.RAY_ORIGIN = new THREE.Vector3(-20000, this.RAY_OFFSET, -20000);
  this.DEBUG_RAYTRACING = false;
  this.directionStatus = {
    TOP : 0,
    RIGHT : 1,
    BOTTOM : 2,
    LEFT : 3,
  };

  this.createRay();
}

BoundryCollisionDetector.prototype.update = function() {
  for (var i = 0; i < SceneObjects.allBullets.length; i++) {
    this.deleteIfOutOfBounds(SceneObjects.allBullets[i].threeObject);
  }

  this.updateRay();
  this.checkRay();
  this.detectBoundryCollisionsEnemies();
};

BoundryCollisionDetector.prototype.createRay = function() {
  var underPlayer = SceneObjects.player.position.clone();
  underPlayer.y = this.RAY_OFFSET;

  if (this.DEBUG_RAYTRACING) {
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({color: 0xff69b4});

    geometry.vertices.push(underPlayer);
    geometry.vertices.push(this.RAY_ORIGIN);
    geometry.dynamic = true;

    this.line = new THREE.Line(geometry, material);
    scene.add(this.line);
  }

  var directionVector = new THREE.Vector3().subVectors(underPlayer, this.RAY_ORIGIN);
  directionVector = directionVector.normalize();
  this.ray = new THREE.Ray(this.RAY_ORIGIN, directionVector);
};

BoundryCollisionDetector.prototype.updateRay = function() {
  var underPlayer = SceneObjects.player.position.clone();
  underPlayer.y = this.RAY_OFFSET;
  var directionVector = new THREE.Vector3().subVectors(underPlayer, this.RAY_ORIGIN);
  directionVector = directionVector.normalize();
  this.ray.direction = directionVector;

  if (this.DEBUG_RAYTRACING) {
    this.line.geometry.vertices[0] = SceneObjects.player.position.clone();
    this.line.geometry.vertices[0].y = -200;
    this.line.geometry.verticesNeedUpdate = true;
  }
};

BoundryCollisionDetector.prototype.checkRay = function() {
  var me = this;
  var hitLocs = [];
  IslandInitializer.triangles.forEach(function(triangle) {
    var value = me.ray.intersectTriangle(triangle.a, triangle.b, triangle.c);
    if(value) {
      hitLocs.push(value);
    }
  });

  if (hitLocs.length === 0) {
    SceneObjects.player.position.x = 0;
    SceneObjects.player.position.z = 0;
  }

  if(hitLocs.length == 2) {
    var distToOrigin = SceneObjects.player.position.distanceTo(this.RAY_ORIGIN);
    var distToFirst = hitLocs[0].distanceTo(this.RAY_ORIGIN);
    var distToSecond = hitLocs[1].distanceTo(this.RAY_ORIGIN);

    var playerPosition = SceneObjects.player.position.clone();
    if(distToFirst < distToOrigin) {
      if(distToSecond < distToOrigin) {

        playerDistToFirst = hitLocs[0].distanceTo(playerPosition);
        playerDistToSecond = hitLocs[1].distanceTo(playerPosition);
        if(playerDistToFirst < playerDistToSecond) {
          SceneObjects.player.position = hitLocs[0];
          SceneObjects.player.position.y = 0;
        } else {
          SceneObjects.player.position = hitLocs[1];
          SceneObjects.player.position.y = 0;
        }
      }
    } else if (distToFirst > distToOrigin) {
      playerDistToFirst = hitLocs[0].distanceTo(playerPosition);
      playerDistToSecond = hitLocs[1].distanceTo(playerPosition);
      if(playerDistToFirst < playerDistToSecond) {
        SceneObjects.player.position = hitLocs[0];
        SceneObjects.player.position.y = 0;
      } else {
        SceneObjects.player.position = hitLocs[1];
        SceneObjects.player.position.y = 0;
      }
    }
  }
};

BoundryCollisionDetector.prototype.detectBoundryCollisionsEnemies = function() {
  for (var i = 0; i < SceneObjects.enemies.length; i++) {
    this.putBackInBounds(SceneObjects.enemies[i].threeObject);
  }
};

BoundryCollisionDetector.prototype.putBackInBounds = function(misbehavor) {
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
