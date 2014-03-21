function Enemy() {
  this.ENEMY_WIDTH = 200;
  this.FIRE_RATE = 1;
  this.lastFired = -1;
  this.moving = false;

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
    this.updateMovement();

    if (this.moving) {
      if (Math.random() <= 0.01)
        this.moving = !this.moving;
    } else {
      if (Math.random() <= 0.001)
        this.moving = !this.moving;
    }
  }
};

Enemy.prototype.fireBullet = function() {
  var fireInterval = clock.getElapsedTime().toFixed(this.FIRE_RATE);
  if(this.lastFired !== fireInterval) {
      this.lastFired = clock.getElapsedTime().toFixed(this.FIRE_RATE);
      var bulletThing = new Bullet(this.threeObject);
  }
};

Enemy.prototype.updateMovement = function() {
  if (!this.moving)
    return;
  var pLocal = new THREE.Vector3(0, 0, -1);
  var pWorld = pLocal.applyMatrix4(sceneObjects.player.matrixWorld);
  this.direction = pWorld.sub(this.threeObject.position).normalize();

  this.threeObject.position.x += this.direction.x * 10;
  this.threeObject.position.z += this.direction.z * 10;
};
