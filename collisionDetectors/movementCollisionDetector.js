var movementCollisionDetector = {
  PUSH_DISTANCE : 20,

  detectEnemyCollisions : function() {
    var originPoint = sceneObjects.player.position.clone();
    var playerSize = sceneObjects.player.geometry.depth / 2;

    var horizontalVertices = [
      new THREE.Vector3(0, 0, playerSize),
      new THREE.Vector3(playerSize, 0, playerSize),
      new THREE.Vector3(playerSize, 0, 0),
      new THREE.Vector3(playerSize, 0, -playerSize),
      new THREE.Vector3(0, 0, -playerSize),
      new THREE.Vector3(-playerSize, 0, -playerSize),
      new THREE.Vector3(-playerSize, 0, 0),
      new THREE.Vector3(-playerSize, 0, playerSize)
    ];

    for (var vertexIndex = 0; vertexIndex < horizontalVertices.length; vertexIndex++)
    {
      var localVertex = horizontalVertices[vertexIndex].clone();
      var globalVertex = localVertex.applyMatrix4( sceneObjects.player.matrix );
      var directionVector = globalVertex.sub( sceneObjects.player.position );
      var normalized = directionVector.clone().normalize();

      var ray = new THREE.Raycaster( originPoint, normalized );
      var collisionResults = ray.intersectObjects( _.pluck(sceneObjects.enemies, 'threeObject'));
      if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
        var enemy = collisionResults[0].object;

        enemy.children[0].material = materials.BASIC;

        enemy.dead = true;
        sound.playEnemyHit(enemy);

        // this.pushEnemyInFourDirections(enemy, normalized);
        this.pushEnemyInEightDirections(enemy, normalized);
      }
    }
  },

  pushEnemyInFourDirections : function(enemy, normalized) {
      if (Math.abs(normalized.x) > Math.abs(normalized.z)) {
        if (normalized.x > 0) {
          enemy.position.x += this.PUSH_DISTANCE;
        } else {
          enemy.position.x -= this.PUSH_DISTANCE;
        }
      } else {
        if (normalized.z > 0) {
          enemy.position.z += this.PUSH_DISTANCE;
        } else {
          enemy.position.z -= this.PUSH_DISTANCE;
        }
      }
  },

  pushEnemyInEightDirections : function(enemy, normalized) {
    if (normalized.x > 0) {
      enemy.position.x += this.PUSH_DISTANCE;
    }

    if (normalized.x < 0) {
      enemy.position.x -= this.PUSH_DISTANCE;
    }

    if (normalized.z > 0) {
      enemy.position.z += this.PUSH_DISTANCE;
    }

    if (normalized.z < 0) {
      enemy.position.z -= this.PUSH_DISTANCE;
    }
  }
};
