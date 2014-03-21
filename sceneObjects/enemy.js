function Enemy() {
  this.ENEMY_WIDTH = 200;
  this.FIRE_RATE = 1;
  this.lastFired = -1;

  var geometry = new THREE.CubeGeometry(this.ENEMY_WIDTH, this.ENEMY_WIDTH, this.ENEMY_WIDTH);
  var material = materials.ENEMY;

  this.threeObject = new THREE.Mesh(geometry, material);
  this.threeObject.dead = false;
  this.threeObject.castShadow = true;

  sceneObjects.enemies.push(this);
  scene.add(this.threeObject);
}

Enemy.prototype.update = function() {
  if(!this.threeObject.dead) {
    this.threeObject.lookAt(sceneObjects.player.position);
    this.fireBullet();
  }
};

Enemy.prototype.fireBullet = function() {
  var fireInterval = clock.getElapsedTime().toFixed(this.FIRE_RATE);
  if(this.lastFired !== fireInterval) {
      this.lastFired = clock.getElapsedTime().toFixed(this.FIRE_RATE);
      var bulletThing = new Bullet(this.threeObject);
  }
};
