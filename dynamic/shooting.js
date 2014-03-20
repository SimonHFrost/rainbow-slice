var shooting = {
  lastFired : -1,
  FIRE_RATE: 10,

  fire : function() {
    var fireInterval = clock.getElapsedTime().toFixed(this.FIRE_RATE);
    if(this.lastFired !== fireInterval) {
        this.lastFired = clock.getElapsedTime().toFixed(this.FIRE_RATE);

        var nonDeadEnemies = sceneObjects.enemies.filter(function (el) {
          return el.dead !== true;
        });
        if(nonDeadEnemies.length === 0) {
          story.triggerEnding();
          return;
        }
        var enemyToFire = nonDeadEnemies[Math.floor((Math.random() * nonDeadEnemies.length))];

        var bulletThing = new Bullet(enemyToFire);
    }
  },

  facePlayer : function() {
    for(var i = 0; i < sceneObjects.enemies.length; i++) {
      if (sceneObjects.enemies[i].dead !== true) {
        sceneObjects.enemies[i].lookAt( sceneObjects.player.position );
      }
    }
  }
  
};
