function Bullet(enemyToFire) {
  this.BULLET_SIZE = 50;
  this.SPEED = 20;

  var material = new THREE.MeshBasicMaterial( { shading: THREE.FlatShading, color: 0xFFFFFF } );
  material.color.setRGB(Math.random(), Math.random(), Math.random());
  this.threeObject = new THREE.Mesh(new THREE.CubeGeometry(this.BULLET_SIZE, this.BULLET_SIZE, this.BULLET_SIZE ), material);

  this.threeObject.enemyToFire = enemyToFire;
  this.threeObject.position.x = enemyToFire.position.x;
  this.threeObject.position.z = enemyToFire.position.z;

  var pLocal = new THREE.Vector3(0, 0, -1);
  var pWorld = pLocal.applyMatrix4(sceneObjects.player.matrixWorld);
  var dir = pWorld.sub(this.threeObject.position).normalize();

  this.direction = dir;
  this.direction.multiplyScalar(this.SPEED);

  sceneObjects.allBullets.push(this);
  scene.add(this.threeObject);
}

Bullet.prototype.update = function() {
  this.threeObject.position.add(this.direction);
  boundryCollisionDetector.deleteIfOutOfBounds(this.threeObject);
  bulletCollisionDetector.detectBulletCollisions(this.threeObject);
};
