var fire = {
  lastFired : -1,
  FIRE_RATE: 10,

  fire : function() {
    var currentSecond = clock.getElapsedTime().toFixed(this.FIRE_RATE);
    if(this.lastFired !== currentSecond) { // fire once a second
        this.lastFired = clock.getElapsedTime().toFixed(this.FIRE_RATE);

        var bulletSize = 50;
        bullet = new THREE.Mesh( new THREE.CubeGeometry( bulletSize, bulletSize, bulletSize ), materials.BULLET );

        var nonDeadEnemies = sceneObjects.enemies.filter(function (el) {
          return el.dead !== true;
        });
        if(nonDeadEnemies.length === 0) {
          story.triggerEnding();
          return;
        }
        var enemyToFire = nonDeadEnemies[Math.floor((Math.random() * nonDeadEnemies.length))];
        bullet.enemyToFire = enemyToFire;

        bullet.position.x = enemyToFire.position.x;
        bullet.position.z = enemyToFire.position.z;

        var pLocal = new THREE.Vector3( 0, 0, -1 );
        var pWorld = pLocal.applyMatrix4( sceneObjects.player.matrixWorld );
        var dir = pWorld.sub( bullet.position ).normalize();

        bullet.direction = dir;

        sceneObjects.allBullets.push( bullet );
        scene.add( bullet );
    }
  },

  facePlayer : function() {
    for(var i = 0; i < sceneObjects.enemies.length; i++) {
      if (sceneObjects.enemies[i].dead !== true) {
        sceneObjects.enemies[i].lookAt( sceneObjects.player.position );
      }
    }
  },

  updateBulletPosition : function() {
    var speed = 25;
    for(var i = 0; i < sceneObjects.allBullets.length; i++){
      sceneObjects.allBullets[i].position.x += sceneObjects.allBullets[i].direction.x * speed;
      sceneObjects.allBullets[i].position.z += sceneObjects.allBullets[i].direction.z * speed;
    }
  }
};
