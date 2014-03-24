function Enemy() {
  this.ENEMY_WIDTH = 200;
  this.FIRE_RATE = 1;
  this.FIRE_FAILURE_RATE = 0.6;

  this.CHANCE_OF_ACTION = 0.001;
  this.CHANCE_OF_IDLE = 0.01;

  this.availableActions = {
    STANDING : 0,
    STRAFING_RIGHT : 1,
    STRAFING_LEFT : 2,
    ADVANCING : 3
  };

  this.lastFired = -1;
  this.currentAction = this.availableActions.STANDING;

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
    this.decideIfChangingAction();
  }
};

Enemy.prototype.fireBullet = function() {
  var fireInterval = clock.getElapsedTime().toFixed(this.FIRE_RATE);
  if(this.lastFired !== fireInterval) {
      this.lastFired = clock.getElapsedTime().toFixed(this.FIRE_RATE);
      if (Math.random() >= this.FIRE_FAILURE_RATE)
        var bulletThing = new Bullet(this.threeObject);
  }
};

Enemy.prototype.updateMovement = function() {
  var pLocal = new THREE.Vector3(0, 0, -1);
  var pWorld = pLocal.applyMatrix4(sceneObjects.player.matrixWorld);
  var facing = pWorld.sub(this.threeObject.position).normalize();
  facing.multiplyScalar(5);

  var yAxis = new THREE.Vector3(0, 1, 0);
  var strafingVector = new THREE.Vector3();
  strafingVector.crossVectors(facing, yAxis);
  strafingVector.multiplyScalar(2.5);

  if (this.currentAction == this.availableActions.ADVANCING) {
    this.threeObject.position.add(facing);
  } else if (this.currentAction == this.availableActions.STRAFING_RIGHT) {
    this.threeObject.position.add(strafingVector);
  } else if (this.currentAction == this.availableActions.STRAFING_LEFT) {
    this.threeObject.position.sub(strafingVector);
  }
};

Enemy.prototype.decideIfChangingAction = function() {
  if (this.currentAction == this.availableActions.STANDING) {
    if (Math.random() <= this.CHANCE_OF_ACTION)
      this.currentAction = this.availableActions.ADVANCING;
    else if (Math.random() <= this.CHANCE_OF_ACTION)
      this.currentAction = this.availableActions.STRAFING_RIGHT;
    else if (Math.random() <= this.CHANCE_OF_ACTION)
      this.currentAction = this.availableActions.STRAFING_LEFT;
  } else {
    if (Math.random() <= this.CHANCE_OF_IDLE)
      this.currentAction = this.availableActions.STANDING;
  }
};
