window.Enemy = (function() {
  function Enemy(scene, size, positionX, positionZ) {
    this.scene = scene;
    this.FIRE_RATE = 0.05;
    this.FIRE_FAILURE_RATE = 0.4;

    this.CHANCE_OF_ACTION = 0.01;
    this.CHANCE_OF_AIMING = 0.01;

    this.availableActions = {
      IDLE: 0,
      STRAFING_RIGHT : 1,
      STRAFING_LEFT : 2,
      ADVANCING : 3,
      AIMING: 4,
    };

    this.lastFired = 0;
    this.currentAction = this.availableActions.IDLE;

    var geometry = new THREE.CubeGeometry(size, size, size);
    var material = Materials.ENEMY;

    this.threeObject = new THREE.Mesh(geometry, material);
    this.threeObject.dead = false;
    this.threeObject.castShadow = true;
    this.threeObject.position.x = positionX;
    this.threeObject.position.z = positionZ;

    SceneObjects.enemies.push(this);
    SceneObjects.updatableObjects.push(this);
    this.scene.add(this.threeObject);
  }

  Enemy.prototype.update = function() {
    if(!this.threeObject.dead) {
      if(this.currentAction !== this.availableActions.IDLE) {
        this.fireBullet();
        this.updateMovement();
        this.threeObject.lookAt(SceneObjects.player.position);
      }
      this.decideIfChangingAction();
    }
  };

  Enemy.prototype.fireBullet = function() {
    if(SceneObjects.clock.getElapsedTime() >= this.lastFired + this.FIRE_RATE) {
      this.lastFired = SceneObjects.clock.getElapsedTime() + this.FIRE_RATE;
      if (Math.random() >= this.FIRE_FAILURE_RATE) {
        var bulletThing = new Bullet(this.threeObject, this.scene);
      }
    }
  };

  Enemy.prototype.updateMovement = function() {
    var pLocal = new THREE.Vector3(0, 0, -1);
    var pWorld = pLocal.applyMatrix4(SceneObjects.player.matrixWorld);
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
    if (this.currentAction == this.availableActions.AIMING) {
      if (Math.random() <= this.CHANCE_OF_ACTION) {
        this.currentAction = this.availableActions.ADVANCING;
      }
      else if (Math.random() <= this.CHANCE_OF_ACTION) {
        this.currentAction = this.availableActions.STRAFING_RIGHT;
      }
      else if (Math.random() <= this.CHANCE_OF_ACTION) {
        this.currentAction = this.availableActions.STRAFING_LEFT;
      }
      else if (Math.random() <= 0.01) {
        this.currentAction = this.availableActions.IDLE;
      }
    } else {
      if (Math.random() <= this.CHANCE_OF_AIMING) {
        this.currentAction = this.availableActions.AIMING;
      }
    }
  };

  return Enemy;
})();
