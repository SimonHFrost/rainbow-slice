window.SceneObjects = (function() {
  "use strict";
  SceneObjects.PLAYER_WIDTH = 400;
  SceneObjects.ENEMY_WIDTH = 400;

  function SceneObjects(scene) {
    this.scene = scene;

    this.FLOOR = -100;
    this.ISLAND_FLOOR = this.FLOOR - 1000;

    this.initCameraAndLights();
    this.initSceneObjects();

    this.updatableObjects = [];

    this.network = new Network();
    this.story = new Story(scene, this.network);
    this.updatableObjects.push(this.story);
    this.meshLoader = new MeshLoader();
    this.enemySpawner = new EnemySpawner(scene, this.meshLoader, this.updatableObjects);
    this.updatableObjects.push(this.enemySpawner);
    this.movement = new Movement();
    this.updatableObjects.push(this.movement);
    this.updatableObjects.push(new BoundaryCollisionDetector(scene));
    this.updatableObjects.push(new MovementCollisionDetector(this));
    this.updatableObjects.push(new BulletCollisionDetector(scene, this.story));
    new Sound().playTheme();
  }

  SceneObjects.allBullets = [];
  SceneObjects.player = '';
  SceneObjects.playerModel = '';
  SceneObjects.enemies = [];
  SceneObjects.morphs = [];
  SceneObjects.enemySpawner = '';
  SceneObjects.updatableObjects = [];

  SceneObjects.prototype.initCameraAndLights = function() {
    var camera = new THREE.PerspectiveCamera(45, Main.VIEWER_WIDTH / Main.VIEWER_HEIGHT, 1, 200000);
    camera.position.y = 5000;
    camera.position.z = 8000;
    camera.lookAt(new THREE.Vector3(0,0,0));
    SceneObjects.camera = camera;

    var pointLight = new THREE.SpotLight(0xFFFFFF);
    pointLight.position.set(5000, 5000, 5000);
    pointLight.castShadow = true;

    pointLight.shadowCameraNear = 50;
    pointLight.shadowCameraFar = 250000;
    this.scene.add(pointLight);

    var ambientLight = new THREE.AmbientLight(0x808080);
    this.scene.add(ambientLight);
  };

  SceneObjects.prototype.initSceneObjects = function() {
    new IslandInitializer(this.scene).makeIsland(this.FLOOR, this.ISLAND_FLOOR);
    this.makePlayer();
    this.makeSkyBox();
  };

  SceneObjects.prototype.makePlayer = function() {
    var playerWidth = SceneObjects.PLAYER_WIDTH;
    SceneObjects.player = new THREE.Mesh(new THREE.CubeGeometry(playerWidth, playerWidth, playerWidth), Materials.BASIC);
    SceneObjects.player.add(SceneObjects.camera);
    this.scene.add(SceneObjects.player);
  };

  SceneObjects.prototype.makeSkyBox = function() {
    var skyGeometry = new THREE.CubeGeometry(50000, 50000, 50000);
    var skyBox = new THREE.Mesh (skyGeometry, Materials.SKY);
    this.scene.add(skyBox);
  };

  // Static methods follow

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

    var objectIndex = this.updatableObjects.indexOf(enemy);
    this.updatableObjects.splice(objectIndex, 1);
  };

  return SceneObjects;
})();
