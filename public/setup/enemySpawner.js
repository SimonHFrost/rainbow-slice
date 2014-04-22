function EnemySpawner() {
  this.FLOOR_DIMENSIONS = 3000;
  this.ENEMY_BORDER_WIDTH = 1000;
  this.NUM_ENEMIES_PER_SIDE = 5;
  this.MAX_ENEMIES = 15;
  this.spawnRate = 0.1;
  this.lastSpawned = 0;
}

EnemySpawner.prototype.instantiateEnemy = function(x, z) {
  var spacing = this.FLOOR_DIMENSIONS * 2 / (this.NUM_ENEMIES_PER_SIDE + 1);

  var positionX = (spacing + x * spacing) - this.FLOOR_DIMENSIONS;
  var positionZ = (spacing + z * spacing) - this.FLOOR_DIMENSIONS;
  var someEnemy = new Enemy(SceneInitializer.ENEMY_WIDTH, positionX, positionZ);
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

    this.lastSpawned = this.lastSpawned + this.spawnRate;
    var x = Math.floor(Math.random() * this.NUM_ENEMIES_PER_SIDE);
    var z = Math.floor(Math.random() * this.NUM_ENEMIES_PER_SIDE);

    this.instantiateEnemy(x, z);
  }
};
