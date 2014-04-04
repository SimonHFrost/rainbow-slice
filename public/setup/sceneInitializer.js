var sceneInitializer = {
  FLOOR_DIMENSIONS : 3000,
  ENEMY_BORDER_WIDTH : 1000,
  FULL_ROTATION : 2 * Math.PI / 360,

  PLAYER_WIDTH : 400,
  ENEMY_WIDTH : 200,

  initCameraAndLights : function() {
    camera = new THREE.PerspectiveCamera(45, VIEWER_WIDTH / VIEWER_HEIGHT, 1, 200000);
    camera.rotation.x = -75 * this.FULL_ROTATION;
    camera.position.y = 8000;
    camera.position.z = 2500;

    var pointLight = new THREE.SpotLight(0xFFFFFF);
    pointLight.position.set(5000, 5000, 5000);
    pointLight.castShadow = true;

    pointLight.shadowCameraNear = 50;
    pointLight.shadowCameraFar = 250000;
    scene.add(pointLight);

    var ambientLight = new THREE.AmbientLight(0x808080);
    scene.add(ambientLight);
  },

  initSceneObjects : function() {
    this.makeFloor();
    this.makeWalls();
    this.makePlayer();
    this.makeSkyBox();
  },

  makeFloor : function() {
    var floorWidth = this.FLOOR_DIMENSIONS * 2;
    var floorDepth = this.FLOOR_DIMENSIONS * 2;

    var floorTexture = THREE.ImageUtils.loadTexture('./img/grass.png');
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(4, 4);

    var floorMaterial = new THREE.MeshLambertMaterial({map: floorTexture});

    floor = new THREE.Mesh(new THREE.PlaneGeometry(floorWidth, floorDepth), floorMaterial);
    floor.position.y = -100;
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
  },

  makeWalls : function() {
    var wallWidth = 400;
    var wallDepth = 200;
    var floorBoundry = this.FLOOR_DIMENSIONS + wallWidth/2;

    var wallTexture = THREE.ImageUtils.loadTexture('./img/rock.png');
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(1, 16);

    var wallMaterial = new THREE.MeshLambertMaterial({map: wallTexture});
    var wallTemplate = new THREE.Mesh(new THREE.CubeGeometry(wallWidth, wallDepth, this.FLOOR_DIMENSIONS*2), wallMaterial);

    var eastWall = wallTemplate.clone();
    eastWall.position.x = floorBoundry;
    scene.add(eastWall);

    var westWall = wallTemplate.clone();
    westWall.position.x = -floorBoundry;
    scene.add(westWall);

    var southWall = wallTemplate.clone();
    southWall.position.z = -floorBoundry;
    southWall.position.x = 0;
    southWall.rotation.y = Math.PI / 2;
    scene.add(southWall);

    var northWall = wallTemplate.clone();
    northWall.position.z = floorBoundry;
    northWall.position.x = 0;
    northWall.rotation.y = Math.PI / 2;

    scene.add(northWall);
  },

  makePlayer : function() {
    var playerWidth = this.PLAYER_WIDTH;
    sceneObjects.player = new THREE.Mesh(new THREE.CubeGeometry(playerWidth, playerWidth, playerWidth), materials.BASIC);
    scene.add(sceneObjects.player);
  },

  makeSkyBox : function() {
    var skyGeometry = new THREE.CubeGeometry( 50000, 50000, 50000 );
    var skyBox = new THREE.Mesh ( skyGeometry, materials.SKY );
    scene.add( skyBox );
  },

};
