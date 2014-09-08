window.SceneObjects = (function() {
  "use strict";
  SceneObjects.PLAYER_WIDTH = 400;
  SceneObjects.ENEMY_WIDTH = 400;

  function SceneObjects(scene, camera, materials) {
    this.FLOOR = -100;
    this.ISLAND_FLOOR = this.FLOOR - 1000;

    this.scene = scene;
    this.camera = camera;
    this.materials = materials;

    this.initLights();
    this.initSceneObjects();

    this.createUpdatableObjects();
  }

  SceneObjects.prototype.createUpdatableObjects = function() {
    this.updatableObjects = [];
    this.morphs = [];

    this.allBullets = [];
    this.enemies = [];

    this.story = new Story(this.scene, this.network, this.allBullets, this.sound);
    this.updatableObjects.push(this.story);

    this.meshLoader = new MeshLoader(this, this.player, this.morphs);
    this.enemySpawner = new EnemySpawner(this, this.scene, this.meshLoader, this.updatableObjects, this.player, this.materials);
    this.updatableObjects.push(this.enemySpawner);

    this.movement = new Movement(this, this.player);
    this.updatableObjects.push(this.movement);

    this.updatableObjects.push(new BoundaryCollisionDetector(this, this.scene, this.player));
    this.updatableObjects.push(new MovementCollisionDetector(this, this.player));
    this.updatableObjects.push(new BulletCollisionDetector(this, this.scene, this.story, this.player));
  }

  SceneObjects.prototype.initLights = function() {
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
    var islandInitializer = new IslandInitializer(this.materials);
    this.scene.add(islandInitializer.makeIsland(this.FLOOR, this.ISLAND_FLOOR));
    this.scene.add(islandInitializer.makeSea(this.ISLAND_FLOOR));

    this.scene.add(this.makePlayer());
    this.scene.add(this.makeSkyBox());

    this.network = new Network();

    this.sound = new Sound();
    this.sound.playTheme();
  };

  SceneObjects.prototype.makePlayer = function() {
    var playerWidth = SceneObjects.PLAYER_WIDTH;
    this.player = new THREE.Mesh(new THREE.CubeGeometry(playerWidth, playerWidth, playerWidth), this.materials.BASIC);
    this.player.add(this.camera);
    return this.player;
  };

  SceneObjects.prototype.makeSkyBox = function() {
    var skyGeometry = new THREE.CubeGeometry(50000, 50000, 50000);
    var skyBox = new THREE.Mesh(skyGeometry, this.materials.SKY);
    return skyBox;
  };

  SceneObjects.prototype.toggleFalling = function(threeObject) {
    var bullet = _.find(this.allBullets, function(element) {
      return element.threeObject === threeObject;
    });

    bullet.toggleFalling();
  };

  SceneObjects.prototype.removeEnemy = function(threeObject) {
    this.scene.remove(threeObject);

    var enemy = _.find(this.enemies, function(element) {
      return element.threeObject === threeObject;
    });
    var index = this.enemies.indexOf(enemy);
    this.enemies.splice(index, 1);

    var objectIndex = this.updatableObjects.indexOf(enemy);
    this.updatableObjects.splice(objectIndex, 1);
  };

  return SceneObjects;
})();