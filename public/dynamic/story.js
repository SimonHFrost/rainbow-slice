function Story() {
  this.health = 250;
  this.playedWin = false;
  this.playedDead = false;
}

Story.prototype.update = function() {
  if(this.health <= 0) {
    this.triggerDead();
  }
};

Story.prototype.triggerWin = function() {
  if(!this.playedWin) {
    this.playedWin = true;
    elem = document.getElementById('scoreNumber');
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
