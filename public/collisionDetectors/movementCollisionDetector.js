window.MovementCollisionDetector = (function () {
  "use strict";
  function MovementCollisionDetector(sceneObjects, player) {
    this.sceneObjects = sceneObjects;
    this.player = player;
  }

  MovementCollisionDetector.prototype.update = function() {
    var originPoint = this.player.position.clone();
    var playerSize = SceneObjects.PLAYER_WIDTH / 2;

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
        var globalVertex = localVertex.applyMatrix4(this.player.matrix);
        var directionVector = globalVertex.sub(this.player.position);
        var normalized = directionVector.clone().normalize();

        var ray = new THREE.Raycaster(originPoint, normalized);
        var collisionResults = ray.intersectObjects( _.pluck(this.sceneObjects.enemies, 'threeObject'));
        if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
          var enemy = collisionResults[0].object;

          // this is a hack to prevent bug hitting every mesh when they spawn
          if (enemy.position.distanceTo(originPoint) > 500 || enemy.used) {
            continue;
          }

          enemy.used = true;

          this.sceneObjects.removeEnemy(enemy);
          this.sceneObjects.story.increaseKills();
        }
      }
    };

    return MovementCollisionDetector;
  })();
