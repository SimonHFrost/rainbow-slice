function EnemySpawner() {
  this.MAX_ENEMIES = 15;
  this.spawnRate = 0.1;
  this.lastSpawned = 0;

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
  var someEnemy = new Enemy(SceneInitializer.ENEMY_WIDTH, x, z);
  someEnemy.gridX = x;
  someEnemy.gridZ = z;

  SceneObjects.meshLoader.setEnemyModel(someEnemy);
};

EnemySpawner.prototype.update = function() {
  var time = SceneObjects.clock.getElapsedTime();
  this.spawnRate = 10 - (2 * Math.log(time + 10));

  if(time >= this.lastSpawned + this.spawnRate) {
    if(SceneObjects.enemies.length > this.MAX_ENEMIES) {
      return;
    }

    var xRange = this.rightBoundary - this.leftBoundary;
    var zRange = this.topBoundary - this.bottomBoundary;

    this.lastSpawned = this.lastSpawned + this.spawnRate;
    var x = Math.floor(Math.random() * xRange);
    var z = Math.floor(Math.random() * zRange);

    this.instantiateEnemy(x, z);
  }
};
