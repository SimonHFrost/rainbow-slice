window.BulletCollisionDetector = (function () {
  "use strict";
  function BulletCollisionDetector(sceneObjects, scene, story, player, playerWidth, enemyWidth) {
    this.sceneObjects = sceneObjects;
    this.scene = scene;
    this.story = story;
    this.player = player;
    this.playerWidthHalf = playerWidth / 2;
    this.enemyWidthHalf = enemyWidth / 2;
  }

  BulletCollisionDetector.prototype.update = function() {
    for(var i = 0; i < this.sceneObjects.allBullets.length; i++) {
      this.detectBulletPlayerCollision(this.sceneObjects.allBullets[i].threeObject);
      this.detectBulletEnemyCollision(this.sceneObjects.allBullets[i].threeObject);
    }
  };

  BulletCollisionDetector.prototype.detectBulletPlayerCollision = function(bullet) {
    var right = this.player.position.x + this.playerWidthHalf;
    var left = this.player.position.x - this.playerWidthHalf;
    var up = this.player.position.z + this.playerWidthHalf;
    var down = this.player.position.z - this.playerWidthHalf;

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

      var right = enemy.position.x + this.enemyWidthHalf;
      var left = enemy.position.x - this.enemyWidthHalf;
      var up = enemy.position.z + this.enemyWidthHalf;
      var down = enemy.position.z - this.enemyWidthHalf;

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
