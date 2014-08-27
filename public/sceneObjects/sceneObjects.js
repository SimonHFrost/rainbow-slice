window.SceneObjects = (function() {
  function SceneObjects() {
  }

  SceneObjects.allBullets = [];
  SceneObjects.player = '';
  SceneObjects.playerModel = '';
  SceneObjects.enemies = [];
  SceneObjects.morphs = [];
  SceneObjects.enemySpawner = '';
  SceneObjects.movement = '';
  SceneObjects.updatableObjects = [];
  SceneObjects.clock = '';
  SceneObjects.network = '';

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

  SceneObjects.removeEnemy = function(threeObject) {
    scene.remove(threeObject);

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
