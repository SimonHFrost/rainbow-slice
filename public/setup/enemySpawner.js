window.EnemySpawner = (function(){
  "use strict";
  function EnemySpawner(scene, meshLoader, updatableObjects, player, sceneObjects) {
    this.scene = scene;
    this.player = player;
    this.meshLoader = meshLoader;
    this.updatableObjects = updatableObjects;
    this.sceneObjects = sceneObjects;

    this.MAX_ENEMIES = 15;
    this.spawnRate = 0.1;
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
    var someEnemy = new Enemy(this.scene, SceneObjects.ENEMY_WIDTH, x, z, this.updatableObjects, this.player, this.sceneObjects);
    someEnemy.gridX = x;
    someEnemy.gridZ = z;

    this.meshLoader.setEnemyModel(someEnemy);
  };

  EnemySpawner.prototype.update = function() {
    var time = this.clock.getElapsedTime();
    this.spawnRate = 10 - (2 * Math.log(time + 10));

    if(time >= this.lastSpawned + this.spawnRate) {
      if(this.sceneObjects.enemies.length > this.MAX_ENEMIES) {
        return;
      }

      var xRange = this.rightBoundary - this.leftBoundary;
      var zRange = this.topBoundary - this.bottomBoundary;

      this.lastSpawned = this.lastSpawned + this.spawnRate;
      var x = this.leftBoundary + Math.floor(Math.random() * xRange);
      var z = this.bottomBoundary + Math.floor(Math.random() * zRange);

      this.instantiateEnemy(x, z);
    }
  };

  return EnemySpawner;
})();
