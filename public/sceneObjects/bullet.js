window.Bullet = (function () {
  "use strict";
  function Bullet(scene, enemyToFire) {
    this.scene = scene;
    this.BULLET_SIZE = 50;
    this.SPEED = 20;

    var material = new THREE.MeshBasicMaterial( { shading: THREE.FlatShading, color: 0xFFFFFF } );
    material.color.setRGB(Math.random(), Math.random(), Math.random());
    this.threeObject = new THREE.Mesh(new THREE.CubeGeometry(this.BULLET_SIZE, this.BULLET_SIZE, this.BULLET_SIZE ), material);

    this.threeObject.enemyToFire = enemyToFire;
    this.threeObject.position.x = enemyToFire.position.x;
    this.threeObject.position.z = enemyToFire.position.z;

    var pLocal = new THREE.Vector3(0, 0, -1);
    var pWorld = pLocal.applyMatrix4(SceneObjects.player.matrixWorld);
    var dir = pWorld.sub(this.threeObject.position).normalize();

    this.direction = dir;
    this.direction.multiplyScalar(this.SPEED);

    SceneObjects.allBullets.push(this);
    SceneObjects.updatableObjects.push(this);
    this.scene.add(this.threeObject);
  }

  Bullet.prototype.update = function() {
    this.threeObject.position.add(this.direction);
    if (this.falling) {
      this.threeObject.position.y -= 10;

      if(this.threeObject.position.y < -1000) {
        SceneObjects.removeBullet(this);
        this.scene.remove(this.threeObject);
      }
    }
  };

  Bullet.prototype.toggleFalling = function() {
    this.falling = true;
  };

  return Bullet;
})();
