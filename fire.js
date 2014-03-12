var allBullets = [];

function fire() {
  if(clock.getElapsedTime() % 1 <= 0.05) {
      var bulletSize = 50;
      bullet = new THREE.Mesh( new THREE.CubeGeometry( bulletSize, bulletSize, bulletSize ), new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 'gray' } ) );

      var enemyToFire = enemyMeshList[Math.floor((Math.random() * enemyMeshList.length))];

      bullet.position.x = enemyToFire.position.x;
      bullet.position.z = enemyToFire.position.z;

      bullet.direction = new THREE.Vector3( Math.random() - 0.5, 0, Math.random() - 0.5);
      bullet.direction.normalize();

      allBullets.push( bullet );
      scene.add( bullet );
  }
}

function updateBulletPosition() {
  var speed = 10;
  for(var i = 0; i < allBullets.length; i++){
    allBullets[i].position.x += allBullets[i].direction.x * speed;
    allBullets[i].position.z += allBullets[i].direction.z * speed;
  }
}
