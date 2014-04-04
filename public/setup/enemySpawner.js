function EnemySpawner() {
  this.FLOOR_DIMENSIONS = 3000;
  this.ENEMY_BORDER_WIDTH = 1000;
  this.ENEMY_WIDTH = 200;
  this.SPAWN_RATE = 2;
  this.lastFired = 0;

  // this.spawnInitialEnemies();
}

EnemySpawner.prototype.spanInitialEnemies = function() {
  var numEnemiesPerSide = 5;
  var numEnemies = 11;

  while (numEnemies--) {
      var somethingAlreadyAtLocation = true;

      var x;
      var z;

      while(somethingAlreadyAtLocation) {
        x = Math.floor(Math.random() * numEnemiesPerSide);
        z = Math.floor(Math.random() * numEnemiesPerSide);

        somethingAlreadyAtLocation = _.some(sceneObjects.enemies, function(enemy) {
          return (enemy.gridX == x && enemy.gridZ == z);
        });

        somethingAlreadyAtLocation = somethingAlreadyAtLocation || (x == 2 && z == 2);
      }

      this.instantiateEnemy(x, z);
  }
};

EnemySpawner.prototype.instantiateEnemy = function(x, z) {
  var size = this.ENEMY_WIDTH;
  var xOffSet = -(this.FLOOR_DIMENSIONS - this.ENEMY_BORDER_WIDTH);
  var zOffSet = -(this.FLOOR_DIMENSIONS - this.ENEMY_BORDER_WIDTH);
  var spacing = size + 800;

  var someEnemy = new Enemy();
  someEnemy.gridX = x;
  someEnemy.gridZ = z;

  someEnemy.threeObject.position.x = x * spacing + xOffSet;
  someEnemy.threeObject.position.z = z * spacing + zOffSet;

  meshLoader.setEnemyModel(someEnemy);
};

EnemySpawner.prototype.update = function() {
  var numEnemiesPerSide = 5;

  if(clock.getElapsedTime() >= this.lastFired + this.SPAWN_RATE) {
    this.lastFired = this.lastFired + this.SPAWN_RATE;
    var x = Math.floor(Math.random() * numEnemiesPerSide);
    var z = Math.floor(Math.random() * numEnemiesPerSide);

    this.instantiateEnemy(x, z);
  }
};
