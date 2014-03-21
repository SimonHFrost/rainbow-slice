var movementCollisionDetector = {
  detectEnemyCollisions : function() {
    var originPoint = sceneObjects.player.position.clone();
    var pushDistance = 20;

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
        enemy.material = materials.DEAD;
        enemy.dead = true;
        sound.playEnemyHit(enemy);

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
  }
};
