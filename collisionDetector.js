var health = 1000;

function detectEnemyCollisions() {
  var originPoint = mainCube.position.clone();
  var pushDistance = 10;

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
    var collisionResults = ray.intersectObjects( enemyMeshList );
    if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
      var enemy = collisionResults[0].object;
      enemy.material = new THREE.MeshBasicMaterial( {color: 0xCC0000} );
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
}

function detectBulletCollisions() {
  var bulletSize = 25;
  var horizontalVertices = [
    new THREE.Vector3(0, 0, bulletSize),
    new THREE.Vector3(bulletSize, 0, bulletSize),
    new THREE.Vector3(bulletSize, 0, 0),
    new THREE.Vector3(bulletSize, 0, -bulletSize),
    new THREE.Vector3(0, 0, -bulletSize),
    new THREE.Vector3(-bulletSize, 0, -bulletSize),
    new THREE.Vector3(-bulletSize, 0, 0),
    new THREE.Vector3(-bulletSize, 0, bulletSize)
  ];

  var originPoint = mainCube.position.clone();

  var hit = false;
  for (var vertexIndex = 0; vertexIndex < horizontalVertices.length; vertexIndex++) {
    var localVertex = horizontalVertices[vertexIndex].clone();
    var globalVertex = localVertex.applyMatrix4( mainCube.matrix );
    var directionVector = globalVertex.sub( mainCube.position );
    var normalized = directionVector.clone().normalize();

    var ray = new THREE.Raycaster( originPoint, normalized );
    var collisionResults = ray.intersectObjects( allBullets );
    if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
      var bullet = collisionResults[0].object;
      hit = true;

      scene.remove(bullet);
    }
  }

  if (hit) {
    if(health <= 0) {
      return;
    }

    health--;
    elem = document.getElementById('scoreNumber');
    elem.innerHTML = 'Health: ' + health;

    if (health === 0) {
      // alert('if this were for realsies, you would be dead');
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
  if (misbehavor.position.x > FLOOR_DIMENSIONS) {
    misbehavor.position.x = FLOOR_DIMENSIONS;
  }

  if (misbehavor.position.x < -FLOOR_DIMENSIONS) {
    misbehavor.position.x = -FLOOR_DIMENSIONS;
  }

  if (misbehavor.position.z > FLOOR_DIMENSIONS) {
    misbehavor.position.z = FLOOR_DIMENSIONS;
  }

  if (misbehavor.position.z < -FLOOR_DIMENSIONS) {
    misbehavor.position.z = -FLOOR_DIMENSIONS;
  }
}
