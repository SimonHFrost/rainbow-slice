var bulletCollisionDetector = {
  detectBulletCollisions : function() {
    for(var i = 0; i < sceneObjects.allBullets.length; i++) {
      this.detectBulletPlayerCollision(sceneObjects.allBullets[i]);
      this.detectBulletEnemyCollision(sceneObjects.allBullets[i]);
    }
  },

  detectBulletPlayerCollision : function(bullet) {
    var right = sceneObjects.player.position.x + 200;
    var left = sceneObjects.player.position.x - 200;
    var up = sceneObjects.player.position.z + 200;
    var down = sceneObjects.player.position.z - 200;

    if (left < bullet.position.x && bullet.position.x < right) {
      if (down < bullet.position.z && bullet.position.z < up) {
        if(bullet.used) {
          return;
        }

        if (boundryCollisionDetector.health > 0) {
          boundryCollisionDetector.health--;
        }

        elem = document.getElementById('scoreNumber');
        elem.innerHTML = 'Health: ' + boundryCollisionDetector.health;
        bullet.used = true; // hack
        scene.remove(bullet);
      }
    }
  },

  detectBulletEnemyCollision : function(bullet) {
    for(var i = 0; i < sceneObjects.enemies.length; i++) {
      var enemy = sceneObjects.enemies[i];

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
