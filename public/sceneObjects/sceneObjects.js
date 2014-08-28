window.SceneObjects = (function() {
  "use strict";
  SceneObjects.PLAYER_WIDTH = 400;
  SceneObjects.ENEMY_WIDTH = 400;

  function SceneObjects(scene) {
    this.scene = scene;
    this.network = new Network();
    this.story = new Story(scene, this.network);
    SceneObjects.updatableObjects.push(this.story);
    this.meshLoader = new MeshLoader();
    this.enemySpawner = new EnemySpawner(scene, this.meshLoader);
    SceneObjects.updatableObjects.push(this.enemySpawner);
    this.movement = new Movement();
    SceneObjects.updatableObjects.push(this.movement);
    SceneObjects.updatableObjects.push(new BoundaryCollisionDetector(scene));
    SceneObjects.updatableObjects.push(new MovementCollisionDetector(this));
    SceneObjects.updatableObjects.push(new BulletCollisionDetector(scene, this.story));
    new Sound().playTheme();
  }

  SceneObjects.allBullets = [];
  SceneObjects.player = '';
  SceneObjects.playerModel = '';
  SceneObjects.enemies = [];
  SceneObjects.morphs = [];
  SceneObjects.enemySpawner = '';
  SceneObjects.updatableObjects = [];

  SceneObjects.toggleFalling = function(threeObject) {
    var bullet = _.find(SceneObjects.allBullets, function(element) {
      return element.threeObject === threeObject;
    });

    bullet.toggleFalling();
  };

  SceneObjects.removeBullet = function(bullet) {
    var index = SceneObjects.allBullets.indexOf(bullet);
    if (index != -1) {
      SceneObjects.allBullets.splice(index, 1);
    }
  };

  SceneObjects.prototype.removeEnemy = function(threeObject) {
    this.scene.remove(threeObject);

    var enemy = _.find(SceneObjects.enemies, function(element){
      return element.threeObject === threeObject;
    });
    var index = SceneObjects.enemies.indexOf(enemy);
    SceneObjects.enemies.splice(index, 1);

    var objectIndex = SceneObjects.updatableObjects.indexOf(enemy);
    SceneObjects.updatableObjects.splice(objectIndex, 1);
  };

  return SceneObjects;
})();
