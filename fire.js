var allBullets = [];
var lastFired = -1;

function fire() {
  var currentSecond = Math.floor(clock.getElapsedTime());
  if(lastFired !== currentSecond) { // fire once a second
      lastFired = Math.floor(clock.getElapsedTime());

      var bulletSize = 50;
      bullet = new THREE.Mesh( new THREE.CubeGeometry( bulletSize, bulletSize, bulletSize ), new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 'gray' } ) );

      var enemyToFire = enemyMeshList[Math.floor((Math.random() * enemyMeshList.length))];

      bullet.position.x = enemyToFire.position.x;
      bullet.position.z = enemyToFire.position.z;

      var pLocal = new THREE.Vector3( 0, 0, -1 );
      var pWorld = pLocal.applyMatrix4( mainCube.matrixWorld );
      var dir = pWorld.sub( bullet.position ).normalize();

      bullet.direction = dir;

      allBullets.push( bullet );
      scene.add( bullet );
  }
}

function facePlayer() {
  for(var i = 0; i < enemyMeshList.length; i++) {
    enemyMeshList[i].lookAt( mainCube.position );
  }
}

function updateBulletPosition() {
  var speed = 10;
  for(var i = 0; i < allBullets.length; i++){
    allBullets[i].position.x += allBullets[i].direction.x * speed;
    allBullets[i].position.z += allBullets[i].direction.z * speed;
  }
}
