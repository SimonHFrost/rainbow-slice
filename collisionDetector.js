var collisionDetector = {
  FLOOR_DIMENSIONS : 3000,
  health : 1000,
  directionStatus : {
    TOP : 0,
    RIGHT : 1,
    BOTTOM : 2,
    LEFT : 3,
  },

  detectEnemyCollisions : function() {
    var originPoint = mainCube.position.clone();
    var pushDistance = 20;

    var mainCubeSize = mainCube.geometry.depth / 2;

    var horizontalVertices = [
      new THREE.Vector3(0, 0, mainCubeSize),
      new THREE.Vector3(mainCubeSize, 0, mainCubeSize),
      new THREE.Vector3(mainCubeSize, 0, 0),
      new THREE.Vector3(mainCubeSize, 0, -mainCubeSize),
      new THREE.Vector3(0, 0, -mainCubeSize),
      new THREE.Vector3(-mainCubeSize, 0, -mainCubeSize),
      new THREE.Vector3(-mainCubeSize, 0, 0),
      new THREE.Vector3(-mainCubeSize, 0, mainCubeSize)
    ];

    for (var vertexIndex = 0; vertexIndex < horizontalVertices.length; vertexIndex++)
    {
      var localVertex = horizontalVertices[vertexIndex].clone();
      var globalVertex = localVertex.applyMatrix4( mainCube.matrix );
      var directionVector = globalVertex.sub( mainCube.position );
      var normalized = directionVector.clone().normalize();

      var ray = new THREE.Raycaster( originPoint, normalized );
      var collisionResults = ray.intersectObjects( main.enemyMeshList );
      if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
        var enemy = collisionResults[0].object;
        enemy.material = materials.DEAD;
        enemy.dead = true;

        if (normalized.x > 0) {
          enemy.position.x += pushDistance;
        }

        if (normalized.x < 0) {
          enemy.position.x -= pushDistance;
        }

        if (normalized.z > 0) {
          enemy.position.z += pushDistance;
        }

        if (normalized.z < 0) {
          enemy.position.z -= pushDistance;
        }
      }
    }
  },

  // super duper hacky way of keeping everyone in bounds
  detectWallCollisions : function() {
    this.putBackInBounds(mainCube);
    this.detectBoundryCollisionsEnemies();
  },

  detectBoundryCollisionsEnemies : function() {
    for (var i = 0; i < main.enemyMeshList.length; i++) {
      this.putBackInBounds(main.enemyMeshList[i]);
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
