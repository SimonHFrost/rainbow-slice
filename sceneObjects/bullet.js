function Bullet(enemyToFire) {
  this.SPEED = 25;
  this.BULLET_SIZE = 50;

  this.threeObject = new THREE.Mesh(new THREE.CubeGeometry(this.BULLET_SIZE, this.BULLET_SIZE, this.BULLET_SIZE ), materials.BULLET);

  this.threeObject.enemyToFire = enemyToFire;
  this.threeObject.position.x = enemyToFire.position.x;
  this.threeObject.position.z = enemyToFire.position.z;

  var pLocal = new THREE.Vector3(0, 0, -1);
  var pWorld = pLocal.applyMatrix4(sceneObjects.player.matrixWorld);
  var dir = pWorld.sub(this.threeObject.position).normalize();

  this.direction = dir;

  sceneObjects.allBullets.push(this);
  scene.add(this.threeObject);
}

Bullet.prototype.update = function() {
  this.updatePosition();
  boundryCollisionDetector.deleteIfOutOfBounds(this.threeObject);
  bulletCollisionDetector.detectBulletCollisions(this.threeObject);
};

Bullet.prototype.updatePosition = function() {
  this.threeObject.position.x += this.direction.x * this.SPEED;
  this.threeObject.position.z += this.direction.z * this.SPEED;
};
