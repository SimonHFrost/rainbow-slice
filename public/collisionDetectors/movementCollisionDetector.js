function MovementCollisionDetector() {
  this.PUSH_DISTANCE = 20;
}

MovementCollisionDetector.prototype.update = function() {
  var originPoint = SceneObjects.player.position.clone();
  var playerSize = SceneInitializer.PLAYER_WIDTH / 2;

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
    var globalVertex = localVertex.applyMatrix4( SceneObjects.player.matrix );
    var directionVector = globalVertex.sub( SceneObjects.player.position );
    var normalized = directionVector.clone().normalize();

    var ray = new THREE.Raycaster(originPoint, normalized);
    var collisionResults = ray.intersectObjects( _.pluck(SceneObjects.enemies, 'threeObject'));
    if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
      var enemy = collisionResults[0].object;
      this.pushEnemyInEightDirections(enemy, normalized);

      if(enemy.used) {
        continue;
      }
      enemy.used = true;
      enemy.dead = true;

      enemy.children[0].material = Materials.DEAD;

      SceneObjects.story.increaseKills();

      // this.pushEnemyInFourDirections(enemy, normalized);
    }
  }
};

MovementCollisionDetector.prototype.pushEnemyInFourDirections = function(enemy, normalized) {
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
};

MovementCollisionDetector.prototype.pushEnemyInEightDirections = function(enemy, normalized) {
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
};
