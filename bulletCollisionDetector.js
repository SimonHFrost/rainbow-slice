var bulletCollisionDetector = {
  detectBulletCollisions : function() {
    for(var i = 0; i < fire.allBullets.length; i++) {
      this.detectBulletMainCubeCollision(fire.allBullets[i]);
      this.detectBulletEnemyCollision(fire.allBullets[i]);
      collisionDetector.deleteIfOutOfBounds(fire.allBullets[i]);
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

        if (collisionDetector.health > 0) {
          collisionDetector.health--;
        }

        elem = document.getElementById('scoreNumber');
        elem.innerHTML = 'Health: ' + collisionDetector.health;
        bullet.used = true; // hack
        scene.remove(bullet);
      }
    }
  },

  detectBulletEnemyCollision : function(bullet) {
    for(var i = 0; i < main.enemyMeshList.length; i++) {
      var enemy = main.enemyMeshList[i];

      if (enemy === bullet.enemyToFire) {
        continue;
      }

      var right = enemy.position.x + 100;
      var left = enemy.position.x - 100;
      var up = enemy.position.z + 100;
      var down = enemy.position.z - 100;

      if (left < bullet.position.x && bullet.position.x < right) {
        if(down < bullet.position.z && bullet.position.z < up) {
          bullet.used = true;
          scene.remove(bullet);
        }
      }
    }
  }
};
