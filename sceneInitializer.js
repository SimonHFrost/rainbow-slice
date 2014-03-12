var FLOOR_DIMENSIONS = 6000;

function initCameraAndLights() {
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500000 );
  camera.position.y = 15000;
  camera.rotation.x = -Math.PI / 2;

  var pointLight = new THREE.PointLight( 0xffffff );
  pointLight.position.set( 500, 500, 500 );
  scene.add( pointLight );

  var ambientLight = new THREE.AmbientLight( 0x707070 );
  scene.add( ambientLight );
}

function initSceneObjects() {
  var floorWidth = FLOOR_DIMENSIONS * 2;
  var floorDepth = FLOOR_DIMENSIONS * 2;
  var material = new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0x00CC33 } );
  floor = new THREE.Mesh( new THREE.PlaneGeometry( floorWidth, floorDepth ), material );
  floor.position.y = - 100;
  floor.rotation.x = - Math.PI / 2;
  scene.add( floor );

  var cubeSize = 400;
  mainCube = new THREE.Mesh( new THREE.CubeGeometry( cubeSize, cubeSize, cubeSize ), new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0x0000FF } ) );
  scene.add( mainCube );

  makeEnemies();

  makeSkyBox();
}

function makeEnemies() {
  var size = 200;
  var numEnemiesPerSide = 11;
  var xOffSet = -5000;
  var zOffSet = -5000;
  var spacing = size + 800;

  for(var x = 0; x < numEnemiesPerSide; x++) {
    for(var z = 0; z < numEnemiesPerSide; z++) {
      var playerPosition = Math.floor(numEnemiesPerSide / 2);
      if (x == playerPosition && z == playerPosition){
        // player position
        continue;
      }
      var geometry = new THREE.CubeGeometry( size, size, size );
      var material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF} );
      var cube = new THREE.Mesh( geometry, material );
      cube.position.x = x * spacing + xOffSet;
      cube.position.z = z * spacing + zOffSet;
      scene.add( cube );
      enemyMeshList.push( cube );
    }
  }
}

function makeSkyBox() {
	/*

  var imagePrefix = "images/dawnmountain-";
	var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
	var imageSuffix = ".png";
	var skyGeometry = new THREE.CubeGeometry( 50000, 50000, 50000 );

	var materialArray = [];
	for (var i = 0; i < 6; i++)
		materialArray.push( new THREE.MeshBasicMaterial({
			map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
			side: THREE.BackSide
		}));
	var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
	var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );

  */

  // disable skybox textures in local dev due to CORS limitations

  var skyGeometry = new THREE.CubeGeometry( 50000, 50000, 50000 );
  var skyMaterial = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.BackSide} );
  var skyBox = new THREE.Mesh ( skyGeometry, skyMaterial );
  scene.add( skyBox );
}
