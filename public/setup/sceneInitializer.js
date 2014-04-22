/*global SceneObjects */
/*global THREE */

function SceneInitializer() {
  scene = new THREE.Scene();

  this.FLOOR_DIMENSIONS = 3000;
  this.ENEMY_BORDER_WIDTH = 1000;
  this.FULL_ROTATION = 2 * Math.PI / 360;
  this.FLOOR = -100;

  SceneObjects.meshLoader = new MeshLoader();

  this.initCameraAndLights();
  this.initSceneObjects();

  SceneObjects.enemySpawner = new EnemySpawner();
  SceneObjects.updatableObjects.push(SceneObjects.enemySpawner);
  SceneObjects.movement = new Movement();
  SceneObjects.updatableObjects.push(SceneObjects.movement);
  SceneObjects.story = new Story();
  SceneObjects.updatableObjects.push(SceneObjects.story);
  SceneObjects.updatableObjects.push(new BoundryCollisionDetector());
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
  camera.position.y = 8000;
  camera.position.z = 2500;
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
  this.makeIsland();
  this.makeWalls();
  this.makePlayer();
  this.makeSkyBox();
};

SceneInitializer.prototype.makeFloor = function() {
  var floorWidth = this.FLOOR_DIMENSIONS * 2;
  var floorDepth = this.FLOOR_DIMENSIONS * 2;

  floor = new THREE.Mesh(new THREE.PlaneGeometry(floorWidth, floorDepth), Materials.GRASS);

  floor.position.y = -100;
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);
};

SceneInitializer.prototype.makeIsland = function() {
  var geom = new THREE.Geometry();

  var topVectors = [
    new THREE.Vector3(-8000,this.FLOOR,500),
    new THREE.Vector3(-7000,this.FLOOR,-3000),
    new THREE.Vector3(-1500,this.FLOOR,-5000),
    new THREE.Vector3(-1000,this.FLOOR,-8000),
    new THREE.Vector3(1000,this.FLOOR,-7000),
    new THREE.Vector3(6000,this.FLOOR,-1500),
    new THREE.Vector3(5000,this.FLOOR,3500),
    new THREE.Vector3(1500,this.FLOOR,6000),
    new THREE.Vector3(-1000,this.FLOOR,7000)
  ];

  var islandBottom = this.FLOOR - 1000;

  var bottomVectors = [
    new THREE.Vector3(-8000,islandBottom,500),
    new THREE.Vector3(-7000,islandBottom,-3000),
    new THREE.Vector3(-1500,islandBottom,-5000),
    new THREE.Vector3(-1000,islandBottom,-8000),
    new THREE.Vector3(1000,islandBottom,-7000),
    new THREE.Vector3(6000,islandBottom,-1500),
    new THREE.Vector3(5000,islandBottom,3500),
    new THREE.Vector3(1500,islandBottom,6000),
    new THREE.Vector3(-1000,islandBottom,7000)
  ];

  geom.vertices = geom.vertices.concat(topVectors);
  geom.vertices = geom.vertices.concat(bottomVectors);

  geom.faces.push(new THREE.Face3(8, 1, 0));
  geom.faces.push(new THREE.Face3(8, 2, 1));
  geom.faces.push(new THREE.Face3(4, 3, 2));
  geom.faces.push(new THREE.Face3(5, 4, 2));
  geom.faces.push(new THREE.Face3(6, 5, 2));
  geom.faces.push(new THREE.Face3(8, 6, 2));
  geom.faces.push(new THREE.Face3(8, 7, 6));

  var bottomOffset = topVectors.length;
  for(var i = 0; i < topVectors.length; i++) {
    var currentVertex = i;
    var nextVertex = currentVertex === topVectors.length - 1 ? 0 : currentVertex + 1;

    geom.faces.push(new THREE.Face3(currentVertex, nextVertex, bottomOffset + nextVertex));
    geom.faces.push(new THREE.Face3(bottomOffset + nextVertex, bottomOffset + currentVertex, currentVertex));
  }

  // Need to map UVs to get this to work
  // var object = new THREE.Mesh(geom, Materials.GRASS);

  var object = new THREE.Mesh(
      geom,
      new THREE.MeshBasicMaterial({
          color:              0x67E667,
          wireframe:          false,
          wireframeLinewidth: 3
      })
    );
  object.doubleSided = true;
  object.overdraw = true;
  object.receiveShadow = true;
  scene.add(object);

  var sea = new THREE.Mesh(new THREE.PlaneGeometry(50000, 50000), Materials.SEA);
  sea.position.y = islandBottom;
  sea.rotation.x = -Math.PI / 2;
  scene.add(sea);
};

SceneInitializer.prototype.makeWalls = function() {
  var wallWidth = 400;
  var wallDepth = 200;
  var floorBoundry = this.FLOOR_DIMENSIONS + wallWidth/2;

  var wallTemplate = new THREE.Mesh(new THREE.CubeGeometry(wallWidth, wallDepth, this.FLOOR_DIMENSIONS*2), Materials.WALL);

  var eastWall = wallTemplate.clone();
  eastWall.position.x = floorBoundry;
  scene.add(eastWall);

  var westWall = wallTemplate.clone();
  westWall.position.x = -floorBoundry;
  scene.add(westWall);

  var southWall = wallTemplate.clone();
  southWall.position.z = -floorBoundry;
  southWall.rotation.y = Math.PI / 2;
  scene.add(southWall);

  var northWall = wallTemplate.clone();
  northWall.position.z = floorBoundry;
  northWall.rotation.y = Math.PI / 2;

  scene.add(northWall);
};

SceneInitializer.prototype.makePlayer = function() {
  var playerWidth = SceneInitializer.PLAYER_WIDTH;
  SceneObjects.player = new THREE.Mesh(new THREE.CubeGeometry(playerWidth, playerWidth, playerWidth), Materials.BASIC);
  scene.add(SceneObjects.player);
};

SceneInitializer.prototype.makeSkyBox = function() {
  var skyGeometry = new THREE.CubeGeometry( 50000, 50000, 50000 );
  var skyBox = new THREE.Mesh ( skyGeometry, Materials.SKY );
  scene.add( skyBox );
};
