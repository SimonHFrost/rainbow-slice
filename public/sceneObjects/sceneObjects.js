/* Static properties and method */

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

SceneObjects.removeBullet = function(threeObject) {
  var bullet = _.find(SceneObjects.allBullets, function(element) {
    return element.threeObject === threeObject;
  });

  var index = SceneObjects.allBullets.indexOf(bullet);
  SceneObjects.allBullets.splice(index, 1);
};
