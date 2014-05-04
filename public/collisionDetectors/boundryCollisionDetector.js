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
    this.checkObjectInBounds(SceneObjects.allBullets[i].threeObject, true);
  }

  this.checkObjectInBounds(SceneObjects.player);

  for (var i = 0; i < SceneObjects.enemies.length; i++) {
    this.checkObjectInBounds(SceneObjects.enemies[i].threeObject, false);
  }
};

BoundryCollisionDetector.prototype.createRay = function() {
  this.ray = new THREE.Ray(this.RAY_ORIGIN, new THREE.Vector3(1, 1, 1));
};

BoundryCollisionDetector.prototype.checkObjectInBounds = function(objectToCheck, isBullet) {
  this.updateRayDirection(objectToCheck);
  var hitLocs = this.getRayHitLocs();
  this.modifyIfNecessary(objectToCheck, hitLocs, isBullet);
};

BoundryCollisionDetector.prototype.updateRayDirection = function(objectToCheck) {
  var underPlayer = objectToCheck.position.clone();
  underPlayer.y = this.RAY_OFFSET;
  var directionVector = new THREE.Vector3().subVectors(underPlayer, this.RAY_ORIGIN);
  directionVector = directionVector.normalize();
  this.ray.direction = directionVector;

  if (this.DEBUG_RAYTRACING) {
    this.line.geometry.vertices[0] = objectToCheck.position.clone();
    this.line.geometry.vertices[0].y = this.RAY_OFFSET;
    this.line.geometry.verticesNeedUpdate = true;
  }
};

BoundryCollisionDetector.prototype.getRayHitLocs = function() {
  var me = this;
  var hitLocs = [];

  IslandInitializer.triangles.forEach(function(triangle) {
    var value = me.ray.intersectTriangle(triangle.a, triangle.b, triangle.c);
    if(value) {
      hitLocs.push(value);
    }
  });

  return hitLocs;
};

BoundryCollisionDetector.prototype.modifyIfNecessary = function(objectToCheck, hitLocs, bullet) {
  if (hitLocs.length === 0) {
    if (bullet) {
      this.setObjectLocation(objectToCheck, new THREE.Vector3(0, 0, 0));
    } else {
      SceneObjects.toggleFalling(objectToCheck);
    }
  }

  if(hitLocs.length === 2) {
    var distToOrigin = objectToCheck.position.distanceTo(this.RAY_ORIGIN);
    var distToFirst = hitLocs[0].distanceTo(this.RAY_ORIGIN);
    var distToSecond = hitLocs[1].distanceTo(this.RAY_ORIGIN);

    var position = objectToCheck.position.clone();
    if(distToSecond < distToOrigin) {
      if (bullet) {
        SceneObjects.toggleFalling(objectToCheck);
      } else {
        this.setObjectLocation(objectToCheck, hitLocs[1]);
      }
    } else if (distToFirst > distToOrigin) {
      if (bullet) {
        SceneObjects.toggleFalling(objectToCheck);
      } else {
        this.setObjectLocation(objectToCheck, hitLocs[0]);
      }
    }
  }
};

BoundryCollisionDetector.prototype.setObjectLocation = function(objectToCheck, location) {
  objectToCheck.position = location;
  objectToCheck.position.y = 0;
};
