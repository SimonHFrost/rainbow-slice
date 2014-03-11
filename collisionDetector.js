var floorDimensions = 2000;

function detectEnemyCollisions() {
  var originPoint = mainCube.position.clone();
  var pushDistance = 5;

  var horizontalVertices = [
    new THREE.Vector3(0, 0, 100),
    new THREE.Vector3(100, 0, 100),
    new THREE.Vector3(100, 0, 0),
    new THREE.Vector3(100, 0, -100),
    new THREE.Vector3(0, 0, -100),
    new THREE.Vector3(-100, 0, -100),
    new THREE.Vector3(-100, 0, 0),
    new THREE.Vector3(-100, 0, 100)
  ];

  for (var vertexIndex = 0; vertexIndex < horizontalVertices.length; vertexIndex++)
  {
    var localVertex = horizontalVertices[vertexIndex].clone();
    var globalVertex = localVertex.applyMatrix4( mainCube.matrix );
    var directionVector = globalVertex.sub( mainCube.position );
    var normalized = directionVector.clone().normalize();

    var ray = new THREE.Raycaster( originPoint, normalized );
    var collisionResults = ray.intersectObjects( enemyMeshList );
    if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
      var enemy = collisionResults[0].object;
      enemy.material = new THREE.MeshBasicMaterial( {color: 0xCC0000} );

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

// super duper hacky way of keeping everyone in bounds
function detectWallCollisions() {
  detectBoundryCollisionsPlayer();
  detectBoundryCollisionsEnemies();
}

function detectBoundryCollisionsPlayer() {
  putBackInBounds(mainCube);
}

function detectBoundryCollisionsEnemies() {
  for (var i = 0; i < enemyMeshList.length; i++) {
    putBackInBounds(enemyMeshList[i]);
  }
}

function putBackInBounds(misbehavor) {
  if (misbehavor.position.x > floorDimensions) {
    misbehavor.position.x = floorDimensions;
  }

  if (misbehavor.position.x < -floorDimensions) {
    misbehavor.position.x = -floorDimensions;
  }

  if (misbehavor.position.z > floorDimensions) {
    misbehavor.position.z = floorDimensions;
  }

  if (misbehavor.position.z < -floorDimensions) {
    misbehavor.position.z = -floorDimensions;
  }
}
