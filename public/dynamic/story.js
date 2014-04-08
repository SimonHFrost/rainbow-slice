function Story() {
  this.health = 100;
  this.kills = 0;
  this.playedWin = false;
  this.playedDead = false;
}

Story.prototype.update = function() {
  if(this.health <= 0) {
    this.triggerDead();
  }
};

Story.prototype.decreaseHealth = function() {
  if (this.health > 0) {
    new Sound().playHit();
    this.health--;
    $('#healthNumber').html('Health: ' + this.health);
  }
};

Story.prototype.increaseKills = function() {
  new Sound().playEnemyHit();
  this.kills++;
  $('#killNumber').html('Kills: ' + this.kills);
};

Story.prototype.triggerWin = function() {
  if(!this.playedWin) {
    this.playedWin = true;
    elem = document.getElementById('healthNumber');
    elem.innerHTML = 'You won with ' + story.health + ' health left!';
    new Sound().playWin();

    _gaq.push(['_trackEvent', 'GameEvents', 'Finished']);

    _.each(SceneObjects.allBullets, function(bullet) {
      scene.remove(bullet);
    });
  }
};

Story.prototype.triggerDead = function() {
  if(!this.playedDead) {
    this.playedDead = true;
    if (!Main.DEBUG_MODE)
      location.reload();
  }
};
