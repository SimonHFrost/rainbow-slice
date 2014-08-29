window.BoundaryCollisionDetector = (function () {
  "use strict";
  function BoundaryCollisionDetector(scene, player) {
    this.scene = scene;
    this.player = player;
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

  BoundaryCollisionDetector.prototype.update = function() {
    for (var i = 0; i < SceneObjects.allBullets.length; i++) {
      this.checkObjectInBounds(SceneObjects.allBullets[i].threeObject, true);
    }

    this.checkObjectInBounds(this.player);

    for (var i = 0; i < SceneObjects.enemies.length; i++) {
      this.checkObjectInBounds(SceneObjects.enemies[i].threeObject, false);
    }
  };

  BoundaryCollisionDetector.prototype.createRay = function() {
    this.ray = new THREE.Ray(this.RAY_ORIGIN, new THREE.Vector3(1, 1, 1));

    if (this.DEBUG_RAYTRACING) {
      var underPlayer = SceneObjects.player.position.clone();
      underPlayer.y = this.RAY_OFFSET;

      var geometry = new THREE.Geometry();
      var material = new THREE.LineBasicMaterial({color: 0xff69b4});

      geometry.vertices.push(underPlayer);
      geometry.vertices.push(this.RAY_ORIGIN);
      geometry.dynamic = true;

      this.line = new THREE.Line(geometry, material);
      this.scene.add(this.line);
    }
  };

  BoundaryCollisionDetector.prototype.checkObjectInBounds = function(objectToCheck, isBullet) {
    this.updateRayDirection(objectToCheck);
    var hitLocs = this.getRayHitLocs();
    this.modifyIfNecessary(objectToCheck, hitLocs, isBullet);
  };

  BoundaryCollisionDetector.prototype.updateRayDirection = function(objectToCheck) {
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

  BoundaryCollisionDetector.prototype.getRayHitLocs = function() {
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

  BoundaryCollisionDetector.prototype.modifyIfNecessary = function(objectToCheck, hitLocs, bullet) {
    if (hitLocs.length === 0) {
      if (bullet) {
        SceneObjects.toggleFalling(objectToCheck);
      } else {
        this.setObjectLocation(objectToCheck, new THREE.Vector3(0, 0, 0));
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

  BoundaryCollisionDetector.prototype.setObjectLocation = function(objectToCheck, location) {
    objectToCheck.position = location;
    objectToCheck.position.y = 0;
  };

  return BoundaryCollisionDetector;
})();
