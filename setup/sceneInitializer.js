var sceneInitializer = {
  FLOOR_DIMENSIONS : 3000,
  ENEMY_BORDER_WIDTH : 1000,

  PLAYER_WIDTH : 400,
  ENEMY_WIDTH : 200,

  initCameraAndLights : function() {
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 200000 );
    camera.rotation.x = -Math.PI / 2;
    camera.position.y = 12500;

    var pointLight = new THREE.PointLight( 0xDDDDDD );
    pointLight.position.set( 5000, 5000, 5000 );
    scene.add( pointLight );

    var ambientLight = new THREE.AmbientLight( 0x505050 );
    scene.add( ambientLight );
  },

  initSceneObjects : function() {
    this.makeArena();
    this.makePlayer();
    this.makeEnemies();
    this.makeSkyBox();
  },

  makeArena : function() {
    var floorWidth = this.FLOOR_DIMENSIONS * 2;
    var floorDepth = this.FLOOR_DIMENSIONS * 2;

    floor = new THREE.Mesh( new THREE.PlaneGeometry( floorWidth, floorDepth), materials.GROUND );
    floor.position.y = - 100;
    floor.rotation.x = - Math.PI / 2;
    scene.add( floor );

    this.makeWalls();
  },

  makeWalls : function() {
    var wallWidth = 400;
    var wallDepth = 200;
    var floorBoundry = this.FLOOR_DIMENSIONS + wallWidth/2;
    var wallTemplate = new THREE.Mesh(new THREE.CubeGeometry(wallWidth, wallDepth, this.FLOOR_DIMENSIONS*2), materials.BASIC);

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

  makeEnemies : function() {
    var numEnemiesPerSide = 5;
    var numEnemies = 11;

    while (numEnemies--) {
        var somethingAlreadyAtLocation = true;

        var x;
        var z;

        while(somethingAlreadyAtLocation) {
          x = Math.floor(Math.random() * numEnemiesPerSide);
          z = Math.floor(Math.random() * numEnemiesPerSide);

          somethingAlreadyAtLocation = _.some(sceneObjects.enemies, function(enemy) {
            return (enemy.gridX == x && enemy.gridZ == z) || (x == 2 && z == 2);
          });
        }

        this.instantiateEnemy(x, z);
    }
  },

  instantiateEnemy : function(x, z) {
    var size = this.ENEMY_WIDTH;
    var xOffSet = -(this.FLOOR_DIMENSIONS - this.ENEMY_BORDER_WIDTH);
    var zOffSet = -(this.FLOOR_DIMENSIONS - this.ENEMY_BORDER_WIDTH);
    var spacing = size + 800;

    var geometry = new THREE.CubeGeometry( size, size, size );
    var material = materials.ENEMY;
    var cube = new THREE.Mesh( geometry, material );
    cube.position.x = x * spacing + xOffSet;
    cube.position.z = z * spacing + zOffSet;
    scene.add( cube );

    cube.gridX = x;
    cube.gridZ = z;

    sceneObjects.enemies.push( cube );
  },

  makeSkyBox : function() {
    var skyGeometry = new THREE.CubeGeometry( 50000, 50000, 50000 );
    var skyBox = new THREE.Mesh ( skyGeometry, materials.SKY );
    scene.add( skyBox );
  },

};
