window.SceneInitializer = (function(){
  function SceneInitializer() {
    scene = new THREE.Scene();

    this.FLOOR_DIMENSIONS = 3000;
    this.ENEMY_BORDER_WIDTH = 1000;
    this.FULL_ROTATION = 2 * Math.PI / 360;
    this.FLOOR = -100;
    this.ISLAND_FLOOR = this.FLOOR - 1000;

    SceneObjects.meshLoader = new MeshLoader();

    this.initCameraAndLights();
    this.initSceneObjects();

    SceneObjects.enemySpawner = new EnemySpawner();
    SceneObjects.updatableObjects.push(SceneObjects.enemySpawner);
    SceneObjects.movement = new Movement();
    SceneObjects.updatableObjects.push(SceneObjects.movement);
    SceneObjects.story = new Story();
    SceneObjects.updatableObjects.push(SceneObjects.story);
    SceneObjects.updatableObjects.push(new BoundaryCollisionDetector());
    SceneObjects.updatableObjects.push(new MovementCollisionDetector());
    SceneObjects.updatableObjects.push(new BulletCollisionDetector());
    SceneObjects.clock = new THREE.Clock();
    SceneObjects.clock.start();

    new Sound().playTheme();
  }

  SceneInitializer.PLAYER_WIDTH = 400;
  SceneInitializer.ENEMY_WIDTH = 400;

  SceneInitializer.prototype.initCameraAndLights = function() {
    camera = new THREE.PerspectiveCamera(45, Main.VIEWER_WIDTH / Main.VIEWER_HEIGHT, 1, 200000);
    camera.position.y = 5000;
    camera.position.z = 8000;
    camera.lookAt(new THREE.Vector3(0,0,0));

    var pointLight = new THREE.SpotLight(0xFFFFFF);
    pointLight.position.set(5000, 5000, 5000);
    pointLight.castShadow = true;

    pointLight.shadowCameraNear = 50;
    pointLight.shadowCameraFar = 250000;
    scene.add(pointLight);

    var ambientLight = new THREE.AmbientLight(0x808080);
    scene.add(ambientLight);
  };

  SceneInitializer.prototype.initSceneObjects = function() {
    new IslandInitializer().makeIsland(this.FLOOR, this.ISLAND_FLOOR);
    this.makePlayer();
    this.makeSkyBox();
  };


  SceneInitializer.prototype.makePlayer = function() {
    var playerWidth = SceneInitializer.PLAYER_WIDTH;
    SceneObjects.player = new THREE.Mesh(new THREE.CubeGeometry(playerWidth, playerWidth, playerWidth), Materials.BASIC);
    SceneObjects.player.add(camera);
    scene.add(SceneObjects.player);
  };

  SceneInitializer.prototype.makeSkyBox = function() {
    var skyGeometry = new THREE.CubeGeometry( 50000, 50000, 50000 );
    var skyBox = new THREE.Mesh ( skyGeometry, Materials.SKY );
    scene.add( skyBox );
  };

  return SceneInitializer;
})();
