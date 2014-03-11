function initSceneObjects() {
  // Player
  mainCube = new THREE.Mesh( new THREE.CubeGeometry( 200, 200, 200 ), new THREE.MeshLambertMaterial( { shading: THREE.FlatShading } ) );
  mainCube.position.z = -300;
  scene.add( mainCube );

  // Enemies
  MakeEnemies();

  // Floor
  var floorWidth = 4000;
  var floorHeight = 4000;
  var textureSize = 256;

  var material = new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0x00CC33 } );
  floor = new THREE.Mesh( new THREE.PlaneGeometry( floorWidth, floorHeight ), material );
  floor.position.y = - 100;
  floor.rotation.x = - Math.PI / 2;
  scene.add( floor );
}

function MakeEnemies() {
  var size = 200;
  var numEnemies = 10;
  var spacing = size + 200;
  for(var i = 0; i < numEnemies; i++) {
    var geometry = new THREE.CubeGeometry( size, size, size );
    var material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF} );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.x = i * spacing - numEnemies * spacing / 2;
    scene.add( cube );
    enemyMeshList.push( cube );
  }
}
