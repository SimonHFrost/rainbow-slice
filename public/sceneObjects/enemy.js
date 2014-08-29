window.Enemy = (function() {
  "use strict";
  function Enemy(scene, size, positionX, positionZ, updatableObjects, player, sceneObjects) {
    this.FIRE_RATE = 0.05;
    this.FIRE_FAILURE_RATE = 0.4;
    this.CHANCE_OF_ACTION = 0.01;
    this.CHANCE_OF_AIMING = 0.01;

    this.AVAILABLE_ACTIONS = {
      IDLE: 0,
      STRAFING_RIGHT : 1,
      STRAFING_LEFT : 2,
      ADVANCING : 3,
      AIMING: 4,
    };

    this.scene = scene;
    this.size = size;
    this.positionX = positionX;
    this.positionZ = positionZ;
    this.updatableObjects = updatableObjects;
    this.player = player;
    this.sceneObjects = sceneObjects;

    this.clock = new THREE.Clock();

    this.lastFired = 0;
    this.currentAction = this.AVAILABLE_ACTIONS.IDLE;

    var geometry = new THREE.CubeGeometry(this.size, this.size, this.size);
    var material = Materials.ENEMY;

    this.threeObject = new THREE.Mesh(geometry, material);
    this.threeObject.dead = false;
    this.threeObject.castShadow = true;
    this.threeObject.position.x = this.positionX;
    this.threeObject.position.z = this.positionZ;

    this.sceneObjects.enemies.push(this);
    this.updatableObjects.push(this);

    this.scene.add(this.threeObject);
  }

  Enemy.prototype.update = function() {
    if(!this.threeObject.dead) {
      if(this.currentAction !== this.AVAILABLE_ACTIONS.IDLE) {
        this.fireBullet();
        this.updateMovement();
        this.threeObject.lookAt(this.player.position);
      }
      this.decideIfChangingAction();
    }
  };

  Enemy.prototype.fireBullet = function() {
    if(this.clock.getElapsedTime() >= this.lastFired + this.FIRE_RATE) {
      this.lastFired = this.clock.getElapsedTime() + this.FIRE_RATE;
      if (Math.random() >= this.FIRE_FAILURE_RATE) {
        var bullet = new Bullet(this.scene, this.threeObject, this.player, this.sceneObjects.allBullets);
        this.updatableObjects.push(bullet);
      }
    }
  };

  Enemy.prototype.updateMovement = function() {
    var pLocal = new THREE.Vector3(0, 0, -1);
    var pWorld = pLocal.applyMatrix4(this.player.matrixWorld);
    var facing = pWorld.sub(this.threeObject.position).normalize();
    facing.multiplyScalar(5);

    var yAxis = new THREE.Vector3(0, 1, 0);
    var strafingVector = new THREE.Vector3();
    strafingVector.crossVectors(facing, yAxis);
    strafingVector.multiplyScalar(2.5);

    if (this.currentAction == this.AVAILABLE_ACTIONS.ADVANCING) {
      this.threeObject.position.add(facing);
    } else if (this.currentAction == this.AVAILABLE_ACTIONS.STRAFING_RIGHT) {
      this.threeObject.position.add(strafingVector);
    } else if (this.currentAction == this.AVAILABLE_ACTIONS.STRAFING_LEFT) {
      this.threeObject.position.sub(strafingVector);
    }
  };

  Enemy.prototype.decideIfChangingAction = function() {
    if (this.currentAction == this.AVAILABLE_ACTIONS.AIMING) {
      if (Math.random() <= this.CHANCE_OF_ACTION) {
        this.currentAction = this.AVAILABLE_ACTIONS.ADVANCING;
      }
      else if (Math.random() <= this.CHANCE_OF_ACTION) {
        this.currentAction = this.AVAILABLE_ACTIONS.STRAFING_RIGHT;
      }
      else if (Math.random() <= this.CHANCE_OF_ACTION) {
        this.currentAction = this.AVAILABLE_ACTIONS.STRAFING_LEFT;
      }
      else if (Math.random() <= 0.01) {
        this.currentAction = this.AVAILABLE_ACTIONS.IDLE;
      }
    } else {
      if (Math.random() <= this.CHANCE_OF_AIMING) {
        this.currentAction = this.AVAILABLE_ACTIONS.AIMING;
      }
    }
  };

  return Enemy;
})();
