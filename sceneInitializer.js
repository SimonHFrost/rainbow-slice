function initSceneObjects() {
  // Player
  var cubeSize = 400;
  mainCube = new THREE.Mesh( new THREE.CubeGeometry( cubeSize, cubeSize, cubeSize ), new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0x0000FF } ) );
  scene.add( mainCube );

  // Enemies
  MakeEnemies();

  // Floor
  var floorWidth = FLOOR_DIMENSIONS * 2;
  var floorDepth = FLOOR_DIMENSIONS * 2;
  var material = new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0x00CC33 } );
  floor = new THREE.Mesh( new THREE.PlaneGeometry( floorWidth, floorDepth ), material );
  floor.position.y = - 100;
  floor.rotation.x = - Math.PI / 2;
  scene.add( floor );
}

function MakeEnemies() {
  var size = 200;
  var numEnemiesX = 20;
  var numEnemiesZ = 20
  var xOffSet = -2000;
  var zOffSet = -2000;
  var spacing = size + 200;
  for(var x = 0; x < numEnemiesX; x++) {
    for(var z = 0; z < numEnemiesZ; z++) {
      if (x == 5 && z == 5){
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
