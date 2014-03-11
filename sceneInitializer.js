function initSceneObjects() {
  // mainCube
  mainCube = new THREE.Mesh( new THREE.CubeGeometry( 200, 200, 200 ), new THREE.MeshLambertMaterial( { shading: THREE.FlatShading } ) );
  mainCube.position.z = -300;
  scene.add( mainCube );

  MakeEnemies();

  // Floor
  var floorWidth = 4000;
  var floorHeight = 4000;
  var textureSize = 256;

  var material
  if (ASCIIFY) {
    material = new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0x00CC33 } );
  } else {
    // previous texture implementation is broken, use this for now
    material = new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 0x00CC33 } );

    /*
    texture = THREE.ImageUtils.loadTexture('grass.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( floorWidth / textureSize, floorHeight / textureSize );
    material = new THREE.MeshBasicMaterial({map: texture});
    */
  }

  floor = new THREE.Mesh( new THREE.PlaneGeometry( floorWidth, floorHeight ), material );
  floor.position.y = - 100;
  floor.rotation.x = - Math.PI / 2;
  scene.add( floor );
}

function MakeEnemies() {
  var numEnemies = 10;
  var spacing = 50;
  for(var i = 0; i < numEnemies; i++) {
    var geometry = new THREE.CubeGeometry( 200, 200, 200 );
    var material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF} );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.x = i * spacing - numEnemies * spacing / 2;
    scene.add( cube );
    enemyMeshList.push( cube );
  }
}
