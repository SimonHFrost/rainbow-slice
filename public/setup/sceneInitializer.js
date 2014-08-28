window.SceneInitializer = (function(){
  "use strict";
  function SceneInitializer(scene) {
    this.FLOOR = -100;
    this.ISLAND_FLOOR = this.FLOOR - 1000;

    this.scene = scene;
    this.sceneObjects = new SceneObjects(scene);

    this.initCameraAndLights();
    this.initSceneObjects();

    SceneObjects.enemySpawner = new EnemySpawner(scene, this.sceneObjects);
    SceneObjects.updatableObjects.push(SceneObjects.enemySpawner);
    SceneObjects.movement = new Movement();
    SceneObjects.updatableObjects.push(SceneObjects.movement);
    SceneObjects.updatableObjects.push(this.sceneObjects.story);
    SceneObjects.updatableObjects.push(new BoundaryCollisionDetector(scene));
    SceneObjects.updatableObjects.push(new MovementCollisionDetector(this.sceneObjects));
    SceneObjects.updatableObjects.push(new BulletCollisionDetector(scene, this.sceneObjects.story));
    SceneObjects.clock = new THREE.Clock();
    SceneObjects.clock.start();

    new Sound().playTheme();
  }

  SceneInitializer.prototype.initCameraAndLights = function() {
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

  SceneInitializer.prototype.initSceneObjects = function() {
    new IslandInitializer(this.scene).makeIsland(this.FLOOR, this.ISLAND_FLOOR);
    this.makePlayer();
    this.makeSkyBox();
  };


  SceneInitializer.prototype.makePlayer = function() {
    var playerWidth = SceneObjects.PLAYER_WIDTH;
    SceneObjects.player = new THREE.Mesh(new THREE.CubeGeometry(playerWidth, playerWidth, playerWidth), Materials.BASIC);
    SceneObjects.player.add(SceneObjects.camera);
    this.scene.add(SceneObjects.player);
  };

  SceneInitializer.prototype.makeSkyBox = function() {
    var skyGeometry = new THREE.CubeGeometry(50000, 50000, 50000);
    var skyBox = new THREE.Mesh (skyGeometry, Materials.SKY);
    this.scene.add(skyBox);
  };

  return SceneInitializer;
})();
