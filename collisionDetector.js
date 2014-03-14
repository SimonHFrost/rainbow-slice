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


  detectBulletCollisions : function() {
    for(var i = 0; i < fire.allBullets.length; i++) {
      this.detectBulletMainCubeCollision(fire.allBullets[i]);
      this.deleteIfOutOfBounds(fire.allBullets[i]);
    }
  },

  detectBulletMainCubeCollision : function(bullet) {
    var right = mainCube.position.x + 200;
    var left = mainCube.position.x - 200;
    var up = mainCube.position.z + 200;
    var down = mainCube.position.z - 200;

    if (left < bullet.position.x && bullet.position.x < right) {
      if (down < bullet.position.z && bullet.position.z < up) {
        if(bullet.used) {
          return;
        }

        if (this.health > 0) {
          this.health--;
        }

        elem = document.getElementById('scoreNumber');
        elem.innerHTML = 'Health: ' + this.health;
        bullet.used = true; // hack
        scene.remove(bullet);
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
    if (misbehavor.position.x > this.FLOOR_DIMENSIONS/2) {
      misbehavor.position.x = this.FLOOR_DIMENSIONS/2;
    }

    if (misbehavor.position.x < -this.FLOOR_DIMENSIONS/2) {
      misbehavor.position.x = -this.FLOOR_DIMENSIONS/2;
    }

    if (misbehavor.position.z > this.FLOOR_DIMENSIONS/2) {
      misbehavor.position.z = this.FLOOR_DIMENSIONS/2;
    }

    if (misbehavor.position.z < -this.FLOOR_DIMENSIONS/2) {
      misbehavor.position.z = -this.FLOOR_DIMENSIONS/2;
    }
  },

  deleteIfOutOfBounds : function(misbehavor) {
    if (misbehavor.position.x > this.FLOOR_DIMENSIONS/2) {
      scene.remove(misbehavor);
    }

    if (misbehavor.position.x < -this.FLOOR_DIMENSIONS/2) {
      scene.remove(misbehavor);
    }

    if (misbehavor.position.z > this.FLOOR_DIMENSIONS/2) {
      scene.remove(misbehavor);
    }

    if (misbehavor.position.z < -this.FLOOR_DIMENSIONS/2) {
      scene.remove(misbehavor);
    }
  }
};
