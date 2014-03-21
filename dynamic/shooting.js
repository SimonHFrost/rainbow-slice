var shooting = {
  lastFired : -1,
  FIRE_RATE: 10,

  fire : function() {
    var fireInterval = clock.getElapsedTime().toFixed(this.FIRE_RATE);
    if(this.lastFired !== fireInterval) {
        this.lastFired = clock.getElapsedTime().toFixed(this.FIRE_RATE);

        var nonDeadEnemies = sceneObjects.enemies.filter(function (el) {
          return el.threeObject.dead !== true;
        });
        if(nonDeadEnemies.length === 0) {
          story.triggerEnding();
          return;
        }
        var enemyToFire = nonDeadEnemies[Math.floor((Math.random() * nonDeadEnemies.length))];

        var bulletThing = new Bullet(enemyToFire.threeObject);
    }
  },

  facePlayer : function() {
    for(var i = 0; i < sceneObjects.enemies.length; i++) {
      if (sceneObjects.enemies[i].threeObject.dead !== true) {
        sceneObjects.enemies[i].threeObject.lookAt( sceneObjects.player.position );
      }
    }
  }

};
