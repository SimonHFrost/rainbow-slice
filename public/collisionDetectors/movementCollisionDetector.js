function MovementCollisionDetector() {
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

      // this is a hack to prevent bug hitting every mesh when they spawn
      if (enemy.position.distanceTo(originPoint) > 500) {
        continue;
      }

      if(enemy.used) {
        continue;
      }
      enemy.used = true;

      SceneObjects.removeEnemy(enemy);
      SceneObjects.story.increaseKills();
    }
  }
};
