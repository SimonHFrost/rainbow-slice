window.BulletCollisionDetector = (function () {
  "use strict";
  function BulletCollisionDetector(scene, story, player, sceneObjects) {
    this.scene = scene;
    this.story = story;
    this.player = player;
    this.sceneObjects = sceneObjects;

    this.PLAYER_WIDTH_HALF = SceneObjects.PLAYER_WIDTH/2;
    this.ENEMY_WIDTH_HALF = SceneObjects.ENEMY_WIDTH/2;
  }

  BulletCollisionDetector.prototype.update = function() {
    for(var i = 0; i < this.sceneObjects.allBullets.length; i++) {
      this.detectBulletPlayerCollision(this.sceneObjects.allBullets[i].threeObject);
      this.detectBulletEnemyCollision(this.sceneObjects.allBullets[i].threeObject);
    }
  };

  BulletCollisionDetector.prototype.detectBulletPlayerCollision = function(bullet) {
    var right = this.player.position.x + this.PLAYER_WIDTH_HALF;
    var left = this.player.position.x - this.PLAYER_WIDTH_HALF;
    var up = this.player.position.z + this.PLAYER_WIDTH_HALF;
    var down = this.player.position.z - this.PLAYER_WIDTH_HALF;

    if (left < bullet.position.x && bullet.position.x < right) {
      if (down < bullet.position.z && bullet.position.z < up) {
        if(bullet.used) {
          return;
        }

        this.story.decreaseHealth();

        bullet.used = true;
        this.scene.remove(bullet);
      }
    }
  };

  BulletCollisionDetector.prototype.detectBulletEnemyCollision = function(bullet) {
    for(var i = 0; i < this.sceneObjects.enemies.length; i++) {
      var enemy = this.sceneObjects.enemies[i].threeObject;

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
          this.scene.remove(bullet);
        }
      }
    }
  };

  return BulletCollisionDetector;
})();
