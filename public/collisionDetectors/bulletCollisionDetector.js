window.BulletCollisionDetector = (function () {
  function BulletCollisionDetector() {
    this.PLAYER_WIDTH_HALF = SceneInitializer.PLAYER_WIDTH/2;
    this.ENEMY_WIDTH_HALF = SceneInitializer.ENEMY_WIDTH/2;
  }

  BulletCollisionDetector.prototype.update = function() {
    for(var i = 0; i < SceneObjects.allBullets.length; i++) {
      this.detectBulletPlayerCollision(SceneObjects.allBullets[i].threeObject);
      this.detectBulletEnemyCollision(SceneObjects.allBullets[i].threeObject);
    }
  };

  BulletCollisionDetector.prototype.detectBulletPlayerCollision = function(bullet) {
    var right = SceneObjects.player.position.x + this.PLAYER_WIDTH_HALF;
    var left = SceneObjects.player.position.x - this.PLAYER_WIDTH_HALF;
    var up = SceneObjects.player.position.z + this.PLAYER_WIDTH_HALF;
    var down = SceneObjects.player.position.z - this.PLAYER_WIDTH_HALF;

    if (left < bullet.position.x && bullet.position.x < right) {
      if (down < bullet.position.z && bullet.position.z < up) {
        if(bullet.used) {
          return;
        }

        SceneObjects.story.decreaseHealth();

        bullet.used = true;
        scene.remove(bullet);
      }
    }
  };

  BulletCollisionDetector.prototype.detectBulletEnemyCollision = function(bullet) {
    for(var i = 0; i < SceneObjects.enemies.length; i++) {
      var enemy = SceneObjects.enemies[i].threeObject;

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
  };

  return BulletCollisionDetector;
})();
