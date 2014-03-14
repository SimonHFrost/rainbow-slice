var sceneInitializer = {
  FLOOR_DIMENSIONS : 3000,
  ENEMY_BORDER_WIDTH : 1000,
  BASIC_MATERIAL : new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0xFF00FF }),

  initCameraAndLights : function() {
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500000 );
    camera.position.y = 15000;
    camera.rotation.x = -Math.PI / 2;

    var pointLight = new THREE.PointLight( 0xffffff );
    pointLight.position.set( 500, 500, 500 );
    scene.add( pointLight );

    var ambientLight = new THREE.AmbientLight( 0x707070 );
    scene.add( ambientLight );
  },

  initSceneObjects : function() {
    this.makeArena();
    this.makeMainCube();
    this.makeEnemies();
    this.makeSkyBox();
  },

  makeArena : function() {
    var floorWidth = this.FLOOR_DIMENSIONS * 2;
    var floorDepth = this.FLOOR_DIMENSIONS * 2;

    var material = new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0x00CC33 } );
    floor = new THREE.Mesh( new THREE.PlaneGeometry( floorWidth, floorDepth), material );
    floor.position.y = - 100;
    floor.rotation.x = - Math.PI / 2;
    scene.add( floor );

    this.makeWalls();
  },

  makeWalls : function() {
    var wallWidth = 400;
    var wallDepth = 200;
    var floorBoundry = this.FLOOR_DIMENSIONS + wallWidth/2;
    var wallTemplate = new THREE.Mesh(new THREE.CubeGeometry(wallWidth, wallDepth, this.FLOOR_DIMENSIONS*2), this.BASIC_MATERIAL);

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

  makeMainCube : function() {
    var cubeSize = 400;
    mainCube = new THREE.Mesh( new THREE.CubeGeometry( cubeSize, cubeSize, cubeSize ), this.BASIC_MATERIAL);
    scene.add(mainCube);
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

          somethingAlreadyAtLocation = _.some(main.enemyMeshList, function(enemy) {
            return enemy.gridX == x && enemy.gridZ == z;
          });
        }

        this.instantiateEnemy(x, z);
    }
  },

  instantiateEnemy : function(x, z) {
    var size = 200;
    var xOffSet = -(this.FLOOR_DIMENSIONS - this.ENEMY_BORDER_WIDTH);
    var zOffSet = -(this.FLOOR_DIMENSIONS - this.ENEMY_BORDER_WIDTH);
    var spacing = size + 800;

    var geometry = new THREE.CubeGeometry( size, size, size );
    var material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF} );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.x = x * spacing + xOffSet;
    cube.position.z = z * spacing + zOffSet;
    scene.add( cube );

    cube.gridX = x;
    cube.gridZ = z;

    main.enemyMeshList.push( cube );
  },

  makeSkyBox : function() {
    var skyGeometry = new THREE.CubeGeometry( 50000, 50000, 50000 );
    var skyMaterial = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.BackSide} );
    var skyBox = new THREE.Mesh ( skyGeometry, skyMaterial );
    scene.add( skyBox );
  },

};
