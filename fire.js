var fire = {
  allBullets : [],
  lastFired : -1,

  fire : function() {
    var currentSecond = Math.floor(clock.getElapsedTime());
    if(this.lastFired !== currentSecond) { // fire once a second
        this.lastFired = Math.floor(clock.getElapsedTime());

        var bulletSize = 50;
        bullet = new THREE.Mesh( new THREE.CubeGeometry( bulletSize, bulletSize, bulletSize ), new THREE.MeshLambertMaterial( { shading: THREE.FlatShading, color: 'white' } ) );

        var nonDeadEnemies = main.enemyMeshList.filter(function (el) {
          return el.dead !== true;
        });
        if(nonDeadEnemies.length === 0) {
          elem = document.getElementById('scoreNumber');
          elem.innerHTML = 'You won with ' + collisionDetector.health + ' health left!';

          return;
        }
        var enemyToFire = nonDeadEnemies[Math.floor((Math.random() * nonDeadEnemies.length))];

        bullet.position.x = enemyToFire.position.x;
        bullet.position.z = enemyToFire.position.z;

        var pLocal = new THREE.Vector3( 0, 0, -1 );
        var pWorld = pLocal.applyMatrix4( mainCube.matrixWorld );
        var dir = pWorld.sub( bullet.position ).normalize();

        bullet.direction = dir;

        this.allBullets.push( bullet );
        scene.add( bullet );
    }
  },

  facePlayer : function() {
    for(var i = 0; i < main.enemyMeshList.length; i++) {
      if (main.enemyMeshList[i].dead !== true) {
        main.enemyMeshList[i].lookAt( mainCube.position );
      }
    }
  },

  updateBulletPosition : function() {
    var speed = 10;
    for(var i = 0; i < this.allBullets.length; i++){
      this.allBullets[i].position.x += this.allBullets[i].direction.x * speed;
      this.allBullets[i].position.z += this.allBullets[i].direction.z * speed;
    }
  }
};
