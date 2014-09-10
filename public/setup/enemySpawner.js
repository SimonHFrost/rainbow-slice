window.EnemySpawner = (function(){
  "use strict";
  function EnemySpawner(sceneObjects, scene, meshLoader, updatableObjects, player, materials, enemyWidth) {
    this.MAX_ENEMIES = 15;
    this.SPAWN_RATE = 0.1;

    this.sceneObjects = sceneObjects;
    this.scene = scene;
    this.meshLoader = meshLoader;
    this.updatableObjects = updatableObjects;
    this.player = player;
    this.materials = materials;
    this.enemyWidth = enemyWidth;

    this.lastSpawned = 0;
    this.clock = new THREE.Clock();

    this.setSpawnBox();
  }

  EnemySpawner.prototype.setSpawnBox = function() {
    var me = this;
    var islandVectors = IslandInitializer.islandVectors;
    this.topBoundary = 0;
    this.rightBoundary = 0;
    this.bottomBoundary = 0;
    this.leftBoundary = 0;

    islandVectors.forEach(function(islandVector) {
      if(islandVector.z > me.topBoundary) {
        me.topBoundary = islandVector.z;
      }

      if(islandVector.x > me.rightBoundary) {
        me.rightBoundary = islandVector.x;
      }

      if(islandVector.z < me.bottomBoundary) {
        me.bottomBoundary = islandVector.z;
      }

      if(islandVector.x < me.leftBoundary) {
        me.leftBoundary = islandVector.x;
      }
    });
  };

  EnemySpawner.prototype.instantiateEnemy = function(x, z) {
    var someEnemy = new Enemy(this.sceneObjects, this.scene, this.enemyWidth, x, z, this.updatableObjects, this.player, this.materials);
    someEnemy.gridX = x;
    someEnemy.gridZ = z;

    this.meshLoader.setEnemyModel(someEnemy);
  };

  EnemySpawner.prototype.update = function() {
    var time = this.clock.getElapsedTime();
    this.SPAWN_RATE = 10 - (2 * Math.log(time + 10));

    if(time >= this.lastSpawned + this.SPAWN_RATE) {
      if(this.sceneObjects.enemies.length > this.MAX_ENEMIES) {
        return;
      }

      var xRange = this.rightBoundary - this.leftBoundary;
      var zRange = this.topBoundary - this.bottomBoundary;

      this.lastSpawned = this.lastSpawned + this.SPAWN_RATE;
      var x = this.leftBoundary + Math.floor(Math.random() * xRange);
      var z = this.bottomBoundary + Math.floor(Math.random() * zRange);

      this.instantiateEnemy(x, z);
    }
  };

  return EnemySpawner;
})();
