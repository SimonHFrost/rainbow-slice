var bulletCollisionDetector = {
  PLAYER_WIDTH_HALF : SceneInitializer.PLAYER_WIDTH/2,
  ENEMY_WIDTH_HALF : SceneInitializer.ENEMY_WIDTH/2,

  detectBulletCollisions : function(bullet) {
    this.detectBulletPlayerCollision(bullet);
    this.detectBulletEnemyCollision(bullet);
  },

  detectBulletPlayerCollision : function(bullet) {
    var right = sceneObjects.player.position.x + this.PLAYER_WIDTH_HALF;
    var left = sceneObjects.player.position.x - this.PLAYER_WIDTH_HALF;
    var up = sceneObjects.player.position.z + this.PLAYER_WIDTH_HALF;
    var down = sceneObjects.player.position.z - this.PLAYER_WIDTH_HALF;

    if (left < bullet.position.x && bullet.position.x < right) {
      if (down < bullet.position.z && bullet.position.z < up) {
        if(bullet.used) {
          return;
        }

        if (sceneObjects.story.health > 0) {
          new Sound().playHit(bullet);
          sceneObjects.story.health--;
        }

        if (!sceneObjects.story.playedWin) {
          elem = document.getElementById('scoreNumber');
          elem.innerHTML = 'Health: ' + sceneObjects.story.health;
          bullet.used = true;
          scene.remove(bullet);
        }
      }
    }
  },

  detectBulletEnemyCollision : function(bullet) {
    for(var i = 0; i < sceneObjects.enemies.length; i++) {
      var enemy = sceneObjects.enemies[i].threeObject;

      if (enemy === bullet.enemyToFire) {
        continue;
      }

      var right = enemy.position.x + this.ENEMY_WIDTH_HALF;
      var left = enemy.position.x - this.ENEMY_WIDTH_HALF;
      var up = enemy.position.z + this.ENEMY_WIDTH_HALF;
      var down = enemy.position.z - this.ENEMY_WIDTH_HALF;

      if (left < bullet.position.x && bullet.position.x < right) {
        if(down < bullet.position.z && bullet.position.z < up) {
          bullet.used = true;
          scene.remove(bullet);
        }
      }
    }
  }
};
