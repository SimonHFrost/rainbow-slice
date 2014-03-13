var collisionDetector = {
  FLOOR_DIMENSIONS : 6000,
  health : 1000,

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
  },

  detectBulletCollisions : function() {
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
      var collisionResults = ray.intersectObjects( fire.allBullets );
      if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
        var bullet = collisionResults[0].object;
        hit = true;

        scene.remove(bullet);
      }
    }

    if (hit) {
      if(this.health <= 0) {
        return;
      }

      this.health--;
      elem = document.getElementById('scoreNumber');
      elem.innerHTML = 'Health: ' + this.health;

      if (this.health === 0) {
        // alert('if this were for realsies, you would be dead');
      }
    }
  },

  // super duper hacky way of keeping everyone in bounds
  detectWallCollisions : function() {
    this.detectBoundryCollisionsPlayer();
    this.detectBoundryCollisionsEnemies();
  },

  detectBoundryCollisionsPlayer : function() {
    this.putBackInBounds(mainCube);
  },

  detectBoundryCollisionsEnemies : function() {
    for (var i = 0; i < main.enemyMeshList.length; i++) {
      this.putBackInBounds(main.enemyMeshList[i]);
    }
  },

  putBackInBounds : function(misbehavor) {
    if (misbehavor.position.x > this.FLOOR_DIMENSIONS) {
      misbehavor.position.x = this.FLOOR_DIMENSIONS;
    }

    if (misbehavor.position.x < -this.FLOOR_DIMENSIONS) {
      misbehavor.position.x = -this.FLOOR_DIMENSIONS;
    }

    if (misbehavor.position.z > this.FLOOR_DIMENSIONS) {
      misbehavor.position.z = this.FLOOR_DIMENSIONS;
    }

    if (misbehavor.position.z < -this.FLOOR_DIMENSIONS) {
      misbehavor.position.z = -this.FLOOR_DIMENSIONS;
    }
  },
};
